import { SiteAttandanceVM } from "./siteAttandanceVM.model";
import { LocationsList } from "./locationsList.model";

export interface LocationInSoecificDate {
    location: LocationsList[];
    siteAttandanceVM : SiteAttandanceVM[];
}