import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import MemoCard from "../components/MemoCard";
import RateLimitedUI from "../components/RateLimitedUI";
import NoMemos from "../components/NoMemos";
import toast from "react-hot-toast";
import api from "../lib/axios";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [memos, setMemos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const res = await api.get("/memos");
        //console.log(res.data);
        setMemos(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error fetching memos!", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load memos!");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemos();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />
      {/* If isRateLimited = True, render that component */}
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto mt-6 p-4">
        {loading && (
          <div className="text-center text-primary py-10">Loading Memos...</div>
        )}

        {memos.length === 0 && !isRateLimited && <NoMemos />}

        {memos.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {memos.map((memo) => (
              <MemoCard key={memo._id} memo={memo} setMemos={setMemos} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
