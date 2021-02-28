export interface siteAttendanceVM {
      userName: string;
      attandanceId: number;
      timeAttendance: Date;
      timeLeave: Date;
      isLeft: boolean;
      userId: string;
      dateOfCreate: Date;
      latitude: number;
      longitude: number;
      address: string;
      siteName: string;
      siteTypeAr: string;
      siteTypeEn: string;
      siteTypeId: number;
      siteId: number;
      radius: number;
      endLatLong: string;
      startLatLong: string
}
