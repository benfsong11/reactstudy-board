import { useLocation, useNavigate } from "react-router-dom";
import { Comment, Post } from "../api";
import { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { postForUpdateVar, isUpdateModeVar, userVar } from "../vars/var";
import { useReactiveVar } from "@apollo/client";
import { calculateDate } from "../utils/functions";

export default function BoardDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [board, setBoard] = useState<Post>(state);
  const currentUser = useReactiveVar(userVar);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    BoardService.getComments()
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error(err));

    if (currentUser == null) return;

    BoardService.getBoardById(currentUser.id, state.id)
      .then((res) => {
        setBoard(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  function deletePosting() {
    BoardService.deleteBoard(state.id)
      .then((res) => {
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      })
      .catch((err) => {
        alert("삭제에 실패했습니다 : " + err);
      });
  }

  function addComment() {
    const newComment = {
      body: comment,
      user: currentUser,
      post: state,
    };

    BoardService.createComment(newComment)
      .then((res) => {
        alert("댓글이 등록되었습니다!");
      })
      .catch((err) => {
        alert("댓글 등록 실패 : " + err);
      });
  }

  return (
    <div style={{ width: "40rem" }}>
      <div
        style={{ borderBottom: "1px solid #B4B4B3", paddingBottom: "0.5rem" }}
      >
        <h2>{board.title}</h2>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
                {new Date(board.createdAt).toLocaleString()}
              </div>
              <div style={{ width: "0.25rem" }} />
              <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
                작성
              </div>
            </div>
            <div style={{ width: "0.25rem" }} />
            <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
              ·
            </div>
            <div style={{ width: "0.25rem" }} />
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
                {new Date(board.updatedAt).toLocaleString()}
              </div>
              <div style={{ width: "0.25rem" }} />
              <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
                수정
              </div>
            </div>
            <div style={{ width: "0.25rem" }} />
            <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
              ·
            </div>
            <div style={{ width: "0.25rem" }} />
            <div style={{ display: "flex" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#B4B4B3" }}>
                조회수
              </div>
              <div style={{ width: "0.25rem" }} />
              <div style={{ fontSize: 12, fontWeight: 600, color: "#B4B4B3" }}>
                {board.hits}
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <button
              onClick={() => {
                isUpdateModeVar(true);
                postForUpdateVar(state);
                navigate("/board/post/new");
              }}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#B4B4B3",
                border: "none",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              수정
            </button>
            <div style={{ width: "0.125rem" }} />
            <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
              ·
            </div>
            <div style={{ width: "0.125rem" }} />
            <button
              onClick={deletePosting}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#B4B4B3",
                border: "none",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
      <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
        {board.body}
      </div>
      <div style={{ borderTop: "1px solid #B4B4B3", paddingTop: "2rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력해 보세요."
            style={{
              borderRadius: "4px",
              border: "1px solid #B4B4B3",
              outline: "none",
              padding: "0.5rem 1rem 0.5rem 1rem",
              width: "36rem",
              height: "1rem",
            }}
          />
          <div style={{ width: "1rem" }} />
          <button
            disabled={comment === ""}
            onClick={addComment}
            style={{
              width: "3rem",
              height: "2rem",
              cursor: "pointer",
              outline: "none",
              border: "none",
              borderRadius: "4px",
              backgroundColor: "#F4E869",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            등록
          </button>
        </div>
        <div style={{ paddingTop: "2rem" }}>
          {comments.map(
            (comment) =>
              comment.isDeleted === false && (
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "2rem",
                    }}
                  >
                    <div>{comment.user?.username}</div>
                    <div style={{ width: "0.25rem" }} />
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        color: "#B4B4B3",
                      }}
                    >
                      ·
                    </div>
                    <div style={{ width: "0.25rem" }} />
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#B4B4B3",
                      }}
                    >
                      {calculateDate(comment.createdAt)}
                    </div>
                  </div>
                  <div style={{ paddingTop: "0.5rem" }}>{comment.body}</div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
}
