import { Position } from './Response/position.model';
import { SiteResponsibility } from 'core/models/Response/siteResponsibility.model';
import { Place } from './Response/places.model';
import { Company } from './Response/company.model';
export class Users {
      isBlocked               : boolean;
      roleName                : string;
      roleId                  : string;
      serialNumber            : string;
      divisionId	            : number;
      positionId	            : number; 
      positionNameAr          : string;
      positionNameEn          : string;
      departmentId            : number;
      departmentEnName        : string;
      departmentArName        : string;
      divisionEnName          : string;
      divisionArName          : string;
      companyID	            : number;
      countryId               : number;
      countryNameEn           : string;
      countryNameAr           : string;
      companyEnName           : string;
      companyArName           : string;
      governmentId	      : number
      governmentNameEn        : string;
      governmentNameAr        : string;
      siteUserResposibilities	: SiteResponsibility;
      position	            : Position
      userName                : string;
      firstName               : string;
      middleName              : string;
      lastName                : string;
      email                   : string;
      uid                     : string;
      pwd                     : string;
      phoneNumber             : string;
      imagePath               : string;
      placeViewModel	      : Place;
      id		            : string;
      canCreateVisit	      : boolean;
      canCreateGroup	      : boolean;
      companyInfo             : Company;
      placeId                 : number;
}
