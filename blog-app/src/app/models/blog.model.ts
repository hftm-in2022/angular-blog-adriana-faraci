export interface BlogResponse {
  data: BlogEntry[];
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  maxPageSize: number;
}

export interface BlogEntry {
  id: number;
  author: string;
  comments: number;
  contentPreview: string;
  createdAt: string;
  createdByMe: boolean;
  headerImageUrl: string;
  likes: number;
  likedByMe: boolean;
  title: string;
  updatedAt: string;
}
