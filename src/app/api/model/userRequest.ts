/**
 * OpenApi Specification - Kachmar
 *
 * Contact: contact@kachmar.ma
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface UserRequest { 
    firstname: string;
    lastname: string;
    email: string;
    password?: string;
    roleIds: Array<number>;
    dateOfBirth?: string;
    portfolio?: string;
    available?: boolean;
    teamSize?: number;
}

