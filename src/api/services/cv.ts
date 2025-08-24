import * as http from "./http";
import ApiService from "./service";
import { CVCollection, CVData } from "../../types/cv";

export interface PaginationParams {
  limit: number;
  offset: number;
  search_string?: string;
}

export interface UploadCVResponse {
  response: any;
}

export class CVService extends ApiService {
  /**
   * Fetches the CV collection from the API with pagination
   * @param params - Pagination parameters (limit and offset)
   * @returns Promise<CVData[]> - Array of CV data
   */
  async getCVCollection(params: PaginationParams): Promise<CVCollection[]> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/get_cv_collection`;
      const response = await http.post(url, params, this.store);

      // Handle both response formats: direct array or wrapped response
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && 'data' in data && Array.isArray(data.data)) {
        return data.data;
      } else {
        throw new Error('Invalid response format from CV collection API');
      }
    } catch (error) {
      console.error('Error fetching CV collection:', error);
      throw error;
    }
  }

  /**
   * Fetches all draft CVs from the API with pagination and search
   * @param params - Pagination and search parameters
   * @returns Promise<CVData[]> - Array of draft CV data
   */
  async getDraftCVs(params: PaginationParams): Promise<CVCollection[]> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/drafts`;
      const response = await http.post(url, params, this.store);

      // Handle both response formats: direct array or wrapped response
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && 'data' in data && Array.isArray(data.data)) {
        return data.data;
      } else {
        throw new Error('Invalid response format from draft CVs API');
      }
    } catch (error) {
      console.error('Error fetching draft CVs:', error);
      throw error;
    }
  }

  /**
   * Fetches all archived CVs from the API with pagination and search
   * @param params - Pagination and search parameters
   * @returns Promise<CVData[]> - Array of archived CV data
   */
  async getArchivedCVs(params: PaginationParams): Promise<CVCollection[]> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/archived`;
      const response = await http.post(url, params, this.store);

      // Handle both response formats: direct array or wrapped response
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      } else if (data && 'data' in data && Array.isArray(data.data)) {
        return data.data;
      } else {
        throw new Error('Invalid response format from archived CVs API');
      }
    } catch (error) {
      console.error('Error fetching archived CVs:', error);
      throw error;
    }
  }

  /**
   * Uploads a CV file and extracts information
   * @param file - The CV file to upload (PDF or DOCX)
   * @returns Promise<UploadCVResponse> - Response from the upload API
   */
  async uploadCV(file: File): Promise<UploadCVResponse> {
    try {
      const url = `${this.apiDomain}/cv_generator/upload_cv`;
      const response = await http.uploadFile(url, file, this.store);

      return response.data;
    } catch (error) {
      console.error('Error uploading CV:', error);
      throw error;
    }
  }

  /**
* Fetch CV information by email
* @param email - Candidate's email
* @param version - Optional version (default: V1)
* @returns Promise<any> - API response
*/
  async getCVInformation(email: string, version: string = "V1"): Promise<any> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/information`;
      const response = await http.post(
        url,
        { email, version },
        this.store
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching CV information:", error);
      throw error;
    }
  }

}
