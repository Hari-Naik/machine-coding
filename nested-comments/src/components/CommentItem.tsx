import { useState } from "react";

import AddComment from "./AddComment";
import CommentListItems from "./CommentList";
import type { CommentType } from "../types";

interface Props {
  comment: CommentType;
  handleAddReplies: (id: number, text: string) => void;
}

const CommentItem = ({ comment, handleAddReplies }: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const handleAddReply = (text: string) => {
    handleAddReplies(comment.id, text);
    setShow(false);
  };

  return (
    <>
      <li className="comment-item">
        <span>{comment.text}</span>
        <button onClick={() => setShow(prev => !prev)}>
          {show ? "Cancel" : "Reply"}
        </button>
      </li>
      {show && <AddComment btnText="Reply" handleAddComment={handleAddReply} />}

      {comment.replies.length > 0 && (
        <CommentListItems
          comments={comment.replies}
          handleAddReplies={handleAddReplies}
        />
      )}
    </>
  );
};

export default CommentItem;
