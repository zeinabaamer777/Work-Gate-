export interface GroupTimeForUser {
      userId: string,
      siteId: number,
      timeGroupID: number,
      siteName: string,
      timeGroupName: string,
      timeFrom: Date,
      timeTo: Date,
      firstName: string,
      lastName: string,
      hasFlexibleHours: boolean,
      flexibleHours: number,
      fromDayOfWeek: string,
      toDayOfWeek: string,
      latitude: number,
      longitude: number,
      radius: number,
      hex: any
}