import React, { useState } from "react";
import { AuthForm } from "../components/AuthForm";
import GoogleText from "../assets/google.svg";
import FacebookText from "../assets/facebook.svg";
import YandexText from "../assets/yandex.svg";

export const AuthPage = () => {
  const [tabSignIn, setTabSignIn] = useState<boolean>(true);

  const characters: string = new URL(
    "../assets/Characters.jpg",
    import.meta.url
  ).href;

  const lock: string = new URL("../assets/lock.png", import.meta.url).href;

  function toggleTabSignIn() {
    setTabSignIn(true);
  }

  function toggleTabAuth() {
    setTabSignIn(false);
  }

  const tabButtonStyle: string =
    "h-[35px] pb-[5px] border-b-2 hover:border-[#029491] hover:text-[#029491] xl:text-base text-center cursor-pointer transition-all";

  const tabs = (
    <div className="flex justify-between">
      <button
        onClick={toggleTabSignIn}
        className={`${tabButtonStyle} px-[10%] xl:px-[13%] ${
          tabSignIn
            ? "text-[#029491] border-[#029491]"
            : "text-[#C7C7C7] border-[#C7C7C7]"
        }`}
      >
        Войти
      </button>
      <button
        onClick={toggleTabAuth}
        className={`${tabButtonStyle} px-[6.5%] ${
          !tabSignIn
            ? "text-[#029491] border-[#029491]"
            : "text-[#C7C7C7] border-[#C7C7C7]"
        }`}
      >
        Зарегистрироваться
      </button>
    </div>
  );

  return (
    <main className="flex flex-col lg:flex-row items-center lg:items-start px-[45px] gap-x-[70px] 2xl:gap-x-[110px] mt-[30px] lg:mt-[70px] mb-[80px]">
      <div className="flex flex-col xs:text-center lg:text-left w-[335px] md:w-[500px] lg:w-[700px]">
        <h1 className="text-[22px] leading-[26px] lg:text-2lg xl:text-xl 2xl:text-2xl font-black uppercase">
          Для оформления подписки на тариф, необходимо авторизоваться.
        </h1>
        <img
          src={characters}
          alt=""
          className="w-[322px] ml-[110px] hidden lg:block"
        />
      </div>
      <div className="relative flex flex-col mt-[135px] lg:mt-0 w-[335px] min-w-[335px] lg:w-auto h-[504px] xl:min-w-[430px] lg:h-[523px] shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-[15px] xl:p-[25px] rounded-[10px]">
        <img
          src={lock}
          alt=""
          className="absolute -top-[88px] left-[75px] lg:-top-[55px] lg:-left-[51px]"
        />
        {tabs}
        {tabSignIn && (
          <>
            <AuthForm />
            <p className="self-center mt-[15px] border-b-2 border-[#5970FF] text-[#5970FF] cursor-pointer">
              Восстановить пароль
            </p>
            <p className="text-base text-[#949494] mt-[28px]">Войти через:</p>
            <div className="mt-[18px] flex gap-x-[10px]">
              <button className="h-[30px] w-[96px] border-[1px] border-[#5970FF] rounded-[3px]">
                <img src={GoogleText} alt="" className="mx-auto" />
              </button>
              <button className="h-[30px] w-[96px] border-[1px] border-[#5970FF] rounded-[3px]">
                <img src={FacebookText} alt="" className="mx-auto" />
              </button>
              <button className="h-[30px] w-[96px] border-[1px] border-[#5970FF] rounded-[3px]">
                <img src={YandexText} alt="" className="mx-auto" />
              </button>
            </div>
          </>
        )}
      </div>
      <img src={characters} alt="" className="w-[322px] mt-[50px] lg:hidden" />
    </main>
  );
};
