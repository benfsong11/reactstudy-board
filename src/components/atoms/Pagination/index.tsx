import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const Pagination = styled(ReactPaginate).attrs({
  activeClassName: "active",
})`
  margin: 50px 16px;
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0 5rem;

  li a {
    border-radius: 7px;
    padding: 0.1rem 1rem;
    cursor: pointer;
  }

  li.previous a,
  li.next a {
    color: #62b6b7;
  }

  li.active a {
    color: #f4e869;
    font-weight: 700;
    min-width: 32px;
  }

  li.disabled a {
    color: #b4b4b3;
  }

  li.disable,
  li.disabled a {
    cursor: default;
  }
`;
