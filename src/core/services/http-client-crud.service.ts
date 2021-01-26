import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CrudOperations } from './crud-operations.interface';

export abstract class HttpClientCrudService<T, ID> implements CrudOperations<T, ID> {

  constructor(
    protected _http: HttpClient,
    protected _base: string
  ) {}
  
  findAll(): Observable<any> {
    return this._http.get<T[]>(this._base)
  }
  
  findOne(id: ID): Observable<T> {
    return this._http.get<T>(this._base + "/" + id);
  }

  save(t: T): Observable<T> {
    return this._http.post<T>(this._base, t);
  }

  update(id: ID, t: T): Observable<any> {
    return this._http.put<T>(this._base + "/" + id, t);
  }


  getAll():Observable<T> {
    return this._http.get(this._base) as Observable<T>;
  }


  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this._base + '/' + id);
	}

}