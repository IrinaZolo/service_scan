import React, { ChangeEvent, useEffect, useState } from "react";
import InputBase from "./inputs/InputBase";
import InputSelect from "./inputs/InputSelect";
import InputDate from "./inputs/InputDate";
import moment from "moment";
import InputCheckbox from "./inputs/InputCheckbox";
import {
  FullSearchData,
  ISearchState,
  ParamsEnum,
  ParamsList,
  SearchData,
} from "../models/models";
import ButtonBase from "./buttons/ButtonBase";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formattedInnValue } from "../utils/formattedInnValue";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { searchAction } from "../store/actions/searchAction";

export default function SearchForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.accessToken);
  const searchRequest: FullSearchData = useAppSelector(
    (state) => state.search.searchRequest
  );

  const [searchState, setSearchState] = useState<ISearchState>({
    tonality:
      searchRequest?.searchContext?.targetSearchEntitiesContext?.tonality ||
      "any",
    startDate: {
      dateValue: searchRequest?.issueDateInterval?.startDate
        ? moment(searchRequest.issueDateInterval.startDate).format("YYYY.MM.DD")
        : "",
      textValue: searchRequest?.issueDateInterval?.startDate
        ? moment(searchRequest.issueDateInterval.startDate).format("DD.MM.YYYY")
        : "",
    },
    endDate: {
      dateValue: searchRequest?.issueDateInterval?.endDate
        ? moment(searchRequest.issueDateInterval.endDate).format("YYYY.MM.DD")
        : "",
      textValue: searchRequest?.issueDateInterval?.endDate
        ? moment(searchRequest.issueDateInterval.endDate).format("DD.MM.YYYY")
        : "",
    },
    checkedParams: {
      [ParamsEnum.maxCompleteness]: true,
      [ParamsEnum.businessContext]: true,
      [ParamsEnum.mainRoleInPublication]: true,
      [ParamsEnum.withRiskFactorsOnly]: false,
      [ParamsEnum.includeTechnicalMarketNews]: false,
      [ParamsEnum.includeAnnouncementsAndCalendars]: true,
      [ParamsEnum.includeNewsReports]: false,
    },
    isLoading: false,
  });

  const inputStyle: string =
    "p-[13px_17px] placeholder:text-center placeholder:text-sm text-sm";

  const inputDateStyle: string =
    "p-[13px_17px] placeholder:text-center placeholder:text-sm text-sm";

  const errorMessage: string = "Введите корректные данные";
  const requiredMessage: string = "Обязательное поле";

  const qtySymbolsINN: number = 13; // 10 symbols for inn and 3 symbols for spaces
  const minValueDocs: number = 1;
  const maxValueDocs: number = 1000;

  const searchSchema = yup.object().shape({
    inn: yup
      .string()
      .required(requiredMessage)
      .length(qtySymbolsINN, errorMessage),
    limit: yup
      .string()
      .required(requiredMessage)
      .test(
        "maxSymbolsDocs",
        errorMessage,
        (value) => !(Number(value) > maxValueDocs)
      )
      .test(
        "minSymbolsDocs",
        errorMessage,
        (value) => !(Number(value) < minValueDocs)
      ),
    startDate: yup
      .string()
      .required(requiredMessage)
      .test("startDate", errorMessage, (value) => {
        if (
          searchState.endDate.dateValue &&
          moment(value) > moment(searchState.endDate.dateValue)
        )
          return false;
        if (moment(value) > moment()) return false;
        return true;
      }),
    endDate: yup
      .string()
      .required(requiredMessage)
      .test("endDate", errorMessage, (value) => {
        if (
          searchState.startDate.dateValue &&
          moment(value) < moment(searchState.startDate.dateValue)
        )
          return false;
        if (moment(value) > moment()) return false;
        return true;
      }),
  });

  const searchForm = useForm<SearchData>({
    mode: "all",
    defaultValues: {
      inn: searchRequest?.searchContext?.targetSearchEntitiesContext
        ?.targetSearchEntities[0].inn
        ? formattedInnValue(
            String(
              searchRequest?.searchContext?.targetSearchEntitiesContext
                ?.targetSearchEntities[0].inn
            )
          )
        : "",
      limit: searchRequest?.limit ? String(searchRequest?.limit) : "",
    },
    resolver: yupResolver(searchSchema),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = searchForm;

  useEffect(() => {
    if (searchState.startDate.dateValue) {
      register("startDate").onChange({
        target: { value: searchState.startDate.dateValue, name: "startDate" },
      });
    }
    if (searchState.endDate.dateValue) {
      register("endDate").onChange({
        target: { value: searchState.endDate.dateValue, name: "endDate" },
      });
    }
  }, [
    searchState.endDate.dateValue,
    searchState.startDate.dateValue,
    register,
  ]);

  function toggleTonality(e: ChangeEvent<HTMLSelectElement>) {
    setSearchState((prev) => ({
      ...prev,
      tonality: e.target
        .value as FullSearchData["searchContext"]["targetSearchEntitiesContext"]["tonality"],
    }));
  }

  function onChange(dateType: "start" | "end") {
    return (e: ChangeEvent<HTMLInputElement>) => {
      const formattedValue: string = moment(e.target.value).format(
        "DD.MM.YYYY"
      );
      if (dateType === "start") {
        setSearchState((prev) => ({
          ...prev,
          startDate: { dateValue: e.target.value, textValue: formattedValue },
        }));
        register("startDate").onChange({
          target: { value: e.target.value, name: "startDate" },
        });
      }
      if (dateType === "end") {
        setSearchState((prev) => ({
          ...prev,
          endDate: { dateValue: e.target.value, textValue: formattedValue },
        }));
        register("endDate").onChange({
          target: { value: e.target.value, name: "endDate" },
        });
      }
    };
  }

  function formattedLimit(value: string) {
    if (!value) return value;
    return value.replace(/[^\d]/g, "");
  }

  function onChangeParams(paramsType: ParamsEnum) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setSearchState((prev) => ({
        ...prev,
        checkedParams: {
          ...prev.checkedParams,
          [paramsType]: e.target.checked,
        },
      }));
    };
  }

  async function onSubmit(model: SearchData) {
    setSearchState((prev) => ({ ...prev, isLoading: true }));

    const data: FullSearchData = {
      intervalType: "month",
      histogramTypes: ["totalDocuments", "riskFactors"],
      issueDateInterval: {
        startDate: moment(model.startDate).format(),
        endDate: moment(model.endDate).format(),
      },
      searchContext: {
        targetSearchEntitiesContext: {
          targetSearchEntities: [
            {
              type: "company",
              inn: Number(model.inn.replaceAll(" ", "")),
              maxFullness: true,
              inBusinessNews: null,
            },
          ],
          onlyMainRole: true,
          tonality: searchState.tonality,
          onlyWithRiskFactors: false,
          riskFactors: {
            and: [],
            or: [],
            not: [],
          },
          themes: {
            and: [],
            or: [],
            not: [],
          },
        },
        themesFilter: {
          and: [],
          or: [],
          not: [],
        },
      },
      searchArea: {
        includedSources: [],
        excludedSources: [],
        includedSourceGroups: [],
        excludedSourceGroups: [],
        includedDistributionMethods: [],
        excludedDistributionMethods: [],
      },
      attributeFilters: {
        excludeTechNews: true,
        excludeAnnouncements: true,
        excludeDigests: true,
      },
      similarMode: "duplicates",
      limit: Number(model.limit),
      sortType: "issueDate",
      sortDirectionType: "asc",
    };

    dispatch(searchAction(data, token))
      .then((res) => {
        if (res?.data) {
          navigate("/results");
        }
      })
      .finally(() => setSearchState((prev) => ({ ...prev, isLoading: false })));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col md:flex-row w-full"
    >
      <div className="flex flex-col w-full">
        {/* ИНН */}
        <label htmlFor="inn-company">
          ИНН компании{" "}
          <span className={errors?.inn?.message ? "text-red-400" : ""}>*</span>
        </label>
        <div className="flex flex-col w-[100%] md:w-[60%] mt-[20px] mb-[30px]">
          <Controller
            {...register("inn")}
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                onChange={(e) =>
                  field.onChange({
                    target: {
                      value: formattedInnValue(e.target.value),
                      name: "inn",
                    },
                  })
                }
                type="text"
                id="inn"
                error={errors?.inn?.message}
                className={inputStyle}
                placeholder="10 цифр"
              />
            )}
          />
          <p
            className={
              errors?.inn?.message
                ? " text-sm pt-1 self-center text-red-400"
                : "hidden"
            }
          >
            {errors?.inn?.message}
          </p>
        </div>
        {/* ТОНАЛЬНОСТЬ */}
        <label htmlFor="tonality">Тональность</label>
        <InputSelect
          name=""
          id="tonality"
          width="w-[100%] md:w-[60%]"
          className="mt-[20px] mb-[30px] text-sm"
          value={searchState.tonality}
          onChange={toggleTonality}
        >
          <option value="positive">Позитивная</option>
          <option value="negative">Негативная</option>
          <option value="any">Любая</option>
        </InputSelect>
        {/* КОЛИЧЕСТВО ДОКУМЕНТОВ К ВЫДАЧЕ */}
        <label htmlFor="qty-docs">
          Количество документов в выдаче{" "}
          <span className={errors?.limit?.message ? "text-red-400" : ""}>
            *
          </span>
        </label>
        <div className=" flex flex-col w-[100%] md:w-[60%] mt-[20px] mb-[30px]">
          <Controller
            control={control}
            {...register("limit")}
            render={({ field }) => (
              <InputBase
                {...field}
                onChange={(e) =>
                  field.onChange({
                    target: {
                      value: formattedLimit(e.target.value),
                      name: "limit",
                    },
                  })
                }
                type="text"
                id="limit"
                error={errors?.limit?.message}
                className={inputStyle}
                placeholder="От 1 до 1000"
              />
            )}
          />
          <p
            className={
              errors?.limit?.message
                ? " text-sm pt-1 self-center text-red-400"
                : "hidden"
            }
          >
            {errors?.limit?.message}
          </p>
        </div>
        {/* ДИАПАЗОН ПОИСКА */}
        <label htmlFor="search-range">
          Диапазон поиска
          <span
            className={
              errors?.startDate?.message || errors?.endDate?.message
                ? "text-red-400"
                : ""
            }
          >
            *
          </span>
        </label>
        <div className="flex flex-col mt-[20px] mb-[20px] md:mb-[45px] first:mb-0 md:first:mb-[45px]">
          <div className="relative w-[100%] flex flex-col md:flex-row gap-5 md:gap-5 ">
            <InputDate
              name="Дата начала"
              className={inputDateStyle}
              id="search-range"
              width="w-full"
              placeholder="Дата начала"
              textValue={searchState.startDate.textValue}
              dateValue={searchState.startDate.dateValue}
              onChange={onChange("start")}
              error={errors?.startDate?.message}
              required
            ></InputDate>
            <InputDate
              className={inputDateStyle}
              name="Дата конца"
              id="search-range"
              width="w-full"
              placeholder="Дата конца"
              textValue={searchState.endDate.textValue}
              dateValue={searchState.endDate.dateValue}
              onChange={onChange("end")}
              error={errors?.endDate?.message}
              required
            ></InputDate>
            <p
              className={
                errors?.startDate?.message || errors?.endDate?.message
                  ? "absolute bottom-[-20px] right-[0] w-[100%] text-center text-sm pt-1 self-center text-red-400"
                  : "hidden"
              }
            >
              {errors?.endDate?.message || errors?.startDate?.message}
            </p>
          </div>
        </div>
      </div>
      {/* ПАРАМЕТРЫ */}
      <div className="flex md:flex-col md:justify-between">
        <div className="text-sm hidden md:block lg:text-base 2xl:text-2base mt-[6px]">
          {ParamsList.map((param) => (
            <InputCheckbox
              key={param.id}
              onChange={onChangeParams(param.name)}
              isChecked={searchState.checkedParams[param.name]}
              name={param.name}
            >
              {param.name}
            </InputCheckbox>
          ))}
        </div>
        <div className="w-full md:w-auto flex flex-col md:self-end">
          <ButtonBase
            type="submit"
            disabled={!isValid}
            isLoading={searchState.isLoading}
            className=" md:w-[250px] lg:w-[305px]"
          >
            Поиск
          </ButtonBase>
          <span className="text-sm mt-[10px]">
            * Обязательные к заполнению поля
          </span>
        </div>
      </div>
    </form>
  );
}
