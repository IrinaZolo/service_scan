import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import loadingImg from "../assets/loading.svg";
import { DocumentData, IdsData, SearchDataResponse } from "../models/models";
import { getDocumentsAction } from "../store/actions/getDocumentsAction";

export function ResultsPage() {
  const documentsData: DocumentData[] = useAppSelector(
    (state) => state.search.documentsData
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchData: SearchDataResponse = useAppSelector(
    (state) => state.search.searchData
  );
  const dispatch = useAppDispatch();
  const token: string = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    setIsLoading(true);
    function successGetDocuments() {
      setIsLoading(false);
    }
    function errorGetDocuments(error: any) {
      setIsLoading(false);
      console.log("error search 2", error);
    }
    if (!searchData.items) {
      setIsLoading(false);
      return;
    }

    const data: IdsData = {
      ids: searchData.items.map((item) => item.encodedId),
    };

    dispatch(
      getDocumentsAction(data, errorGetDocuments, successGetDocuments, token)
    );
  }, []);

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

      console.log(dom.querySelectorAll("sentence"));
      return text;
    }
    return "";
  }

  useEffect(() => {
    if (!isLoading && documentsData.length) {
      getHTML(documentsData[0].ok.content.markup);
    }
  }, [isLoading, documentsData]);

  return (
    <div style={{ minHeight: "calc(100vh - 230px)" }}>
      {!isLoading && <h1 className="mb-4 text-3base">Список документов</h1>}
      {!documentsData.length && !isLoading && <div>публикации не найдены</div>}
      {isLoading && (
        <div>
          <h1 className="mb-4 text-base text-center">
            Ищем. Скоро будут результаты
          </h1>
          <img
            src={loadingImg}
            alt="Загрузка"
            className="h-10 animate-spin mx-auto"
          />
        </div>
      )}
      {documentsData && !isLoading && (
        <div className="flex justify-between flex-wrap h-[100%]">
          {documentsData.map((document) => (
            <div className="w-[100%] lg:w-[48%] rounded-md shadow-[0px_0px_20px_rgba(0,0,0,0.20)] mb-3 p-2 flex flex-col">
              <h1 className="text-2base mb-3">{document.ok.title.text}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: getHTML(document.ok.content.markup),
                }}
                className="mb-3 h-full"
              />
              <a
                href={document.ok.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm h-max-[223px] w-[30%] px-1 py-2 bg-[rgba(124,227,225,1)] text-center"
              >
                Читать в источнике
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
