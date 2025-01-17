import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogDetails } from '../../schemas/blog.shema';
import { BlogService } from '../services/blog.service';

@Injectable({
  providedIn: 'root'
})
export class BlogResolver implements Resolve<BlogDetails> {  // resolve function anstelle Klasse verwenden
  constructor(private blogService: BlogService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<BlogDetails> {
    const blogId = route.paramMap.get('id');
    return this.blogService.getBlogById(Number(blogId));
  }
}
