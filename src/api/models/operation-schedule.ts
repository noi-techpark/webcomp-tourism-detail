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
 * @interface OperationSchedule
 */
export interface OperationSchedule {
    /**
     * 
     * @type {{ [key, string]: string;}}
     * @memberof OperationSchedule
     */
    operationscheduleName?: any;
    /**
     * 
     * @type {Date}
     * @memberof OperationSchedule
     */
    start?: any;
    /**
     * 
     * @type {Date}
     * @memberof OperationSchedule
     */
    stop?: any;
    /**
     * 
     * @type {string}
     * @memberof OperationSchedule
     */
    type?: any;
    /**
     * 
     * @type {Array&lt;OperationScheduleTime&gt;}
     * @memberof OperationSchedule
     */
    operationScheduleTime?: any;
}
