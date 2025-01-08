import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../../environments/environment';
import { Entries, EntriesSchema, BlogDetails, BlogDetailsSchema, Blog } from '../../schemas/blog.shema';
import { OidcSecurityService } from 'angular-auth-oidc-client';
 
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  httpClient = inject(HttpClient);
  private oidcSecurityService = inject(OidcSecurityService);

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

  checkTitleExists(title: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.serviceUrl}/check-title?title=${title}`);
  }

  saveBlog(blog: {
    title: string;
    content: string;
    headerImageUrl?: string;
  }): Observable<Blog> {
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        return this.httpClient.post<Blog>(
          `${environment.serviceUrl}/entries`,
          blog,
          { headers },
        );
      }),
    );
  }
}