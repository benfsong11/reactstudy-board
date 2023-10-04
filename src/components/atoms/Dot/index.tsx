import styled from "styled-components";
import { Color } from "../../../constants/color";

const DotProps = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: ${Color.gray};
  margin-left: 0.25rem;
  margin-right: 0.25rem;
`;

export default function Dot() {
  return <DotProps>·</DotProps>;
}
