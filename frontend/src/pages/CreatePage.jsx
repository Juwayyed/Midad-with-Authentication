import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/axios";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Fill in the required fields!");
      return;
    }

    setLoading(true);

    try {
      await api.post("/memos", {
        title,
        content,
      });
      toast.success("Memo Created Successfully!");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("You are creating too many requests", {
          duration: 4000, //4000ms = 4 seconds
          icon: "💀",
        });
      } else {
        toast.error("Failed To Create Memo!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back To Memos
          </Link>
          <div className="card bg-base-200">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Memo</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4 flex flex-col px-2">
                  <label className="label mb-2">
                    <span className="label-text text-black">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Memo Title..."
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col px-2">
                  <label className="label mb-2">
                    <span className="label-text text-black">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Start writing ..."
                    className="textarea textarea-bordered h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary disabled"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Memo"}{" "}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
