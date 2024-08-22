import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http
      .get<any[]>(environment.apiUrl) // any state will be replaced with the type from the app state
      .pipe(map((data: any) => data));
  }
}
