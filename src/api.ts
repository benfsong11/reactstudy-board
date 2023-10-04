export type Post = {
  id: BigInt;
  title: string;
  body: string;
  hits: number;
  user: User | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export type User = {
  id: BigInt;
  username: string;
  password: string;
};

export type Comment = {
  id: BigInt;
  body: string;
  user: User | null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  post: Post;
};
