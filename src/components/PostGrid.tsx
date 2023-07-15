import { SimplePost } from "@/model/post";
import { GridLoader } from "react-spinners";
import useSWR from 'swr'
import PostGridCard from "./PostGridCard";
import usePosts from "@/hook/posts";
/* 
type Props = {
  username: string
  query: string
} */
// export default function PostGrid({username, query}: Props) {
export default function PostGrid() {
  // const { data: posts, isLoading, error} = useSWR<SimplePost[]>(`/api/users/${username}/${query}`)
  const { posts, isLoading } = usePosts()
  console.log('usePost_posts;', posts)
  return (
    <div className=" w-full text-center">
      {isLoading && <GridLoader />}
      <ul className=" grid grid-cols-3 gap-4 py-4 px-8">
        {posts &&
          posts.map((p, index) => (
            <li key={p.id}>
              <PostGridCard post={p} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
}

