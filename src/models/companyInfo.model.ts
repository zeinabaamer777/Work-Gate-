import { Place } from './Response/places.model';

export interface CompanyInfo {
    companyInfoId: number;
    companyName: string;
    departmentId: number;
    departmentName: string;
    divisionId: number;
    divisionName: string;
    place: Place;
}