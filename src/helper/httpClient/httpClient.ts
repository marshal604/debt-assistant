export interface HttpClientInterceptor {
  request?: () => void;
  response?: () => void;
  error?: () => void;
}
export class HttpClient {
  intercept: HttpClientInterceptor = {};

  middle<T>(res: Promise<T>): Promise<T> {
    if (this.intercept?.request) {
      this.intercept.request();
    }
    return res
      .then((data: T) => {
        if (this.intercept?.response) {
          this.intercept.response();
        }
        return data;
      })
      .catch((error: Error) => {
        if (this.intercept?.error) {
          this.intercept?.error();
        }
        return Promise.reject(error);
      });
  }
}

export default new HttpClient();
