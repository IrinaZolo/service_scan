import React, { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import loadingImg from "../assets/loading.svg";
import { DocumentData, IdsData, SearchDataResponse } from "../models/models";
import moment from "moment";
import ButtonBase from "../components/buttons/ButtonBase";
import { setDocumentsData } from "../store/slices/searchSlice";
import { getDocumentsAction } from "../store/actions/getDocumentsAction";

export function ResultsPage() {
  const documentsData: DocumentData[] = useAppSelector(
    (state) => state.search.documentsData
  );
  const searchData: SearchDataResponse = useAppSelector(
    (state) => state.search.searchData
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(documentsData.length ? 1 : 0);
  const [visibleShowMoreButton, setVisibleShowMoreButton] = useState<boolean>(
    searchData.items.length > 10 || false
  );

  const [documents, setDocuments] = useState<DocumentData[]>(
    documentsData.length ? documentsData : []
  );

  const dispatch = useAppDispatch();
  const token: string = useAppSelector((state) => state.auth.accessToken);

  const searchResultImg: string = new URL(
    "../assets/result-search.jpg",
    import.meta.url
  ).href;

  const getDocuments = useCallback(() => {
    console.log("searchData", searchData);
    if (!searchData?.items) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const data: IdsData = {
      ids: searchData.items.map((item) => item.encodedId),
    };

    let pages: number = 1;
    let firstID: number = 0;
    let lastID: number = data.ids.length;

    if (data?.ids?.length > 0) {
      pages = Math.ceil(data.ids.length / 10);
      if (pages > 1) {
        setVisibleShowMoreButton(true);
        const currentPage: number = page + 1;
        firstID = currentPage === 1 ? 0 : (currentPage - 1) * 10;
        lastID = currentPage === pages ? data.ids.length : currentPage * 10;
      }
    }

    console.log("page", page);
    console.log("firstID", firstID);
    console.log("lastID", lastID);
    console.log("length", data.ids.length);

    const currentData: IdsData = {
      ids: data.ids.slice(firstID, lastID),
    };

    dispatch(getDocumentsAction(currentData, token))
      .then((res) => {
        if (res?.data) {
          if (lastID < data.ids.length) {
            setPage((prev) => prev + 1);
          }
          if (lastID === data.ids.length) setVisibleShowMoreButton(false);
          if (firstID === 0) dispatch(setDocumentsData(res.data));

          setDocuments((prev) => [...prev, ...res?.data]);
        }
      })
      .finally(() => setIsLoading(false));
  }, [dispatch, searchData?.items, page, token]);

  useEffect(() => {
    if (!documentsData.length) {
      return () => {
        getDocuments();
      };
    }
  }, []);

  function onClickShowMore() {
    getDocuments();
  }

  function getHTML(xml: string): string {
    const parser: DOMParser = new DOMParser();
    const dom: Document = parser.parseFromString(xml, "text/xml");
    if (!dom.documentElement.nodeName) {
      console.log("parse error");
      return "";
    }
    if (dom.documentElement.nodeName) {
      let text: string = "";
      let sentences: NodeListOf<Element> = dom.querySelectorAll("sentence");

      for (let i = 0; i < sentences.length; i++) {
        let nodesInSentence: NodeListOf<ChildNode> = sentences[i].childNodes;
        text = text + " ";
        for (let n = 0; n < nodesInSentence.length; n++) {
          text = text + nodesInSentence[n].textContent;
        }
      }
      return text;
    }
    return "";
  }

  function formattedDate(date: string) {
    return moment(date).format("DD.MM.YYYY");
  }

  return (
    <main className="px-[15px] xl:px-[45px] 2xl:px-[15px] flex flex-col">
      <div className="flex flex-col items-center md:items-start  md:flex-row justify-between mt-[10px] md:mt-[25px]">
        <div className="max-w-[450px] pt-[15px] md:pt-[45px]">
          <h1 className="mb-4 text-3base xl:text-xl uppercase font-black">
            Ищем. Скоро будут результаты
          </h1>
          <p className="text-3base pb-3">
            Поиск может занять некоторое время, просим сохранять терпение.
          </p>
        </div>
        <img
          src={searchResultImg}
          alt="search-result"
          className=" max-w-[300px] mb-6 lg:max-w-none"
        />
      </div>

      <h1 className="mb-12 text-3base xl:text-xl uppercase font-black">
        Список документов
      </h1>
      {!(documents.length > 0) && !isLoading && (
        <div className="text-2base pb-12 mx-auto">Публикации не найдены</div>
      )}
      {isLoading && !documents.length && (
        <img
          src={loadingImg}
          alt="Загрузка"
          className="h-10 animate-spin mx-auto my-5"
        />
      )}
      {documents.length > 0 && (
        <div className="flex flex-col">
          <div className="flex justify-between flex-wrap h-[100%] mb-7">
            {documents.map((document) => (
              <div
                key={document.ok.id}
                className="max-h-[450px] lg:w-[48%] rounded-md shadow-[0px_0px_20px_rgba(0,0,0,0.20)] mb-3 px-7 py-5 flex flex-col"
              >
                <div className="flex text-base text-[rgba(148,148,148,1)] mb-6">
                  <span className="mr-3">
                    {formattedDate(document.ok.issueDate)}
                  </span>
                  <span className="underline">{document.ok.source.name}</span>
                </div>
                <h1 id="title" className="text-3base font-medium mb-3">
                  {document.ok.title.text}
                </h1>
                <p
                  id="description"
                  dangerouslySetInnerHTML={{
                    __html: getHTML(document.ok.content.markup),
                  }}
                  className="mb-3 h-full overflow-hidden text-[rgba(148,148,148,1)]"
                />
                <a
                  href={document.ok.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-sm h-max-[223px] w-[50%] px-1 py-2 bg-[rgba(124,227,225,1)] text-center"
                >
                  Читать в источнике
                </a>
              </div>
            ))}
          </div>
          {visibleShowMoreButton && (
            <ButtonBase
              onClick={onClickShowMore}
              isLoading={isLoading}
              className="mt-0 mb-7 max-w-[305px] self-center"
            >
              Показать больше
            </ButtonBase>
          )}
        </div>
      )}
    </main>
  );
}
