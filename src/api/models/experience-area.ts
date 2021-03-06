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
 * @interface ExperienceArea
 */
export interface ExperienceArea {
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ExperienceArea
     */
    districtIds?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ExperienceArea
     */
    tourismvereinIds?: any;
    /**
     * 
     * @type {Array&lt;GpsPolygon&gt;}
     * @memberof ExperienceArea
     */
    gpsPolygon?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceArea
     */
    visibleInSearch?: any;
    /**
     * 
     * @type {Array&lt;RelatedContent&gt;}
     * @memberof ExperienceArea
     */
    relatedContent?: any;
    /**
     * 
     * @type {LicenseInfo}
     * @memberof ExperienceArea
     */
    licenseInfo?: any;
    /**
     * 
     * @type {string}
     * @memberof ExperienceArea
     */
    id?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceArea
     */
    active?: any;
    /**
     * 
     * @type {string}
     * @memberof ExperienceArea
     */
    customId?: any;
    /**
     * 
     * @type {string}
     * @memberof ExperienceArea
     */
    shortname?: any;
    /**
     * 
     * @type {string}
     * @memberof ExperienceArea
     */
    gpstype?: any;
    /**
     * 
     * @type {number}
     * @memberof ExperienceArea
     */
    latitude?: any;
    /**
     * 
     * @type {number}
     * @memberof ExperienceArea
     */
    longitude?: any;
    /**
     * 
     * @type {number}
     * @memberof ExperienceArea
     */
    altitude?: any;
    /**
     * 
     * @type {string}
     * @memberof ExperienceArea
     */
    altitudeUnitofMeasure?: any;
    /**
     * 
     * @type {{ [key, string]: Detail;}}
     * @memberof ExperienceArea
     */
    detail?: any;
    /**
     * 
     * @type {{ [key, string]: ContactInfos;}}
     * @memberof ExperienceArea
     */
    contactInfos?: any;
    /**
     * 
     * @type {Array&lt;ImageGallery&gt;}
     * @memberof ExperienceArea
     */
    imageGallery?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ExperienceArea
     */
    smgTags?: any;
    /**
     * 
     * @type {boolean}
     * @memberof ExperienceArea
     */
    smgActive?: any;
    /**
     * 
     * @type {Array&lt;string&gt;}
     * @memberof ExperienceArea
     */
    hasLanguage?: any;
    /**
     * 
     * @type {Date}
     * @memberof ExperienceArea
     */
    lastChange?: any;
}
