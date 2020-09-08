// import { BaseModel } from "../base.model";

export class Place{
    id: number;
    placeNameAr: string;
    placeNameEn: string;
    code: number;
    parentId?: number;
    children?: Place[]
}