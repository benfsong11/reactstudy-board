import styled from "styled-components";

const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

interface PostTitleProps {
  text: string;
}

export default function PostTitle(props: PostTitleProps) {
  return <Title>{props.text}</Title>;
}
