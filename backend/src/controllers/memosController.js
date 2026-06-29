import Memo from "../models/Memo.js";

export async function getAllMemos(request, response) {
  try {
    const memos = await Memo.find().sort({ createdAt: -1 });
    response.status(200).json(memos);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMemoById(request, response) {
  try {
    const memo = await Memo.findById(request.params.id);

    if (!memo) return response.status(404).json({ message: "Memo not found!" });

    response.status(200).json(memo);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createMemo(request, response) {
  try {
    const { title, content } = request.body;
    const memo = new Memo({ title, content });
    const savedMemo = await memo.save();
    response.status(201).json(savedMemo);
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
}

export async function editMemo(request, response) {
  try {
    const { title, content } = request.body;
    const updatedMemo = await Memo.findByIdAndUpdate(
      request.params.id,
      { title, content },
      { new: true },
    );

    if (!updatedMemo)
      return response.status(404).json({ message: "Memo not found!" });

    response.status(200).json(updatedMemo);
  } catch (error) {
    console.error("Error in updating memo", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteMemo(request, response) {
  try {
    const deletedMemo = await Memo.findByIdAndDelete(request.params.id);

    if (!deletedMemo)
      return response.status(404).json({ message: "Memo not found!" });

    response.status(200).json({ message: "Memo Deleted Successfully" });
  } catch (error) {
    response.status(500).json({ message: "Internal Server Error" });
  }
}
