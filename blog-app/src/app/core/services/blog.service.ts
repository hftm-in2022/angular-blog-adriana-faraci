import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, switchMap, finalize } from 'rxjs';
import { z } from 'zod';
import { environment } from '../../../environments/environment';
import { Entries, EntriesSchema, BlogDetails, BlogDetailsSchema, Blog } from '../../schemas/blog.shema';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProgressStateService } from './progress.state.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService { // state und backend Services sollten getrennt werden
  httpClient = inject(HttpClient);
  private oidcSecurityService = inject(OidcSecurityService);
  private progressStateService = inject(ProgressStateService);

  getEntries(): Observable<Entries> {
    this.progressStateService.setLoadingState(true); // Set loading to true
    return this.httpClient
      .get<Entries>(`${environment.serviceUrl}/entries`)
      .pipe(
        map((entries) => EntriesSchema.parse(entries)),
        finalize(() => this.progressStateService.setLoadingState(false)) // Set loading to false
      );
  }

  getBlogById(id: number): Observable<BlogDetails> {
    this.progressStateService.setLoadingState(true); // Set loading to true
    return this.httpClient
      .get<BlogDetails>(`${environment.serviceUrl}/entries/${id}`)
      .pipe(
        map((blogDetails) => BlogDetailsSchema.parse(blogDetails)),
        finalize(() => this.progressStateService.setLoadingState(false)) // Set loading to false
      );
  }

  checkTitleExists(title: string): Observable<boolean> {
    this.progressStateService.setLoadingState(true); // Set loading to true
    return this.httpClient
      .get<boolean>(`${environment.serviceUrl}/check-title?title=${title}`)
      .pipe(finalize(() => this.progressStateService.setLoadingState(false))); // Set loading to false
  }

  saveBlog(blog: { title: string; content: string; headerImageUrl?: string }): Observable<Blog> {
    this.progressStateService.setLoadingState(true); // Set loading to true
    return this.oidcSecurityService.getAccessToken().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`, // token wird über secure route konfiguriert
        });
        return this.httpClient.post<Blog>(
          `${environment.serviceUrl}/entries`,  // keine Validierung
          blog,
          { headers },
        );
      }),
      finalize(() => this.progressStateService.setLoadingState(false)) // Set loading to false
    );
  }
}
