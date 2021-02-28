import { Locations } from "./locations.model";
import { siteAttendanceVM } from "./siteAttendanceVM.model";

export interface LocationVM {
   location : Locations;
   siteAttandanceVM: siteAttendanceVM;
}
