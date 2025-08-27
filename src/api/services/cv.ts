import * as http from "./http";
import ApiService from "./service";
import { CVCollection, CVData } from "../../types/cv";

export interface PaginationParams {
  limit: number;
  offset: number;
  search_string?: string;
}

export interface CVCollectionResponse {
  records: CVCollection[];
  total_count: number;
}

export interface UploadCVResponse {
  response: any;
}

export class CVService extends ApiService {
  /**
   * Fetches the CV collection from the API with pagination
   * @param params - Pagination parameters (limit and offset)
   * @returns Promise<CVCollectionResponse> - Response with records and total count
   */
  async getCVCollection(params: PaginationParams): Promise<CVCollectionResponse> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/get_cv_collection`;
      const response = await http.post(url, params, this.store);

      // Handle the new response format with records and total_count
      const data = response.data;
      console.log('🔍 CV API response data:', data);
      console.log('🔍 CV API response keys:', Object.keys(data || {}));
      
      if (data && 'records' in data && 'total_count' in data) {
        console.log('✅ CV API: Using new format with records and total_count');
        return {
          records: data.records,
          total_count: data.total_count
        };
      } else if (Array.isArray(data)) {
        // Fallback for backward compatibility
        console.log('⚠️ CV API: Using fallback format (array)');
        return {
          records: data,
          total_count: data.length
        };
      } else {
        console.error('❌ CV API: Invalid response format:', data);
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
   * @returns Promise<CVCollectionResponse> - Response with records and total count
   */
  async getDraftCVs(params: PaginationParams): Promise<CVCollectionResponse> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/drafts`;
      const response = await http.post(url, params, this.store);

      // Handle the new response format with records and total_count
      const data = response.data;
      console.log('🔍 Draft CVs API response data:', data);
      console.log('🔍 Draft CVs API response keys:', Object.keys(data || {}));
      
      if (data && 'records' in data && 'total_count' in data) {
        console.log('✅ Draft CVs API: Using new format with records and total_count');
        return {
          records: data.records,
          total_count: data.total_count
        };
      } else if (Array.isArray(data)) {
        // Fallback for backward compatibility
        console.log('⚠️ Draft CVs API: Using fallback format (array)');
        return {
          records: data,
          total_count: data.length
        };
      } else {
        console.error('❌ Draft CVs API: Invalid response format:', data);
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
   * @returns Promise<CVCollectionResponse> - Response with records and total count
   */
  async getArchivedCVs(params: PaginationParams): Promise<CVCollectionResponse> {
    try {
      const url = `${this.apiDomain}/cv_landing_page/archived`;
      const response = await http.post(url, params, this.store);

      // Handle the new response format with records and total_count
      const data = response.data;
      console.log('🔍 Archived CVs API response data:', data);
      console.log('🔍 Archived CVs API response keys:', Object.keys(data || {}));
      
      if (data && 'records' in data && 'total_count' in data) {
        console.log('✅ Archived CVs API: Using new format with records and total_count');
        return {
          records: data.records,
          total_count: data.total_count
        };
      } else if (Array.isArray(data)) {
        // Fallback for backward compatibility
        console.log('⚠️ Archived CVs API: Using fallback format (array)');
        return {
          records: data,
          total_count: data.length
        };
      } else {
        console.error('❌ Archived CVs API: Invalid response format:', data);
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
