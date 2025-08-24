import ApiService from "./service";
import * as http from "./http";
import { toast } from "react-toastify";

export class AzureService extends ApiService {
  async getUserByAzureEmail(email: string, getAccessToken: () => Promise<string>) {
    try {
      const accessToken = await getAccessToken();
      const encryptToken = accessToken;
      const data = {
        email,
        accesToken: encryptToken,
      };
      const url = `${this.apiDomain}/getAzureUserByEmail`;
      const response = await http.post(url, data, this.store);
      if (
        response?.data?.status !== 200 &&
        response?.data?.status !== 422 &&
        !response?.data?.field
      ) {
        toast.error(response?.data?.message);
      }
      if (response?.data?.status === 422) {
        toast.error("Email must be  valid");
      }
      return response?.data;
    } catch (e) {
      console.log(e);
      toast.error("Cannot Access Token");
    }
  }
}
