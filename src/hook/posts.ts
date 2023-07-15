import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, Post, SimplePost } from '@/model/post'
import { NextResponse } from 'next/server';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr'

async function updateLike(id: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ id, like }),
  }).then((res) => res.json());
}

async function addComment(id: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ id, comment }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys()
  // console.log('usePosts_cacheKeys;', cacheKeys, cacheKeys.postsUrl)
  // const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>('/api/posts')
  const { data: posts, isLoading, error, mutate } = useSWR<SimplePost[]>(cacheKeys.postsUrl)
  // const { mutate } = useSWRConfig()

  const setLike  = useCallback((post:SimplePost, username: string, like:boolean) => {
    // const likes = post.likes ?? []
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username] 
        : post.likes.filter((item) => item !== username),
    };
    const newPosts = posts?.map(p => (p.id === post.id ? newPost : p))
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true 
    })
    // fetch('/api/likes', {
    //   method: 'PUT',
    //   body: JSON.stringify({id: post.id, like})
    // // }).then(()=>setLiked(like))
    // }).then(()=>mutate('/api/posts'))
  },[posts, mutate])
  
  const setPostComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));
      return mutate(addComment(post.id, comment.comment), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );
  return (
      { posts, isLoading, error, setLike, setPostComment }
  );
}

