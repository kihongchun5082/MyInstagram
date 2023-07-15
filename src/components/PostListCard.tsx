'use client'
import { Comment, Post, SimplePost } from "@/model/post";
import Image from "next/image";
import { useState } from "react";
import ModalPortal from "./ui/ModalPortal";
import PostModal from "./PostModal";
import PostDetail from "./PostDetail";
import PostUserAvatar from "./PostUserAvatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import usePosts from "@/hook/posts";

type Props = {
  post: SimplePost
  priority?: boolean
}
export default function PostListCard({post, priority=false }: Props) {
  // const { userImage, image, username, likes, id } = post
  const { userImage, image, username, comments, text } = post
  const [openModal, setOpenModal] = useState(false)
  const { setPostComment } = usePosts()
  
  // console.log('postListCard_username-comments;', username, comments)
  
  const handlePostComment = (comment: Comment) => {
    setPostComment(post, comment);
  };

  
  return (
    <article className=" text-black items-center bg-red-300 rounded-lg shadow-md border border-gray-400 py-3 px-5">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className=" w-full object-cover aspect-square"
        src={image}
        alt={`photo by {username}`}
        width={300}
        height={300}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post} onComment={handlePostComment}>
        <p>
          <span className=" font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className=" font-bold my-2 text-sky-600"
            onClick={() =>
              setOpenModal(true)
            }>{`${comments} 개의 소감이 있어요.`}</button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}