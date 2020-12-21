import { TypeofExpr } from "@angular/compiler";


export class timeGroups {
      id: number;
      timeGroupName: string;
      timeFrom: string;
      timeTo: Date;
      hasFlexibleHours: boolean;
      flexibleHours: number;
      fromDayOfWeek: string;
      toDayOfWeek: string;
}