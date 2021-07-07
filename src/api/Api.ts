import { toastMessage } from "@/utils/response";
import isEmpty from "lodash/isEmpty";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { API_URL } from "@/config/constants";
import { push } from "@/router/index";
import { getToken } from "@/utils/storage";

type Method = "get" | "post" | "put" | "delete";


/**
 * @class Api
 * @extends {Axios}
 * @example
 */
export class Api {
  private api: AxiosInstance;
  protected apiName = "";
  /**
   * Creates an instance of Api.
   *
   * @param {import("axios").AxiosRequestConfig} [config] - axios configuration.
   * @memberof Api
   */
  public constructor(config?: AxiosRequestConfig) {
    this.api = axios.create(config);

    this.api.interceptors.request.use((config: AxiosRequestConfig) => {
      const accessToken = getToken();

      if (!isEmpty(accessToken)) {
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        config.headers = Object.assign(config.headers, headers);
      }

      return {
        baseUrl: API_URL,
        ...config,
      };
    });

    this.api.interceptors.response.use(
      (param: AxiosResponse) => ({
        ...param,
      }),
      (error: AxiosError) => {
        const statusCode = error.response && error.response.status;
        switch (statusCode) {
          case 401:
            push("/");
            break;
          case 403:
            break;
          case 404:
            push("/404");
            break;
          case 500:
            break;
          default:
            break;
        }
        toastMessage(this.getErrorMessage(error), "", "error");

        return Promise.reject(error.response && error.response.data);
      }
    );
  }

  /**
   * Get Uri
   *
   * @param {import("axios").AxiosRequestConfig} [config]
   * @returns {string}
   * @memberof Api
   */
  public getUri(config?: AxiosRequestConfig): string {
    return this.api.getUri(config);
  }

  /**
   * Generic request.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP axios response payload.
   * @memberof Api
   *
   * @example
   * api.request({
   *   method: "GET|POST|DELETE|PUT|PATCH"
   *   baseUrl: "http://www.domain.com",
   *   url: "/api/v1/users",
   *   headers: {
   *     "Content-Type": "application/json"
   *  }
   * }).then((response: AxiosResponse<User>) => response.data)
   *
   */
  public request<T, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R> {
    return this.api.request(config);
  }

  /**
   * HTTP GET method, used to fetch data `statusCode`: 200.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} HTTP `axios` response payload.
   * @memberof Api
   */
  public get<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.get(url, config);
  }

  /**
   * HTTP DELETE method, `statusCode`: 204 No Content.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public delete<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.delete(url, config);
  }

  /**
   * HTTP HEAD method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public head<T, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.head(url, config);
  }

  /**
   * HTTP POST method `statusCode`: 201 Created.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public post<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.post(url, data, config);
  }

  /**
   * HTTP PUT method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public put<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.put(url, data, config);
  }

  /**
   * HTTP PATCH method.
   *
   * @access public
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   * @param {string} url - endpoint you want to reach.
   * @param {B} data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   * @returns {Promise<R>} - HTTP [axios] response payload.
   * @memberof Api
   */
  public patch<T, B, R = AxiosResponse<T>>(
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.api.patch(url, data, config);
  }

  /**
   *
   * @template T - type.
   * @param {import("axios").AxiosResponse<T>} response - axios response.
   * @returns {T} - expected object.
   * @memberof Api
   */
  public success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  /**
   * throw Error
   */
  public error(error: AxiosError<Error>): void {
    throw error;
  }

  /**
   * do request
   * @template T - `TYPE`: expected object.
   * @template B - `BODY`: body request object.
   * @template R - `RESPONSE`: expected object inside a axios response format.
   *
   * @param Method method
   * @param string url
   * @param B data - payload to be send as the `request body`,
   * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
   *
   * @returns Promise<R>
   */
  public async doRequest<T, B, R = AxiosResponse<T>>(
    method: Method,
    url: string,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<R> {
    let res: AxiosResponse;
    switch (method) {
      case "get":
        res = await this.get(url, config);
        break;
      case "post":
        res = await this.post(url, data, config);
        break;
      case "put":
        res = await this.put(url, data, config);
        break;
      case "delete":
        res = await this.delete(url, config);
        break;
      default:
        throw "Method not allow!!!";
    }

    return this.success(res);
  }

  /**
   * get error message
   *
   * @param AxiosError error
   *
   * @return string
   */
  private getErrorMessage(error: AxiosError): string {
    let url = "",
      method = "";
    if (error.config) {
      url = error.config.url ?? "";
      url = url.charAt(0) == "/" ? url.substr(1) : url;
      url =
        url.charAt(url.length - 1) == "/" ? url.substr(0, url.length - 1) : url;
      url = url.replace("/", ".");

      method = error.config.method ?? "";
    }
    const status = error.response && error.response.status;

    return (
      this.translate([this.apiName, url, method, status].join(".")) ??
      this.translate([url, method, status].join(".")) ??
      this.translate([method, status].join(".")) ??
      this.translate(String(status))
    );
  }

  /**
   * translate message
   * will be updated with i18n
   * @param key
   *
   * @return string
   */
  private translate(key: string): string {
    //TODO: translate from i18n
    return key;
  }
}
