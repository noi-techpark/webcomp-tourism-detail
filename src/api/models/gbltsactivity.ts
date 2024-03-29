// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

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
 * @interface GBLTSActivity
 */
export interface GBLTSActivity {
    /**
     * 
     * @type {{ [key, string]: GpsInfo;}}
     * @memberof GBLTSActivity
     */
    gpsPoints?: any;
    /**
     * 
     * @type {Array&lt;LTSTags&gt;}
     * @memberof GBLTSActivity
     */
    lTSTags?: any;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof GBLTSActivity
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    outdooractiveID?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    outdooractiveElevationID?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    copyrightChecked?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    active?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    shortname?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    smgId?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    highlight?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    difficulty?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    type?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    subType?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    poiType?: any;
    /**
     * 
     * @type {Date}
     * @memberof GBLTSActivity
     */
    firstImport?: any;
    /**
     * 
     * @type {Date}
     * @memberof GBLTSActivity
     */
    lastChange?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    smgActive?: any;
    /**
     * 
     * @type {LocationInfo}
     * @memberof GBLTSActivity
     */
    locationInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    tourismorganizationId?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    areaId?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    altitudeDifference?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    altitudeHighestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    altitudeLowestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    altitudeSumUp?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    altitudeSumDown?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    distanceDuration?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    distanceLength?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    isOpen?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    isPrepared?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    runToValley?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    isWithLigth?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    hasRentals?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    hasFreeEntrance?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    liftAvailable?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    feetClimb?: any;
    /**
     * 
     * @type {boolean}
     * @memberof GBLTSActivity
     */
    bikeTransport?: any;
    /**
     * 
     * @type {Array&lt;OperationSchedule&gt;}
     * @memberof GBLTSActivity
     */
    operationSchedule?: any;
    /**
     * 
     * @type {Array&lt;GpsInfo&gt;}
     * @memberof GBLTSActivity
     */
    gpsInfo?: any;
    /**
     * 
     * @type {Array&lt;GpsTrack&gt;}
     * @memberof GBLTSActivity
     */
    gpsTrack?: any;
    /**
     * 
     * @type {Array&lt;ImageGallery&gt;}
     * @memberof GBLTSActivity
     */
    imageGallery?: any;
    /**
     * 
     * @type {{ [key, string]: Detail;}}
     * @memberof GBLTSActivity
     */
    detail?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof GBLTSActivity
     */
    contactInfos?: any;
    /**
     * 
     * @type {{ [key, string]: AdditionalPoiInfos;}}
     * @memberof GBLTSActivity
     */
    additionalPoiInfos?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    smgTags?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Ratings}
     * @memberof GBLTSActivity
     */
    ratings?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    exposition?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    ownerRid?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    childPoiIds?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof GBLTSActivity
     */
    masterPoiIds?: any;
    /**
     * 
     * @type {number}
     * @memberof GBLTSActivity
     */
    wayNumber?: any;
    /**
     * 
     * @type {string}
     * @memberof GBLTSActivity
     */
    number?: any;
}
