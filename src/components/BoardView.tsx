import { useState } from "react";
import { Post } from "../api";
import { ReactComponent as OpenedEye } from "../assets/icons/ic_eyeOpened.svg";
import { useNavigate } from "react-router-dom";
import { calculateDate } from "../utils/functions";

interface BoardViewProps {
  post: Post;
}

export default function BoardView(props: BoardViewProps) {
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onClick={() => {
        navigate(`/board/${props.post.id}`, { state: props.post });
      }}
      style={{
        borderTop: "1px solid #B4B4B3",
        padding: "0.5rem 0.5rem 0.5rem 0.5rem",
        cursor: "pointer",
        backgroundColor: isHovered ? "rgba(0, 0, 0, 0.05)" : "#FFFFFF",
      }}
    >
      <div style={{ fontSize: 16, fontWeight: 700 }}>{props.post.title}</div>
      <div style={{ height: "0.25rem" }} />
      <div
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: "#7D7C7C",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
        }}
      >
        {props.post.body}
      </div>
      <div style={{ height: "0.5rem" }} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
            {props.post.user?.username}
          </div>
          <div style={{ width: "0.25rem" }} />
          <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
            ·
          </div>
          <div style={{ width: "0.25rem" }} />
          <div style={{ fontSize: 12, fontWeight: 500, color: "#B4B4B3" }}>
            {calculateDate(props.post.createdAt)}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <OpenedEye style={{ width: "0.75rem", height: "0.75rem" }} />
          <div style={{ width: "0.25rem" }} />
          <div style={{ fontSize: 12, fontWeight: 600, color: "#B4B4B3" }}>
            {props.post.hits}
          </div>
        </div>
      </div>
    </div>
  );
}
