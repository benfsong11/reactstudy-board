import { Link } from "react-router-dom";
import styled from "styled-components";
import { Color } from "../../../constants/color";

const HomeLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.div`
  text-decoration: none;
  color: ${Color.black};
  font-family: Ultra;
  font-size: 24px;
  font-weight: 400;
`;

export default function AppTitle() {
  return (
    <HomeLink to="/">
      <Title>SHAWN BOARD</Title>
    </HomeLink>
  );
}
