import { AxiosResponse } from "axios";
import axios from "../../axios/axios";
import { IdsData } from "../../models/models";
import { setDocumentsData } from "../slices/searchSlice";
import { AppDispatch } from "../store";

export const getDocumentsAction = (
  data: IdsData,
  errorGetDocuments: (err: any) => void,
  successGetDocuments: () => void,
  token?: string
) => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await axios.post<IdsData, AxiosResponse>(
        "api/v1/documents",
        data,
        { headers: { Authorization: `Bearer ${token || ""}` } }
      );
      console.log("search response: ", response.data);
      dispatch(setDocumentsData(response.data));
      successGetDocuments();
    } catch (error) {
      console.log("Error documents", error);
      errorGetDocuments(error);
    }
  };
};
