'use client'

import { SimplePost } from '@/model/post'
import { ClimbingBoxLoader } from 'react-spinners'
import useSWR from 'swr'
import PostListCard from './PostListCard'
import usePosts from '@/hook/posts'

export default function PostList() {
  // const { data: posts, isLoading: loading } = useSWR<SimplePost[] | undefined>(
  //   '/api/posts'
  // );
  const { posts, isLoading:loading } = usePosts()
  // console.log('PostList_posts;', posts);
  return (
    <section>
      {loading && (
        <div className=' text-center mt-32'>
          <ClimbingBoxLoader color="#36d7b7" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((p, index) => (
            <li key={p.id} className=' mb-4'>
              <PostListCard post={p} priority={index < 2} />
            </li>
            ))}
        </ul>
      )}
    </section>
  );
}


