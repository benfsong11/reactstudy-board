import React, { useState } from "react";
import OpenedEyeBlack from "../../assets/icons/ic_eyeOpenedBlack.svg";
import SlashedEyeBlack from "../../assets/icons/ic_eyeSlashed.svg";
import UserService from "../../service/UserService";
import { userVar } from "../../vars/var";

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
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <button
          onClick={props.onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            outline: "none",
          }}
        >
          &times;
        </button>
      </div>
      <div
        style={{
          color: "#000000",
          fontFamily: "Ultra",
          fontSize: 16,
          fontWeight: 400,
          marginTop: "0.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        SHAWN BOARD
      </div>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "24rem",
          marginTop: "1rem",
          outlineColor: "#F4E869",
          height: "3.25rem",
          borderRadius: "6px",
          border: "1px solid #b4b4b3",
          paddingLeft: "0.5rem",
        }}
        placeholder="아이디"
      />
      <div
        style={isPasswordFocusIn ? passwordFocusInStyle : passwordFocusOutStyle}
      >
        <input
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={handlePasswordFocusIn}
          onBlur={handlePasswordFocusOut}
          style={{
            width: "22.7rem",
            border: "none",
            outline: "none",
          }}
          placeholder="비밀번호"
        />
        <button
          onClick={handlePasswordVisible}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            width: "1.25rem",
            height: "1.25rem",
            cursor: "pointer",
          }}
        >
          <img
            src={isPasswordVisible ? SlashedEyeBlack : OpenedEyeBlack}
            alt="opened eye black"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
        </button>
      </div>
      <button
        disabled={username === "" || password === ""}
        onClick={isSignupMode ? signUp : signIn}
        style={{
          backgroundColor: "#F4E869",
          border: "none",
          outline: "none",
          borderRadius: "6px",
          marginTop: "1rem",
          width: "24.8rem",
          height: "3.25rem",
          cursor: "pointer",
        }}
      >
        {isSignupMode ? "회원가입" : "로그인"}
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <button
          onClick={handleSignupMode}
          style={{
            color: "#b4b4b3",
            fontSize: 12,
            fontWeight: 500,
            marginTop: "0.5rem",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }}
        >
          {isSignupMode ? "로그인" : "회원가입"}
        </button>
      </div>
    </div>
  );
}
