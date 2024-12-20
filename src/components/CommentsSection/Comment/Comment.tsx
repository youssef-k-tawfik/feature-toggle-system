import Link from "next/link";
import Avatar from "../../Avatar/Avatar";
import { CommentType } from "@/types/commentType";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="flex items-center mb-5">
      <Avatar src={comment.avatarSrc} />
      <div className="ml-2">
        <Link
          href={comment.userProfileSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:underline"
        >
          {comment.username}
        </Link>
        <p className="">{comment.text}</p>
      </div>
    </div>
  );
}
