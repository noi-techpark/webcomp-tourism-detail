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
 * @interface ODHData
 */
export interface ODHData {
    /**
     * 
     * @type {LicenseInfo}
     * @memberof ODHData
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHData
     */
    shortname?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHData
     */
    active?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHData
     */
    oDHActive?: any;
    /**
     * 
     * @type {Array&lt;ODHTags&gt;}
     * @memberof ODHData
     */
    oDHTags?: any;
    /**
     * 
     * @type {LocationInfo}
     * @memberof ODHData
     */
    locationInfo?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHData
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Array&lt;VenueType&gt;}
     * @memberof ODHData
     */
    venueCategory?: any;
    /**
     * 
     * @type {Array&lt;GpsInfo&gt;}
     * @memberof ODHData
     */
    gpsInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHData
     */
    source?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHData
     */
    syncSourceInterface?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHData
     */
    roomCount?: any;
    /**
     * 
     * @type {Array&lt;VenueRoomDetails&gt;}
     * @memberof ODHData
     */
    roomDetails?: any;
}
