import styled from "styled-components";

const AlignTop = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
`;

const AlignRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
`;

const AlignBottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
`;

const AlignLeft = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AlignSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export {
  AlignTop,
  AlignRight,
  AlignBottom,
  AlignLeft,
  AlignCenter,
  AlignSpaceBetween,
};
