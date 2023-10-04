import Modal from "../Modal";
import { useState } from "react";
import Login from "../Login";
import { User } from "../../../api";
import AppTitle from "../../atoms/AppTitle";
import styled from "styled-components";
import TextButton from "../../atoms/TextButton";
import { Color } from "../../../constants/color";

const NavBarContainer = styled.div`
  background-color: ${Color.white};
  width: 40rem;
  height: 4rem;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  z-index: 1;
`;

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
    <NavBarContainer>
      <AppTitle />
      <TextButton
        isSmall={false}
        hasMarginTop={false}
        text={currentUser ? currentUser.username : "로그인"}
        onClick={currentUser ? logout : openLoginModal}
      />
      <Modal isOpened={isLoginModalOpened} onClose={closeLoginModal}>
        <Login onClose={closeLoginModal} />
      </Modal>
    </NavBarContainer>
  );
}
