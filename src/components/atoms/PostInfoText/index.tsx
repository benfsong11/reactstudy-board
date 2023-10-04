import styled from "styled-components";
import { Color } from "../../../constants/color";

const Text = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${Color.gray};
`;

interface PostInfoTextProps {
  text: string | undefined;
}

export default function PostInfoText(props: PostInfoTextProps) {
  return <Text>{props.text}</Text>;
}
