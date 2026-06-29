import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import MemoDetailPage from "./pages/MemoDetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/memo/:id" element={<MemoDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
