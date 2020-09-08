// import { BaseModel } from "../base.model";

<<<<<<< HEAD:src/models/Response/places.model.ts
export class Place{
=======
export class Place extends BaseModel{
>>>>>>> b4278ec84f0cbde1ed7b3d361b793cd28787cd06:src/models/Response/places.model.ts
    id: number;
    placeNameAr: string;
    placeNameEn: string;
    code: number;
    parentId?: number;
    children?: Place[]
}