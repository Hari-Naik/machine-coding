import React, { useState } from "react";

interface AddCommentProps {
  btnText?: string;
  handleAddComment: (text: string, id?: number) => void;
}

const AddComment = ({
  btnText = "Add Comment",
  handleAddComment,
}: AddCommentProps) => {
  const [commentText, setCommentText] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText) return;
    handleAddComment(commentText);
    setCommentText("");
  };

  const placeholderText =
    btnText === "Add Comment" ? "Add new comment" : "Add your reply";

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={commentText}
          onChange={handleOnChange}
          type="text"
          placeholder={placeholderText}
        />
        <button>{btnText}</button>
      </form>
    </div>
  );
};

export default AddComment;
