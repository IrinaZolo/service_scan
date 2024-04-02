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

  const handleChange = () => {
    setTabSignIn(!tabSignIn);
  };

  const tabs = (
    <div className="flex justify-between">
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-1"
        value=""
        className="hidden "
        onChange={handleChange}
        checked={tabSignIn}
      />
      <label
        onClick={() => setTabSignIn(true)}
        htmlFor="tab-btn-1"
        className="h-[30px] px-[10%] xl:px-[13%] border-b-2 border-[#C7C7C7] hover:border-[#029491] text-[#C7C7C7] hover:text-[#029491] 
                            xl:text-base text-center cursor-pointer"
        style={tabSignIn ? { color: "#029491", borderColor: "#029491" } : {}}
      >
        Войти
      </label>
      <input
        type="radio"
        name="tab-btn"
        id="tab-btn-2"
        value=""
        className="hidden"
        onChange={handleChange}
        checked={!tabSignIn}
      />
      <label
        htmlFor="tab-btn-2"
        className="h-[30px] px-[6.5%] border-b-2 border-[#C7C7C7] hover:border-[#029491] text-[#C7C7C7] hover:text-[#029491] 
                             xl:text-base text-center cursor-pointer"
        style={!tabSignIn ? { color: "#029491", borderColor: "#029491" } : {}}
      >
        Зарегистрироваться
      </label>
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
      <div className="relative flex flex-col mt-[135px] lg:mt-0 max-w-[335px] h-[504px] xl:min-w-[430px] lg:h-[523px] shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-[15px] xl:p-[25px] rounded-[10px]">
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
