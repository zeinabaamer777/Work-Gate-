import { CompanyInfo } from './companyInfo.model';
import { Place } from './place.model';

export interface Login {
    token: string;
    roleName: string;
    roleId: string;
    serialNumber: string;
    userName: string;
    firstName: string;
    middelName: string;
    lastName: string;
    email: string;
    uid: string;
    phoneNumber: string;
    imagePath: string;
    id: string;
    isSiteEngineer: boolean;
    canCreateGroup: boolean;
    companyInfo: CompanyInfo;
    placeViewModel: Place;
    position: Position;
}
