import { Component } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'] 
})
export class PostListComponent {
  posts = [
    { title: 'First Post', content: 'This is the content of the first post.' },
    { title: 'Second Post', content: 'This is the content of the second post.' }
  ];

  selectedPost: any;
  newPostTitle: string = '';
  newPostContent: string = '';

  selectPost(post: any) {
    this.selectedPost = post;
  }

  addPost() {
    if (this.newPostTitle && this.newPostContent) {
      this.posts.push({ title: this.newPostTitle, content: this.newPostContent });
      this.newPostTitle = '';
      this.newPostContent = '';
    }
  }
}
