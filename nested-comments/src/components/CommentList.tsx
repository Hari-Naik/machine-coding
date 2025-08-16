import type { CommentType } from "../types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: CommentType[];
  handleAddReplies: (id: number, text: string) => void;
}
const CommentList = ({ comments, handleAddReplies }: CommentListProps) => {
  return (
    <ul>
      {comments.map(comment => {
        return (
          <CommentItem
            key={comment.id}
            comment={comment}
            handleAddReplies={handleAddReplies}
          />
        );
      })}
    </ul>
  );
};

export default CommentList;
