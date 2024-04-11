import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DOCS_KEY,
  DocumentData,
  EXPIRE_KEY,
  FullSearchData,
  SEARCH_KEY,
  SEARCH_RESPONSE_KEY,
  SearchDataResponse,
} from "../../models/models";

interface InitialStateType {
  searchRequest: FullSearchData;
  searchData: SearchDataResponse;
  documentsData: DocumentData[];
}

function getInitialState(): InitialStateType {
  const expireIn = localStorage.getItem(EXPIRE_KEY) ?? null;

  if (expireIn && new Date() > new Date(expireIn)) {
    localStorage.clear();
    return {
      searchRequest: {
        intervalType: "",
        histogramTypes: [],
        issueDateInterval: {
          startDate: "",
          endDate: "",
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "",
                inn: null,
                maxFullness: false,
                inBusinessNews: null,
              },
            ],
            onlyMainRole: false,
            tonality: "any",
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
          excludeTechNews: false,
          excludeAnnouncements: false,
          excludeDigests: false,
        },
        similarMode: "",
        limit: null,
        sortType: "",
        sortDirectionType: "",
      },
      searchData: {
        items: [],
        mappings: [],
      },
      documentsData: [],
    };
  }

  return {
    searchRequest:
      JSON.parse(window.localStorage.getItem(SEARCH_KEY) as string) || {},
    searchData: JSON.parse(
      window.localStorage.getItem(SEARCH_RESPONSE_KEY) as string
    ) || {
      items: [],
      mappings: [],
    },
    documentsData:
      JSON.parse(window.localStorage.getItem(DOCS_KEY) as string) || [],
  };
}

const initialState: InitialStateType = getInitialState();

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchData(
      state,
      action: PayloadAction<{
        searchRequest: FullSearchData;
        searchData: SearchDataResponse;
      }>
    ) {
      localStorage.removeItem(DOCS_KEY);
      localStorage.setItem(
        SEARCH_KEY,
        JSON.stringify(action.payload.searchRequest)
      );
      localStorage.setItem(
        SEARCH_RESPONSE_KEY,
        JSON.stringify(action.payload.searchData)
      );
      return {
        searchRequest: { ...action.payload.searchRequest },
        searchData: { ...action.payload.searchData },
        documentsData: [],
      };
    },
    setDocumentsData(state, action: PayloadAction<DocumentData[]>) {
      localStorage.setItem(DOCS_KEY, JSON.stringify(action.payload));
      return {
        ...state,
        documentsData: [...state.documentsData, ...action.payload],
      };
    },
  },
});

export const { setSearchData, setDocumentsData } = searchSlice.actions;

export default searchSlice.reducer;
