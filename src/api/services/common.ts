import { toast } from "react-toastify";
import * as http from "./http";
import ApiService from "./service";

export class CommonService extends ApiService {
  async ping() {
    try {
      const url = `${this.apiDomain}/`;
      const response = await http.get(url, this.store);
      return response;
    } catch (error) {
      // TODO: Handle this
    }
  }

  async getCredentials() {
    try {
      const url = `${this.apiDomain}/cv_generator/credentials`;
      const response = await http.get(url, this.store);
      return response;
    } catch (error) {
      console.error("Error fetching credentials:", error);
      throw error;
    }
  }

  async getSites() {
    try {
      const url = `${this.apiDomain}/cv_generator/site_populate`;
      const response = await http.get(url, this.store);
      return response;
    } catch (error) {
      console.error("Error fetching sites:", error);
      throw error;
    }
  }

  async getCountries() {
    try {
      const url = `${this.apiDomain}/cv_generator/countries`;
      const response = await http.get(url, this.store);
      return response;
    } catch (error) {
      console.error("Error fetching countries:", error);
      throw error;
    }
  }

  async saveCVDraft(cvData: {
    updated_by: string;
    updated_date: string;
    content: any;
    file_encoded_content: string;
  }) {
    try {
      const url = `${this.apiDomain}/cv_storage/save_in_postgres_and_s3`;
      const formattedData = {
        file_status: "Draft",
        updated_by: cvData.updated_by,
        updated_date: cvData.updated_date,
        content: { response: cvData.content },
        file_encoded_content: "",
      };

      const response = await http.post(url, formattedData, this.store);
      return response;
    } catch (error) {
      console.error("Error saving CV draft:", error);
      throw error;
    }
  }

  async saveCVComplete(cvData: {
    updated_by: string;
    updated_date: string;
    content: any;
    base64_content: string;
  }) {
    try {
      const url = `${this.apiDomain}/cv_storage/save_in_postgres_and_s3`;
      const formattedData = {
        file_status: "Success",
        updated_by: cvData.updated_by,
        updated_date: cvData.updated_date,
        content: { response: cvData.content },
        file_encoded_content: cvData.base64_content,
      };

      const response = await http.post(url, formattedData, this.store);
      return response;
    } catch (error) {
      console.error("Error saving completed CV:", error);
      throw error;
    }
  }
}
