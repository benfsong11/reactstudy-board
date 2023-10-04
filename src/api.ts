export interface Post {
  id: BigInt;
  title: string;
  body: string;
  hits: number;
  user: User | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
}

export interface User {
  id: BigInt;
  username: string;
  password: string;
}

export interface Comment {
  id: BigInt;
  body: string;
  user: User | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  post: Post;
}
