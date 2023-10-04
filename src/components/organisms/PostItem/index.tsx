import { useState } from "react";
import { Post } from "../../../api";
import { useNavigate } from "react-router-dom";
import { calculateDate } from "../../../utils/functions";
import PostTitle from "../../atoms/PostTitle";
import PostBody from "../../atoms/PostBody";
import { AlignCenter, AlignSpaceBetween } from "../../atoms/Alignment";
import styled from "styled-components";
import { Color } from "../../../constants/color";
import { FlexContainer } from "../../atoms/FlexContainer";
import Dot from "../../atoms/Dot";
import PostInfoText from "../../atoms/PostInfoText";
import HitsIcon from "../../atoms/HitsIcon";
import PostHitsText from "../../atoms/PostHitsText";

interface ContainerProps {
  isHovered: boolean;
}

const Container = styled.div<ContainerProps>`
  border-top: 1px solid ${Color.gray};
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isHovered ? Color.black0_05 : Color.white};
`;

interface BoardViewProps {
  post: Post;
}

export default function BoardView(props: BoardViewProps) {
  const [isHovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <Container
      isHovered={isHovered}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/board/${props.post.id}`, { state: props.post })}
    >
      <PostTitle text={props.post.title} />
      <PostBody text={props.post.body} />
      <AlignSpaceBetween>
        <FlexContainer>
          <PostInfoText text={props.post.user?.username} />
          <Dot />
          <PostInfoText text={calculateDate(props.post.createdAt)} />
        </FlexContainer>
        <AlignCenter>
          <HitsIcon />
          <PostHitsText hits={props.post.hits} />
        </AlignCenter>
      </AlignSpaceBetween>
    </Container>
  );
}
