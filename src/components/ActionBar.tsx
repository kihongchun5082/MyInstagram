// 'use client'
import { parseDate } from "@/util/date"
import ToggleButton from "./ui/ToggleButton"
import BookMarkFillIcon from "./ui/icons/BookMarkFillIcon"
import BookMarkIcon from "./ui/icons/BookMarkIcon"
import HeartIcon from "./ui/icons/HeartIcon"
import LikePlaceholderIcon from "./ui/icons/LikePlaceholderIcon"
import { ReactNode, useState } from "react"
import { Comment, Post, SimplePost } from "@/model/post"
import { useSession } from "next-auth/react"
import { useSWRConfig } from "swr"
import usePosts from "@/hook/posts"
import useMe from "@/hook/me"
import CommentForm from "./CommentForm"
import usePost from "@/hook/post"
type Props = {
  post: SimplePost
  children?: React.ReactNode
  onComment: (comment: Comment) => void
}
export default function ActionBar({ post, children, onComment }: Props) {
  const { id, likes, username, text, createdAt } = post
  // const {data: session} = useSession()
  // const user = session?.user
  const { me, setBookmark } = useMe()
  // const { mutate } = useSWRConfig()
  // const [ liked, setLiked ] = useState(
  //   user ? likes.includes(user.username) : false
  // );

  /* const handleLike = (like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({id, like})
      // }).then(()=>setLiked(like))
    }).then(()=>mutate('/api/posts'))
  } */   
  const { setLike } = usePosts()

  const liked = me ? likes.includes(me.username) : false 
  // console.log('ActionBar_liked', liked)

  // const [ bookMarked, setBookMarked ] = useState(false);
  const bookmarked = me?.bookmarks.includes(id) ?? false
  // console.log('ActionBar_bookmarked;', bookmarked, id)
  
  // const handleLike = (l: boolean) => {
    //   if (user) {
      //     setLike(post, user.username, l)
      //   }d79c95af-3116-4433-b464-588b0e1bb706서혜어드레스
      // }집들이https://cdn.sanity.io/images/zuz9mrsu/production/c6f117047437ea6d965a114caa51d9d9fcb5e00d-1440x1080.jpg
  const handleLike = (like: boolean) => {
    me && setLike(post, me.username, like)
  }

  const handleBookmark = (bookmark: boolean) => {
    me && setBookmark(id, bookmark)
  }

  const handleComment = (comment: string) => {
    me && onComment({comment, username: me.username, image: me.image})
  }
  
  const likeTxt =
    likes?.length > 1 ? `"좋아요". 여럿이 좋아하네요.` : '"좋아요."';
  
  return (
    <>
      <div className=" w-full flex justify-between my-2 px-4">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartIcon />}
          offIcon={<LikePlaceholderIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookMarkFillIcon />}
          offIcon={<BookMarkIcon />}
        />
      </div>
      <div className=" flex flex-col px-4 py-1">
        <p className=" text-sm font-bold mb-2">
          {likes?.length ?? 0}개의 {likeTxt}
        </p>
        {/* {text && (
          <p>
            <span className=" font-bold mr-1">{username}</span>
            {text}
          </p>
        )} */}
        {children}
        <p className=" text-xs text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment}/>
      {/* <CommentForm onPostComment={`if (post){${handlePostComment}} else if (fullPost){${handlePostComments}}`}/> */}
    </>
  );
}