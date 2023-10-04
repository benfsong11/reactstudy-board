import { useEffect, useState } from "react";
import BoardService from "../service/BoardService";
import { useReactiveVar } from "@apollo/client";
import { postsVar } from "../vars/var";
import { ReactComponent as Pencil } from "../assets/icons/ic_pencil.svg";
import { useNavigate } from "react-router-dom";
import { Post } from "../api";
import PostItem from "../components/organisms/PostItem";
import { Pagination } from "../components/atoms/Pagination";
import { AlignCenter } from "../components/atoms/Alignment";

export default function ListBoardComponent() {
  const posts = useReactiveVar(postsVar);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태 추가
  const [currentPosts, setCurrentPosts] = useState<Post[]>([]);
  const itemsPerPage = 8; // 페이지당 아이템 수

  useEffect(() => {
    try {
      BoardService.getBoards().then((res) => {
        res.data.sort(
          (a: Post, b: Post) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        postsVar(res.data);
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  // 페이징 처리를 위한 함수
  useEffect(() => {
    const indexOfLastPost = (currentPage + 1) * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const curPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(curPosts);
  }, [currentPage, posts]);

  // 페이지 변경 핸들러
  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <div style={{ width: "40rem" }}>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button
          onClick={() => {
            navigate("/board/post/new");
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            cursor: "pointer",
            backgroundColor: "#F4E869",
            width: "5rem",
            height: "2rem",
          }}
        >
          <Pencil style={{ width: "1.25rem", height: "1.25rem" }} />
          <div style={{ width: "0.25rem" }} />
          <div>글쓰기</div>
        </button>
      </div>
      <div style={{ height: "1rem" }} />
      <div
        style={{
          borderBottom: "1px solid #B4B4B3",
        }}
      >
        {currentPosts.map(
          (post) =>
            post.isDeleted === false && (
              <PostItem key={post.id.toString()} post={post} />
            )
        )}
      </div>
      <AlignCenter>
        <Pagination
          previousLabel={"〈"}
          nextLabel={"〉"}
          breakLabel={"..."}
          pageCount={Math.ceil(posts.length / itemsPerPage)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </AlignCenter>
    </div>
  );
}
