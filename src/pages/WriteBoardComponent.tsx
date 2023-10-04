import { useState, useEffect } from "react";
import BoardService from "../service/BoardService";
import {
  postForUpdateVar,
  postsVar,
  isUpdateModeVar,
  userVar,
} from "../vars/var";
import { useReactiveVar } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { User } from "../api";

export default function WriteBoardComponent() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const posts = useReactiveVar(postsVar);
  const boardForUpdate = useReactiveVar(postForUpdateVar);
  const isUpdateMode = useReactiveVar(isUpdateModeVar);
  const [buttonText, setButtonText] = useState("등록");
  const navigate = useNavigate();

  const userJson = localStorage.getItem("user"); // user 정보 가져오기

  let currentUser: User | null = null; // 기본적으로 null로 초기화

  if (userJson !== null) {
    // user 정보가 존재할 때만 파싱하고 할당
    currentUser = JSON.parse(userJson);
  }

  function addPosting() {
    const newPost = {
      title: title,
      body: content,
      hits: 0,
      user: currentUser,
    };

    BoardService.createBoard(newPost)
      .then((res) => {
        setTitle("");
        setContent("");
        alert("등록되었습니다");
        navigate("/");
      })
      .catch((err) => {
        alert("등록에 실패했습니다 : " + err);
      });
  }

  function updatePosting() {
    const updatePost = {
      title: title,
      body: content,
      user: currentUser,
    };

    BoardService.updateBoard(updatePost, boardForUpdate?.id!).then((res) => {
      setTitle("");
      setContent("");
      alert("수정이 완료되었습니다.");
      isUpdateModeVar(false);
      postForUpdateVar(null);
      navigate(`/board/${boardForUpdate?.id!}`, { state: boardForUpdate });
    });
  }

  useEffect(() => {
    if (isUpdateMode) {
      setButtonText("수정");
      setTitle(boardForUpdate?.title!);
      setContent(boardForUpdate?.body!);
    } else {
      setButtonText("등록");
      setTitle("");
      setContent("");
    }
  }, [isUpdateMode, boardForUpdate]);

  return (
    <div style={{ width: "40rem" }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요."
        style={{
          width: "100%",
          color: "#000000",
          fontSize: 24,
          fontWeight: 700,
          border: "none",
          outline: "none",
        }}
      />
      <div style={{ height: "2rem" }} />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="내용을 입력하세요."
        style={{
          width: "100%",
          height: "37.5rem",
          resize: "none",
          border: "1px solid #B4B4B3",
          fontSize: 20,
          fontWeight: 500,
          borderRadius: "8px",
          padding: "1rem",
          outline: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          marginTop: "0.5rem",
          paddingLeft: "2rem",
          width: "100%",
        }}
      >
        <button
          onClick={() => {
            isUpdateModeVar(false);
            setTitle("");
            setContent("");
            navigate(-1);
          }}
          style={{
            marginRight: "0.5rem",
            backgroundColor: "transparent",
            outline: "none",
            border: "1px solid #b4b4b3",
            fontSize: 16,
            fontWeight: 500,
            borderRadius: "4px",
            width: "3rem",
            height: "2rem",
            cursor: "pointer",
          }}
        >
          취소
        </button>
        <button
          disabled={title === "" || content === ""}
          onClick={isUpdateMode ? updatePosting : addPosting}
          style={{
            backgroundColor: "#F4E869",
            outline: "none",
            border: "none",
            fontSize: 16,
            fontWeight: 500,
            borderRadius: "4px",
            width: "3rem",
            height: "2rem",
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
