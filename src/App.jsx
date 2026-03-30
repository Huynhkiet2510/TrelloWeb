import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BoardPage from "./pages/BoardPage";
import BoardListPage from "./pages/BoardList/BoardList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // trigger codefactor
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        style={{ zIndex: 9999 }}
      />
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;