import { BaseModel } from "../base.model";

export class Place extends BaseModel{
    
    placeNameAr: string;
    placeNameEn: string;
    code: number;
    parentId?: number;
    children?: Place[]
}