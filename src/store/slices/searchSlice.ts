import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  DOCS_KEY,
  DocumentData,
  EXPIRE_KEY,
  SearchDataResponse,
} from "../../models/models";

interface InitialStateType {
  searchData: SearchDataResponse;
  documentsData: DocumentData[];
}

function getInitialState(): InitialStateType {
  const expireIn = localStorage.getItem(EXPIRE_KEY) ?? null;

  if (expireIn && new Date() > new Date(expireIn)) {
    localStorage.removeItem(DOCS_KEY);
    return {
      searchData: {
        items: [],
        mappings: [],
      },
      documentsData: [],
    };
  }

  return {
    searchData: {
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
    setSearchData(state, action: PayloadAction<SearchDataResponse>) {
      return { ...state, searchData: { ...action.payload } };
    },
    setDocumentsData(state, action: PayloadAction<DocumentData[]>) {
      localStorage.setItem(DOCS_KEY, JSON.stringify(action.payload));
      return { ...state, documentsData: action.payload };
    },
  },
});

export const { setSearchData, setDocumentsData } = searchSlice.actions;

export default searchSlice.reducer;
