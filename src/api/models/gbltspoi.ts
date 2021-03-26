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
 * @interface GBLTSPoi
 */
export interface GBLTSPoi {
    /**
     * 
     * @type {{ [key, string]: GpsInfo;}}
     * @memberof GBLTSPoi
     */
    gpsPoints?: any;
    /**
     * 
     * @type {Array&lt;LTSTags&gt;}
     * @memberof GBLTSPoi
     */
    lTSTags?: any;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof GBLTSPoi
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    outdooractiveID?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    outdooractiveElevationID?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    copyrightChecked?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    active?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    shortname?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    smgId?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    highlight?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    difficulty?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    type?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    subType?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    poiType?: any;
    /**
     * 
     * @type {Date}
     * @memberof GBLTSPoi
     */
    firstImport?: any;
    /**
     * 
     * @type {Date}
     * @memberof GBLTSPoi
     */
    lastChange?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    smgActive?: any;
    /**
     * 
     * @type {LocationInfo}
     * @memberof GBLTSPoi
     */
    locationInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    tourismorganizationId?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    areaId?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    altitudeDifference?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    altitudeHighestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    altitudeLowestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    altitudeSumUp?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    altitudeSumDown?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    distanceDuration?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    distanceLength?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    isOpen?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    isPrepared?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    runToValley?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    isWithLigth?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    hasRentals?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    hasFreeEntrance?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    liftAvailable?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    feetClimb?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSPoi
     */
    bikeTransport?: any;
    /**
     * 
     * @type {Array&lt;OperationSchedule&gt;}
     * @memberof GBLTSPoi
     */
    operationSchedule?: any;
    /**
     * 
     * @type {Array&lt;GpsInfo&gt;}
     * @memberof GBLTSPoi
     */
    gpsInfo?: any;
    /**
     * 
     * @type {Array&lt;GpsTrack&gt;}
     * @memberof GBLTSPoi
     */
    gpsTrack?: any;
    /**
     * 
     * @type {Array&lt;ImageGallery&gt;}
     * @memberof GBLTSPoi
     */
    imageGallery?: any;
    /**
     * 
     * @type {{ [key, string]: Detail;}}
     * @memberof GBLTSPoi
     */
    detail?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof GBLTSPoi
     */
    contactInfos?: any;
    /**
     * 
     * @type {{ [key, string]: AdditionalPoiInfos;}}
     * @memberof GBLTSPoi
     */
    additionalPoiInfos?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    smgTags?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Ratings}
     * @memberof GBLTSPoi
     */
    ratings?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    exposition?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    ownerRid?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    childPoiIds?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSPoi
     */
    masterPoiIds?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSPoi
     */
    wayNumber?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSPoi
     */
    number?: any;
}
