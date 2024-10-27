import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponse } from '../models/blog.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'https://d-cap-blog-backend---v2.whitepond-b96fee4b.westeurope.azurecontainerapps.io';

  constructor(private http: HttpClient) {}

  getEntries(pageIndex: number = 0, pageSize: number = 10, searchstring?: string, updatedAfter?: string): Observable<BlogResponse> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    if (searchstring) {
      params = params.set('searchstring', searchstring);
    }
    if (updatedAfter) {
      params = params.set('updatedAfter', updatedAfter);
    }

    return this.http.get<BlogResponse>(`${this.apiUrl}/entries`, { params }).pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Blog-Übersicht:', error);
        throw error;
      })
    );
  }
}
