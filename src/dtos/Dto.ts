import { Post, User } from "../api";

export interface UserDto {
  username: string;
  password: string;
}

export interface PostDto {
  title: string;
  body: string;
  user: User | null;
}

export interface CommentDto {
  body: string;
  user: User | null;
  post: Post;
}
