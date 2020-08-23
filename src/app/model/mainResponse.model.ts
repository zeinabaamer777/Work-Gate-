export interface MainResponse<T> {
    code: number;
    message: string;
    data: T;
}