import React from "react";

import SearchForm from "../components/SearchForm";

export const SearchPage = () => {
  const searchImg: string = new URL("../assets/search.jpg", import.meta.url)
    .href;

  const searchDocImg: string = new URL(
    "../assets/search-doc.jpg",
    import.meta.url
  ).href;

  const searchFoldersImg: string = new URL(
    "../assets/search-folders.jpg",
    import.meta.url
  ).href;

  return (
    <main className="md:px-[15px] xl:px-[45px] flex xl:justify-between flex-col xl:flex-row items-center xl:items-end">
      <div className="relative mb-[15px] lg:mb-[64px] flex flex-col">
        <h1 className="font-black uppercase text-2lg md:text-xl xl:text-2xl max-w-[300px] md:max-w-[450px] xl:max-w-[700px] pt-[20px] lg:pt-[72px]">
          Найдите необходимые данные в пару кликов.
        </h1>
        <p className="text-3base pt-[20px] pb-0 lg:pb-[20px] max-w-[300px] md:max-w-none">
          Задайте параметры поиска. <br />
          Чем больше заполните, тем точнее поиск
        </p>
        <div className="flex flex-col md:w-[700px] lg:w-[800px] 2xl:w-[872px] md:flex-row rounded-[10px] mt-[15px] lg:mt-[27px] p-[25px] lg:p-[35px] shadow-[0px_0px_20px_rgba(0,0,0,0.20)] text-2base">
          <SearchForm />
        </div>
        <img
          src={searchDocImg}
          alt="document"
          className="absolute top-28 md:top-12 lg:top-32 h-[70px] md:h-auto right-4 md:right-8 xl:-right-24"
        />
      </div>
      <div className="mb-[25px] lg:mb-[64px] flex flex-col xl:items-end xl:justify-end xl:ml-[80px] ml-0">
        <img
          src={searchFoldersImg}
          alt=""
          className="mb-[160px] mr-[42px] hidden xl:block"
        />
        <img src={searchImg} alt="" />
      </div>
    </main>
  );
};
