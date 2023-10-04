import axios from "axios";

import { CommentDto, PostDto } from "../dtos/Dto";

const BOARD_API_BASE_URL = "http://localhost:8080/api/board/post";

class BoardService {
  getBoards() {
    return axios.get(BOARD_API_BASE_URL);
  }

  getBoardById(userId: BigInt, boardId: BigInt) {
    return axios.get(
      BOARD_API_BASE_URL + `/read?userId=${userId}&boardId=${boardId}`
    );
  }

  createBoard(post: PostDto) {
    return axios.post(BOARD_API_BASE_URL, post);
  }

  updateBoard(post: PostDto, postId: BigInt) {
    return axios.put(BOARD_API_BASE_URL + "/update/" + postId, post);
  }

  deleteBoard(id: string) {
    return axios.delete(BOARD_API_BASE_URL + "/delete/" + id);
  }

  createComment(comment: CommentDto) {
    return axios.post(BOARD_API_BASE_URL + "/comment/new", comment);
  }

  getComments() {
    return axios.get(BOARD_API_BASE_URL + "/comment");
  }
}

export default new BoardService();
