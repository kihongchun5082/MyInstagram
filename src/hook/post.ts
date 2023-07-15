import { Comment, Post } from '@/model/post'
import { urlFor } from '@/service/sanity'
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr'

async function showAddComments(id:string, comment:string) {
  return fetch(`/api/comments`, {
    method: 'POST',
    body: JSON.stringify({ id, comment })  
  }).then((res) => res.json())
}

export default function usePost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<Post>(`/api/posts/${postId}`);
  
  const { mutate: globalMutate } = useSWRConfig()

  const setShowAddComments = useCallback((comment: Comment) => {
    if (!post) return
    const newPost = {
      ...post,
      comments: [...post?.comments, comment],
    }
    return mutate(showAddComments(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true
    }).then(()=>globalMutate('/api/posts'))
  }, [post, mutate, globalMutate])
  return { post, isLoading, error, setShowAddComments}
}