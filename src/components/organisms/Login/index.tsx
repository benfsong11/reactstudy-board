import React, { useState } from "react";
import OpenedEyeBlack from "../../../assets/icons/ic_eyeOpenedBlack.svg";
import SlashedEyeBlack from "../../../assets/icons/ic_eyeSlashed.svg";
import UserService from "../../../service/UserService";
import { userVar } from "../../../vars/var";
import Input from "../../atoms/Input";
import PasswordInput from "../../molecules/PasswordInput";
import ConfirmButton from "../../atoms/ConfirmButton";
import { AlignRight } from "../../atoms/Alignment";
import TextButton from "../../atoms/TextButton";

interface LoginProps {
  onClose: () => void;
}

export default function Login(props: LoginProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocusIn, setPasswordFocusIn] = useState(false);
  const [isSignupMode, setSignupMode] = useState(false);

  function handleSignupMode() {
    setSignupMode(!isSignupMode);
  }

  function signUp() {
    const newUser = {
      username: username,
      password: password,
    };

    UserService.createUser(newUser)
      .then((res) => {
        setUsername("");
        setPassword("");
        alert("회원가입에 성공했습니다.");
        setSignupMode(false);
      })
      .catch((err) => {
        alert("회원가입에 실패했습니다 : " + err);
      });
  }

  function signIn() {
    const loginRequest = {
      username: username,
      password: password,
    };

    UserService.signIn(loginRequest)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        userVar(res.data);
        setUsername("");
        setPassword("");
        alert(`환영합니다 ${res.data.username}님!`);
        props.onClose();
      })
      .catch((err) => {
        alert("로그인 실패 : " + err);
      });
  }

  const passwordFocusInStyle = {
    width: "23.7rem",
    marginTop: "1rem",
    outlineColor: "#F4E869",
    height: "3.25rem",
    borderRadius: "6px",
    border: "1px solid #F4E869",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    display: "flex",
    alignItems: "center",
  };

  const passwordFocusOutStyle = {
    width: "23.7rem",
    marginTop: "1rem",
    outline: "none",
    height: "3.25rem",
    borderRadius: "6px",
    border: "1px solid #b4b4b3",
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem",
    display: "flex",
    alignItems: "center",
  };

  function handlePasswordVisible() {
    setPasswordVisible(!isPasswordVisible);
  }

  function handlePasswordFocusIn() {
    setPasswordFocusIn(true);
  }

  function handlePasswordFocusOut() {
    setPasswordFocusIn(false);
  }

  return (
    <div>
      <Input value={username} onChange={setUsername} placeholder="아이디" />
      <PasswordInput
        value={password}
        onChange={setPassword}
        placeholder="비밀번호"
      />
      <ConfirmButton
        disabled={username === "" || password === ""}
        onClick={isSignupMode ? signUp : signIn}
        text={isSignupMode ? "회원가입" : "로그인"}
      />
      <AlignRight>
        <TextButton
          onClick={handleSignupMode}
          isSmall={true}
          hasMarginTop={true}
          text={isSignupMode ? "로그인" : "회원가입"}
        />
      </AlignRight>
    </div>
  );
}
