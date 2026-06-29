import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utilities";
import api from "../lib/axios";
import toast from "react-hot-toast";

const MemoCard = ({ memo, setMemos }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are You Sure You Want To Delete This Memo?")) return;

    try {
      await api.delete(`/memos/${id}`);
      setMemos((prev) => prev.filter(memo => memo._id !== id)); //Gets rid of the deleted memo
      toast.success("Memo Deleted Successfully!");
    } catch (error) {
      console.error("An Error Happened While Deleting Memo!", error);
      toast.error(error.response?.data?.message || "Failed To Delete Memo");
    }
  };
  return (
    <Link
      to={`/memo/${memo._id}`}
      className="card bg-base-200 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-base-300"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{memo.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{memo.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(memo.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <PenSquareIcon className="size-4" />
            <button
              className="btn btn-ghost btn-xs text-error"
              onClick={(e) => handleDelete(e, memo._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MemoCard;
