import { AxiosResponse } from "axios";
import axios from "../../axios/axios";
import { FullSearchData } from "../../models/models";
import { setSearchData } from "../slices/searchSlice";
import { AppDispatch } from "../store";

export const searchAction = (data: FullSearchData, token?: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<FullSearchData, AxiosResponse>(
        "api/v1/objectsearch",
        data,
        { headers: { Authorization: `Bearer ${token || ""}` } }
      );
      dispatch(
        setSearchData({ searchRequest: data, searchData: response.data })
      );
      return response;
    } catch (error) {
      console.log("Error search", error);
    }
  };
};
