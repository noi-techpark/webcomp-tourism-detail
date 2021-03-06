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
 * @interface Event
 */
export interface Event {
    /**
     * 
     * @type {LicenseInfo}
     * @memberof Event
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    id?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Event
     */
    active?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    shortname?: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    dateBegin?: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    dateEnd?: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    firstImport?: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    lastChange?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    gpstype?: any;
    /**
     * 
     * @type {number}
     * @memberof Event
     */
    latitude?: any;
    /**
     * 
     * @type {number}
     * @memberof Event
     */
    longitude?: any;
    /**
     * 
     * @type {number}
     * @memberof Event
     */
    altitude?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    altitudeUnitofMeasure?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    orgRID?: any;
    /**
     * 
     * @type {number}
     * @memberof Event
     */
    ranc?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    ticket?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    signOn?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    payMet?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    type?: any;
    /**
     * 
     * @type {string}
     * @memberof Event
     */
    districtId?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof Event
     */
    districtIds?: any;
    /**
     * 
     * @type {Array&lt;ImageGallery&gt;}
     * @memberof Event
     */
    imageGallery?: any;
    /**
     * 
     * @type {{ [key, string]: Detail;}}
     * @memberof Event
     */
    detail?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof Event
     */
    topicRIDs?: any;
    /**
     * 
     * @type {Array&lt;Topic&gt;}
     * @memberof Event
     */
    topics?: any;
    /**
     * 
     * @type {Array&lt;EventPublisher&gt;}
     * @memberof Event
     */
    eventPublisher?: any;
    /**
     * 
     * @type {{ [key, string]: EventAdditionalInfos;}}
     * @memberof Event
     */
    eventAdditionalInfos?: any;
    /**
     * 
     * @type {{ [key, string]: EventPrice;}}
     * @memberof Event
     */
    eventPrice?: any;
    /**
     * 
     * @type {Array&lt;EventDate&gt;}
     * @memberof Event
     */
    eventDate?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof Event
     */
    contactInfos?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof Event
     */
    organizerInfos?: any;
    /**
     * 
     * @type {LocationInfo}
     * @memberof Event
     */
    locationInfo?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof Event
     */
    smgTags?: any;
    /**
     * 
     * @type {boolean}
     * @memberof Event
     */
    smgActive?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof Event
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Date}
     * @memberof Event
     */
    nextBeginDate?: any;
}
