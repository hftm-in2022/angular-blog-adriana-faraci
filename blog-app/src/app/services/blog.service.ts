import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponse } from '../models/blog.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = '/api/entries';

  constructor(private http: HttpClient) {}

  getEntries(pageIndex: number = 0, pageSize: number = 100): Observable<BlogResponse> {
    return this.http.get<BlogResponse>(`${this.apiUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`).pipe(
      catchError(error => {
        console.error('Fehler beim Abrufen der Blog-Übersicht:', error);
        throw error;
      })
    );
  }
}
