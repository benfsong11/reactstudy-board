import styled from "styled-components";
import { Color } from "../../../constants/color";

const Body = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${Color.darkgray};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
`;

interface PostBodyProps {
  text: string;
}

export default function PostBody(props: PostBodyProps) {
  return <Body>{props.text}</Body>;
}
