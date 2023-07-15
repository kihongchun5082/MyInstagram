import { FormEvent, useState } from "react";
import SmileIcon from "./ui/icons/SmileIcon";
import { Comment } from "@/model/post";

type Props = {
  onPostComment: (comment: string) => void
}
export default function CommentForm({onPostComment}: Props) {
  const [ comment, setComment ] = useState('')
  const buttonDisabled = comment.length === 0
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onPostComment(comment)
    setComment('')
  }
  return (
    <form
      onSubmit={handleSubmit}
      className=" flex items-center px-3 border-t border-neutral-300">
      <SmileIcon />
      <input
        className=" w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="소감 보내주세요."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`w-1/4 rounded-r-lg bg-amber-300 p-3 font-bold ${
          buttonDisabled ? 'text-violet-300' : 'text-violet-500'
        }`}>
        보내요!
      </button>
    </form>
  );
}

