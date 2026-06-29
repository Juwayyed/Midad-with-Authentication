import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const MemoDetailPage = () => {
  const [memo, setMemo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response = await api.get(`/memos/${id}`);
        setMemo(response.data);
      } catch (error) {
        console.error("Error fetching memos!", error);
        if (error.response?.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to fetch memos!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchMemo();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are You Sure You Want To Delete This Memo?")) return;

    try {
      await api.delete(`/memos/${id}`);
      toast.success("Memo Deleted Successfully!");
      navigate("/");
    } catch (error) {
      console.error("An Error Happened While Deleting Memo!", error);
      toast.error(error.response?.data?.message || "Failed To Delete Memo");
    }
  };
  const handleSave = async () => {
    if (!memo.title.trim() || !memo.content.trim()) {
      toast.error("Please fill in all fields!");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/memos/${id}`, memo);
      toast.success("Memo Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("An Error Happened While Saving Memo!", error);
      toast.error(error.response?.data?.message || "Failed To Update Memo");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {isRateLimited && toast.error("Rate Limit Reached")}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back To Memos
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="h-5 w-5" />
              Delete Memo
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4 flex flex-col px-2">
                <label className="label mb-2">
                  <span className="label-text text-black">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Memo Title..."
                  className="input input-bordered w-full"
                  value={memo.title}
                  onChange={(e) => setMemo({ ...memo, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4 flex flex-col px-2">
                <label className="label mb-2">
                  <span className="label-text text-black">Content</span>
                </label>
                <textarea
                  placeholder="Start writing ..."
                  className="textarea textarea-bordered h-32 w-full"
                  value={memo.content}
                  onChange={(e) =>
                    setMemo({ ...memo, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoDetailPage;
