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
/**
 * 
 * @export
 * @interface WebcamInfo
 */
export interface WebcamInfo {
    /**
     * 
     * @type {LicenseInfo}
     * @memberof WebcamInfo
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    id?: any;
    /**
     * 
     * @type {Date}
     * @memberof WebcamInfo
     */
    lastChange?: any;
    /**
     * 
     * @type {Date}
     * @memberof WebcamInfo
     */
    firstImport?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    shortname?: any;
    /**
     * 
     * @type {boolean}
     * @memberof WebcamInfo
     */
    active?: any;
    /**
     * 
     * @type {boolean}
     * @memberof WebcamInfo
     */
    smgActive?: any;
    /**
     * 
     * @type {Array&lt;PublishedonObject&gt;}
     * @memberof WebcamInfo
     */
    webcamAssignedOn?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    webcamId?: any;
    /**
     * 
     * @type {{ [key, string]: string;}}
     * @memberof WebcamInfo
     */
    webcamname?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    webcamurl?: any;
    /**
     * 
     * @type {GpsInfo}
     * @memberof WebcamInfo
     */
    gpsInfo?: any;
    /**
     * 
     * @type {number}
     * @memberof WebcamInfo
     */
    listPosition?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    streamurl?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    previewurl?: any;
    /**
     * 
     * @type {string}
     * @memberof WebcamInfo
     */
    source?: any;
}