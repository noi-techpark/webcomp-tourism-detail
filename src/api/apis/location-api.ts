/* tslint:disable */
/* eslint-disable */
/**
 * Open Data Hub Api Tourism
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: V1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosPromise, AxiosInstance } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { LocHelperclass } from '../models';
/**
 * LocationApi - axios parameter creator
 * @export
 */
export const LocationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary GET Location List (Use in locfilter)
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [type] Type (&#x27;mta&#x27;,&#x27;reg&#x27;,&#x27;tvs&#x27;,&#x27;mun&#x27;,&#x27;fra&#x27;) Separator &#x27;,&#x27; : &#x27;null&#x27; returns all Location Objects (default)
         * @param {boolean} [showall] Show all Data (true &#x3D; all, false &#x3D; show only data market as visible)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), mun + MUNICIPALITYID &#x3D; (Filter by Municipality), fra + FRACTIONID &#x3D; (Filter by Fraction)), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        locationGetTheLocationList: async (language?: string, type?: string, showall?: boolean, locfilter?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Location`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("oauth2", [""])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (language !== undefined) {
                localVarQueryParameter['language'] = language;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            if (showall !== undefined) {
                localVarQueryParameter['showall'] = showall;
            }

            if (locfilter !== undefined) {
                localVarQueryParameter['locfilter'] = locfilter;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @summary GET Skiarea List (Use in locfilter as \"ska\")
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        locationGetTheSkiareaList: async (language?: string, locfilter?: string, options: any = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Location/Skiarea`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication oauth2 required
            // oauth required
            if (configuration && configuration.accessToken) {
                const localVarAccessTokenValue = typeof configuration.accessToken === 'function'
                    ? await configuration.accessToken("oauth2", [""])
                    : await configuration.accessToken;
                localVarHeaderParameter["Authorization"] = "Bearer " + localVarAccessTokenValue;
            }

            if (language !== undefined) {
                localVarQueryParameter['language'] = language;
            }

            if (locfilter !== undefined) {
                localVarQueryParameter['locfilter'] = locfilter;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.query) {
                query.set(key, options.query[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * LocationApi - functional programming interface
 * @export
 */
export const LocationApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @summary GET Location List (Use in locfilter)
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [type] Type (&#x27;mta&#x27;,&#x27;reg&#x27;,&#x27;tvs&#x27;,&#x27;mun&#x27;,&#x27;fra&#x27;) Separator &#x27;,&#x27; : &#x27;null&#x27; returns all Location Objects (default)
         * @param {boolean} [showall] Show all Data (true &#x3D; all, false &#x3D; show only data market as visible)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), mun + MUNICIPALITYID &#x3D; (Filter by Municipality), fra + FRACTIONID &#x3D; (Filter by Fraction)), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async locationGetTheLocationList(language?: string, type?: string, showall?: boolean, locfilter?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LocHelperclass>>> {
            const localVarAxiosArgs = await LocationApiAxiosParamCreator(configuration).locationGetTheLocationList(language, type, showall, locfilter, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @summary GET Skiarea List (Use in locfilter as \"ska\")
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async locationGetTheSkiareaList(language?: string, locfilter?: string, options?: any): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<Array<LocHelperclass>>> {
            const localVarAxiosArgs = await LocationApiAxiosParamCreator(configuration).locationGetTheSkiareaList(language, locfilter, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * LocationApi - factory interface
 * @export
 */
export const LocationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @summary GET Location List (Use in locfilter)
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [type] Type (&#x27;mta&#x27;,&#x27;reg&#x27;,&#x27;tvs&#x27;,&#x27;mun&#x27;,&#x27;fra&#x27;) Separator &#x27;,&#x27; : &#x27;null&#x27; returns all Location Objects (default)
         * @param {boolean} [showall] Show all Data (true &#x3D; all, false &#x3D; show only data market as visible)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), mun + MUNICIPALITYID &#x3D; (Filter by Municipality), fra + FRACTIONID &#x3D; (Filter by Fraction)), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        locationGetTheLocationList(language?: string, type?: string, showall?: boolean, locfilter?: string, options?: any): AxiosPromise<Array<LocHelperclass>> {
            return LocationApiFp(configuration).locationGetTheLocationList(language, type, showall, locfilter, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @summary GET Skiarea List (Use in locfilter as \"ska\")
         * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
         * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), (default:&#x27;null&#x27;)
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        locationGetTheSkiareaList(language?: string, locfilter?: string, options?: any): AxiosPromise<Array<LocHelperclass>> {
            return LocationApiFp(configuration).locationGetTheSkiareaList(language, locfilter, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * LocationApi - object-oriented interface
 * @export
 * @class LocationApi
 * @extends {BaseAPI}
 */
export class LocationApi extends BaseAPI {
    /**
     * 
     * @summary GET Location List (Use in locfilter)
     * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
     * @param {string} [type] Type (&#x27;mta&#x27;,&#x27;reg&#x27;,&#x27;tvs&#x27;,&#x27;mun&#x27;,&#x27;fra&#x27;) Separator &#x27;,&#x27; : &#x27;null&#x27; returns all Location Objects (default)
     * @param {boolean} [showall] Show all Data (true &#x3D; all, false &#x3D; show only data market as visible)
     * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), mun + MUNICIPALITYID &#x3D; (Filter by Municipality), fra + FRACTIONID &#x3D; (Filter by Fraction)), (default:&#x27;null&#x27;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public locationGetTheLocationList(language?: string, type?: string, showall?: boolean, locfilter?: string, options?: any) {
        return LocationApiFp(this.configuration).locationGetTheLocationList(language, type, showall, locfilter, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @summary GET Skiarea List (Use in locfilter as \"ska\")
     * @param {string} [language] Localization Language, (default:&#x27;en&#x27;)
     * @param {string} [locfilter] Locfilter (Separator &#x27;,&#x27; possible values: mta + MetaREGIONID &#x3D; (Filter by MetaRegion), reg + REGIONID &#x3D; (Filter by Region), tvs + TOURISMVEREINID &#x3D; (Filter by Tourismverein), (default:&#x27;null&#x27;)
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof LocationApi
     */
    public locationGetTheSkiareaList(language?: string, locfilter?: string, options?: any) {
        return LocationApiFp(this.configuration).locationGetTheSkiareaList(language, locfilter, options).then((request) => request(this.axios, this.basePath));
    }
}