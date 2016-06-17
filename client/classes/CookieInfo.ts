export class CookieInfo {
    roomUrl: number;
    isAdmin: boolean;

    constructor(cookieObj){
      this.roomUrl = cookieObj.roomUrl;
      this.isAdmin = cookieObj.isAdmin;
    }
}
