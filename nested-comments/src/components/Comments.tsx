import { useState } from "react";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import type { CommentType } from "../types";
import { commentsData } from "../assets/dummyData";

const Comments = () => {
  const [comments, setComments] = useState<CommentType[]>(commentsData);

  const handleAddComment = (text: string) => {
    const newComment = {
      id: new Date().getTime(),
      text,
      replies: [],
    };

    setComments(prev => [newComment, ...prev]);
  };

  const addReply = (
    comments: CommentType[],
    parentId: number,
    text: string
  ): CommentType[] => {
    const newReply = {
      id: new Date().getTime(),
      text,
      replies: [],
    };

    return comments.map(comment => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [newReply, ...comment.replies],
        };
      }

      return {
        ...comment,
        replies: addReply(comment.replies, parentId, text),
      };
    });
  };

  const handleAddReplies = (parentId: number, text: string) => {
    const newComments = addReply(comments, parentId, text);
    setComments(newComments);
  };

  return (
    <div>
      <AddComment handleAddComment={handleAddComment} />
      <CommentList comments={comments} handleAddReplies={handleAddReplies} />
    </div>
  );
};

export default Comments;
