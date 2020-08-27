export interface SiteAttandanceVM {
    userName: string;
    attandanceId: number;
    timeAttendance: string;
    timeLeave: string;
    isLeft: boolean;
    userId: string;
    dateOfCreate: string;
    latitude: number;
    longitude: number;
    address: string;
    siteName: string;
    siteTypeAr: string;
    siteTypeEn: string;
    siteTypeId: number;
    siteId: number;
    radius: number;
    endLatLong: number;
    startLatLong: number;
}