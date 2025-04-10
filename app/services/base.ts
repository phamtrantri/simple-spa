import CustomError from "../constants/error";

enum HTTP_STATUS {
  BAD_REQUEST = 400,
}

type TRequestHeaders = Record<string, string>;

class Request {
  private baseURL: string;
  private headers: TRequestHeaders;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL;
    this.headers = {
      "Content-Type": "application/json",
    };
  }

  private handleError = async (response: Response) => {
    switch (response.status) {
      case HTTP_STATUS.BAD_REQUEST:
        throw new CustomError(
          response.status,
          (await response.json())?.errorMessage || "Bad request"
        );
      default:
        throw new CustomError(response.status, "An error occurred");
    }
  };

  private handleResponse = async (response: Response) => {
    if (!response.ok) {
      await this.handleError(response);
    }
    return response.json();
  };

  async request<T, R>(
    method: string,
    endpoint: string,
    data?: T,
    headers?: TRequestHeaders
  ): Promise<R> {
    const config = {
      method,
      headers: {
        ...this.headers,
        ...(headers || {}),
      },
      body: data ? JSON.stringify(data) : undefined,
    };
    return fetch(`${this.baseURL}/${endpoint}`, config).then(
      this.handleResponse
    );
  }

  async postAsync<T, R>(
    endpoint: string,
    data: T,
    headers?: TRequestHeaders
  ): Promise<R> {
    return this.request<T, R>("POST", endpoint, data, headers);
  }
}

export default new Request();
