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
 * @interface ODHActivityPoi
 */
export interface ODHActivityPoi {
    /**
     * 
     * @type {{ [key, string]: GpsInfo;}}
     * @memberof ODHActivityPoi
     */
    gpsPoints?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    customId?: any;
    /**
     * 
     * @type {Array&lt;Webcam&gt;}
     * @memberof ODHActivityPoi
     */
    webcam?: any;
    /**
     * 
     * @type {{ [key, string]: Array&lt;PoiProperty&gt;;}}
     * @memberof ODHActivityPoi
     */
    poiProperty?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    poiServices?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    source?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    syncSourceInterface?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    syncUpdateMode?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    ageFrom?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    ageTo?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    maxSeatingCapacity?: any;
    /**
     * 
     * @type {Array&lt;CategoryCodes&gt;}
     * @memberof ODHActivityPoi
     */
    categoryCodes?: any;
    /**
     * 
     * @type {Array&lt;DishRates&gt;}
     * @memberof ODHActivityPoi
     */
    dishRates?: any;
    /**
     * 
     * @type {Array&lt;CapacityCeremony&gt;}
     * @memberof ODHActivityPoi
     */
    capacityCeremony?: any;
    /**
     * 
     * @type {Array&lt;Facilities&gt;}
     * @memberof ODHActivityPoi
     */
    facilities?: any;
    /**
     * 
     * @type {Array&lt;RelatedContent&gt;}
     * @memberof ODHActivityPoi
     */
    relatedContent?: any;
    /**
     * 
     * @type {{ [key, string]: Array&lt;AdditionalContact&gt;;}}
     * @memberof ODHActivityPoi
     */
    additionalContact?: any;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof ODHActivityPoi
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    id?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    outdooractiveID?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    outdooractiveElevationID?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    copyrightChecked?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    active?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    shortname?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    smgId?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    highlight?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    difficulty?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    type?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    subType?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    poiType?: any;
    /**
     * 
     * @type {Date}
     * @memberof ODHActivityPoi
     */
    firstImport?: any;
    /**
     * 
     * @type {Date}
     * @memberof ODHActivityPoi
     */
    lastChange?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    smgActive?: any;
    /**
     * 
     * @type {LocationInfo}
     * @memberof ODHActivityPoi
     */
    locationInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    tourismorganizationId?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    areaId?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    altitudeDifference?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    altitudeHighestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    altitudeLowestPoint?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    altitudeSumUp?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    altitudeSumDown?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    distanceDuration?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    distanceLength?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    isOpen?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    isPrepared?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    runToValley?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    isWithLigth?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    hasRentals?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    hasFreeEntrance?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    liftAvailable?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    feetClimb?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ODHActivityPoi
     */
    bikeTransport?: any;
    /**
     * 
     * @type {Array&lt;OperationSchedule&gt;}
     * @memberof ODHActivityPoi
     */
    operationSchedule?: any;
    /**
     * 
     * @type {Array&lt;GpsInfo&gt;}
     * @memberof ODHActivityPoi
     */
    gpsInfo?: any;
    /**
     * 
     * @type {Array&lt;GpsTrack&gt;}
     * @memberof ODHActivityPoi
     */
    gpsTrack?: any;
    /**
     * 
     * @type {Array&lt;ImageGallery&gt;}
     * @memberof ODHActivityPoi
     */
    imageGallery?: any;
    /**
     * 
     * @type {{ [key, string]: Detail;}}
     * @memberof ODHActivityPoi
     */
    detail?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof ODHActivityPoi
     */
    contactInfos?: any;
    /**
     * 
     * @type {{ [key, string]: AdditionalPoiInfos;}}
     * @memberof ODHActivityPoi
     */
    additionalPoiInfos?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    smgTags?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Ratings}
     * @memberof ODHActivityPoi
     */
    ratings?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    exposition?: any;
    /**
     * 
     * @type {string}
     * @memberof ODHActivityPoi
     */
    ownerRid?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    childPoiIds?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ODHActivityPoi
     */
    masterPoiIds?: any;
    /**
     * 
     * @type {number}
     * @memberof ODHActivityPoi
     */
    wayNumber?: any;
}
