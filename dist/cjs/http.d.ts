import { AxiosRequestConfig, AxiosStatic } from "axios";
import { BaseEndpoints } from "./interfaces/client";
import { EndpointType } from "./types/client";
import { IHttp } from "./interfaces/http";
declare class HttpService implements IHttp {
    private _baseEndpoints;
    private readonly _axios;
    constructor(axios?: AxiosStatic);
    get endpoints(): BaseEndpoints;
    set baseEndpoint(baseEndpoint: Partial<BaseEndpoints>);
    fetch<T>(endpoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T>;
    post<T>(endpoint: string, endpointType: EndpointType, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
    put<T>(endpoint: string, endpointType: EndpointType, body?: unknown, config?: AxiosRequestConfig): Promise<T>;
    del<T>(endpoint: string, endpointType: EndpointType, config?: AxiosRequestConfig): Promise<T>;
    private _getCorrectEndpoint;
}
export { HttpService };
//# sourceMappingURL=http.d.ts.map