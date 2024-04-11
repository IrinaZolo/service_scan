import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../store/actions/authActions";
import { useAppDispatch } from "../hooks/redux";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { AuthData } from "../models/models";
import { yupResolver } from "@hookform/resolvers/yup";
import InputBase from "./inputs/InputBase";
import ButtonBase from "./buttons/ButtonBase";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const LOGIN_REGEX: RegExp = /^[A-z][A-z0-9-_]{3,23}|^[0-9-+]{12}$/;
  const PWD_REGEX: RegExp = /^(?=.*[a-zA-Z]).{4,24}$/;

  const loginErrorMessage: string = "Введите корректные данные";
  const passwordErrorMessage: string = "Неправильный пароль";

  const authSchema = yup.object().shape({
    login: yup
      .string()
      .required(loginErrorMessage)
      .matches(LOGIN_REGEX, loginErrorMessage)
      .test("phoneNumber", loginErrorMessage, (value) => value !== "+7"),
    password: yup
      .string()
      .required(passwordErrorMessage)
      .matches(PWD_REGEX, passwordErrorMessage),
  });

  const authForm = useForm<AuthData>({
    mode: "all",
    resolver: yupResolver(authSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = authForm;

  const onSubmit = async (model: AuthData) => {
    setIsLoading(true);

    dispatch(
      loginAction({
        login: model.login,
        password: model.password,
      })
    )
      .then(() => {
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  };

  const userInput = (
    <>
      <label htmlFor="login" className="text-base text-[#949494]">
        Логин или номер телефона:
      </label>
      <div className="relative flex flex-col">
        <Controller
          {...register("login")}
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
              type="text"
              id="login"
              className="w-full my-[15px] px-[15px]"
              error={errors?.login?.message}
              autoFocus
            />
          )}
        />
        <p
          className={
            errors?.login?.message
              ? "absolute -bottom-2 self-center text-red-400"
              : "hidden"
          }
        >
          {errors?.login?.message}
        </p>
      </div>
    </>
  );

  const pwdInput = (
    <>
      <label htmlFor="password" className="text-base text-[#949494]">
        Пароль:
      </label>
      <div className="relative flex flex-col">
        <Controller
          control={control}
          {...register("password")}
          render={({ field }) => (
            <InputBase
              {...field}
              type="password"
              id="password"
              className="w-full my-[15px] px-[15px]"
              error={errors?.password?.message}
            />
          )}
        />
        <p
          className={
            errors?.password?.message
              ? "absolute -bottom-2 self-center text-red-400"
              : "hidden"
          }
        >
          {errors?.password?.message}
        </p>
      </div>
    </>
  );

  return (
    <form className="mt-[40px]" onSubmit={handleSubmit(onSubmit)}>
      {userInput}
      {pwdInput}
      <ButtonBase type="submit" disabled={!isValid} isLoading={isLoading}>
        Войти
      </ButtonBase>
    </form>
  );
};
