import { AxiosResponse } from "axios";
import axios from "../../axios/axios";
import { IdsData } from "../../models/models";

export const getDocumentsAction = (data: IdsData, token?: string) => {
  return async () => {
    try {
      const response = await axios.post<IdsData, AxiosResponse>(
        "api/v1/documents",
        data,
        {
          headers: { Authorization: `Bearer ${token || ""}` },
        }
      );
      return response;
    } catch (error) {
      console.log("Error documents", error);
    }
  };
};
