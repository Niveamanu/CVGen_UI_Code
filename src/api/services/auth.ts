import ApiService from "./service";
import * as http from "./http";

export class AuthService extends ApiService {
  static loginUrl = "/api/auth";
  static azureLoginUrl = "/azure-ad-login";

  async azureAdlogin(credentials: any) {
    const url = `${this.apiDomain}${AuthService.azureLoginUrl}`;
    const response = await http.post(url, credentials, this.store);
    return response.data;
  }
}
