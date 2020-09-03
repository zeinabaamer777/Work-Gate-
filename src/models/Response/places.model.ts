import { BaseModel } from "../base.model";

export class Place extends BaseModel{
    id: number;
    placeNameAr: string;
    placeNameEn: string;
    code: number;
    parentId?: number;
    children?: Place[]
}