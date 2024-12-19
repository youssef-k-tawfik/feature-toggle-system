import Avatar from "../Avatar/Avatar";

export default function NewCommentInput() {
  return (
    <div className="flex items-center mb-5">
      <Avatar />
      <div className="ml-2 flex-grow">
        <p className="font-semibold mb-1">Signed-in username</p>
        <input
          id="newCommentInput"
          type="text"
          placeholder="Add a comment..."
          className="bg-[#0a0a0a] text-white p-2 rounded-lg w-full"
        />
      </div>
    </div>
  );
}
