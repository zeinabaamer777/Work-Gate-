import { Place } from './place.model';

export interface CompanyInfo {
    companyInfoId: number;
    companyName: string;
    departmentId: number;
    departmentName: string;
    divisionId: number;
    divisionName: string;
    place: Place;
}