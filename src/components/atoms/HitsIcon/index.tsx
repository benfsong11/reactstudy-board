import styled from "styled-components";
import OpenedEye from "../../../assets/icons/ic_eyeOpened.svg";

const Icon = styled.img`
  width: 0.75rem;
  height: 0.75rem;
`;

export default function HitsIcon() {
  return <Icon src={OpenedEye} alt="opened-eye" />;
}
