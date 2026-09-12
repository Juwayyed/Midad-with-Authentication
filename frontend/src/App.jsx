import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.jsx";
import Signup from "./pages/SignupPage.jsx";
import Login from "./pages/LoginPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import MemoDetailPage from "./pages/MemoDetailPage.jsx";
import FloatingIcon from "./components/FloatingIcon.jsx";
import { BookOpen, NotebookPen, PenLine, StickyNote } from "lucide-react";

const App = () => {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-indigo-950 to-violet-900 relative overflow-hidden">
      <FloatingIcon
        icon={BookOpen}
        size={100}
        top="30%"
        left="12%"
        color="text-indigo-300"
        delay={0}
      />

      <FloatingIcon
        icon={NotebookPen}
        size={80}
        top="65%"
        left="75%"
        color="text-violet-300"
        delay={2}
      />

      <FloatingIcon
        icon={PenLine}
        size={65}
        top="30%"
        left="80%"
        color="text-cyan-300"
        delay={4}
      />

      <FloatingIcon
        icon={StickyNote}
        size={70}
        top="70%"
        left="15%"
        color="text-indigo-200"
        delay={1}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/memo/:id" element={<MemoDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
