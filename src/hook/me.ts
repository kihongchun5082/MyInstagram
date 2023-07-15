import { SimplePost } from '@/model/post';
import { HomeUser } from '@/model/user';
import { useCallback } from 'react';
import useSWR from 'swr'

async function updateBookmark(postId:string, bookmark:boolean) {
  return fetch('/api/bookmarks', {
    method: 'PUT',
    body: JSON.stringify({ id: postId, bookmark }),
  }).then((res) => res.json());
}

async function updateFollow(targetId:string, follow1:boolean) {
  return fetch('/api/follow', {
    method: 'PUT',
    body: JSON.stringify({ id: targetId, follow1 })
  }).then(res => res.json())
  
}

export default function useMe() {
  const { data: me, isLoading, error, mutate } = useSWR<HomeUser>('/api/me');
  // console.log('useMe_;', me?.username)

  const setBookmark = useCallback(
    (postId: string, bookmark: boolean) => {
      if (!me) return;
      const bookmarks = me.bookmarks;
      const newMe = {
        ...me,
        bookmarks: bookmark
          ? [...bookmarks, postId]
          : bookmarks.filter((b) => b !== postId),
      };
      return mutate(updateBookmark(postId, bookmark), {
        optimisticData: newMe,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [me, mutate]
  );
  const setToggleFollow = useCallback(
    (targetIdx: string, follow2: boolean) => {
      return mutate(updateFollow(targetIdx, follow2), {
        populateCache: false,
      });
    },[mutate]
  )
  return { me, isLoading, error, setBookmark, setToggleFollow }
}