import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Blog } from '../schemas/blog.shema';

@Injectable({
  providedIn: 'root'
})
export class BlogStateService {
  private blogEntriesSubject = new BehaviorSubject<Blog[]>([]);
  public blogEntries$ = this.blogEntriesSubject.asObservable();

  setBlogEntries(blogEntries: Blog[]): void {
    this.blogEntriesSubject.next(blogEntries);
  }
}
