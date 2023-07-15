import { Post, SimplePost } from "@/model/post";
import Image from "next/image";
import useSWR from 'swr'
import PostUserAvatar from "./PostUserAvatar";
import Avatar from "./Avatar";
import ActionBar from "./ActionBar";
import CommentForm from "./CommentForm";
import usePost from "@/hook/post";
import useMe from "@/hook/me";

type Props = {
  post: SimplePost
}
export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, createdAt, likes } = post
  // const { data } = useSWR<Post>(`/api/posts/${id}`)
  const {post:data,  setShowAddComments} = usePost(id)
 
  const comments = data?.comments
  // console.log('PostDetailComments:', comments)
  // console.log('PostDetailComments2:', data, username, userImage, image)
  
  return (
    <section className="flex w-full h-full  p-2 bg-blue-300">
      <div className=" relative basis-3/5">
        <Image
          className=" object-cover"
          src={image}
          alt={`${username}이 올림`}
          sizes="650px"
          fill
          priority
          // width={600}
          // height={600}
        />
      </div>
      <div className=" w-full basis-2/5 items-center flex flex-col bg-white">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="border-t outline-offset-4 border-gray-200 h-full overflow-y-auto pb-4 mb-1">
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li key={index} className=" flex items-center mb-1">
                  <Avatar
                    image={image}
                    size="short"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className=" font-bold mr-1">{commentUsername}</span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} onComment={setShowAddComments}/>
      </div>
    </section>
  );
}

