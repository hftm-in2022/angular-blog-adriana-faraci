import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../environments/environment.development';
import { Entries, BlogDetails, EntriesSchema, BlogDetailsSchema } from '../schemas/blog.shema';
 
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  httpClient = inject(HttpClient);

  getEntries(): Observable<Entries> {
    return this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`)
      .pipe(map((entries) => EntriesSchema.parse(entries)));
  }

  getBlogById(id: number): Observable<BlogDetails> {
    return this.httpClient
      .get<BlogDetails>(`${environment.serviceUrl}/entries/${id}`)
      .pipe(map((blogDetails) => BlogDetailsSchema.parse(blogDetails)));
  }
}