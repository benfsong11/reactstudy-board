import NavBar from "./components/NavBar";
import BoardDetails from "./pages/BoardDetails";
import ListBoardComponent from "./pages/ListBoardComponent";
import WriteBoardComponent from "./pages/WriteBoardComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Router>
        <NavBar />
        <div style={{ height: "100px" }} />
        <Routes>
          <Route path="/" element={<ListBoardComponent />} />
          <Route path="/board/post/new" element={<WriteBoardComponent />} />
          <Route path="/board/:index" element={<BoardDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
