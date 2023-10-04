import styled from "styled-components";
import { Color } from "../../../constants/color";

const Text = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${Color.gray};
  margin-left: 0.25rem;
`;

interface PostHitsTextProps {
  hits: number;
}

export default function PostHitsText(props: PostHitsTextProps) {
  return <Text>{props.hits}</Text>;
}
