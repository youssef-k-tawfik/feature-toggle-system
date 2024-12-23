"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/redux/store";
import { CommentType } from "@/types/commentType";
import Comment from "./Comment/Comment";
import NewCommentInput from "./NewCommentInput/NewCommentInput";

export default function CommentsSection() {
  const { features } = useSelector((state: RootState) => state.systemFeatures);
  const { comments } = useSelector((state: RootState) => state.post);

  return (
    <>
      {comments.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} />
      ))}

      {/* Input comment */}
      {features.find(
        (feature) => feature.name === "comment" && feature.enabled
      ) && <NewCommentInput />}
    </>
  );
}
