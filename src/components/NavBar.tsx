import { Link } from "react-router-dom";
import Modal from "../components/Modal/Modal";
import { useState } from "react";
import Login from "../components/Login/Login";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "../vars/var";
import { User } from "../api";

export default function NavBar() {
  const [isLoginModalOpened, setLoginModalVisible] = useState(false);
  const userJson = localStorage.getItem("user"); // user 정보 가져오기

  let currentUser: User | null = null; // 기본적으로 null로 초기화

  if (userJson !== null) {
    // user 정보가 존재할 때만 파싱하고 할당
    currentUser = JSON.parse(userJson);
  }

  function openLoginModal() {
    setLoginModalVisible(true);
  }

  function closeLoginModal() {
    setLoginModalVisible(false);
  }

  function logout() {
    localStorage.setItem("user", JSON.stringify(null));
    alert("안녕히 가세요.");
    window.location.reload();
  }

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        width: "40rem",
        height: "4rem",
        position: "fixed",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        top: 0,
        zIndex: 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#000000",
            fontFamily: "Ultra",
            fontSize: 24,
            fontWeight: 400,
          }}
        >
          <div>SHAWN BOARD</div>
        </Link>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <button
          onClick={currentUser ? logout : openLoginModal}
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
          }}
        >
          {currentUser ? currentUser.username : "로그인"}
        </button>
        <Modal isOpened={isLoginModalOpened} onClose={closeLoginModal}>
          <Login onClose={closeLoginModal} />
        </Modal>
      </div>
    </div>
  );
}
