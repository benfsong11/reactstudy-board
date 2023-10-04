import { makeVar } from "@apollo/client";
import { Post, User } from "../api";

export const postsVar = makeVar<Post[]>([]);
export const isUpdateModeVar = makeVar<boolean>(false);
export const postForUpdateVar = makeVar<Post | null>(null);
export const userVar = makeVar<User | null>(null);
