'use client'
import { ProfileUser } from '@/model/user';
import { useState } from 'react';
import BookMarkIcon from './ui/icons/BookMarkIcon';
import PostIcon from './ui/icons/PostIcon';
import PostGrid from './PostGrid';
import HeartIcon from './ui/icons/HeartIcon';
import { CacheKeysContext } from '@/context/CacheKeysContext';

type Props = {
  user: ProfileUser 
}
const tabs = [
  { title: 'posts', icon: <PostIcon />},
  { title: 'liked', icon: <HeartIcon className='w-4 h-4'/>},
  { title: 'saved', icon: <BookMarkIcon className='w-4 h-4'/>}
]
export default function UserPost({ user: {username} }: Props) {
  // /api/users/${username}/posts
  // /api/users/${username}/liked
  // /api/users/${username}/bookmarks
  const [query, setQuery] = useState(tabs[0].title)
  
  return (
    <section>
      <ul className=" flex justify-center uppercase">
        {tabs.map(({ title, icon }) => (
          <li
            className={` mx-12 p-4 cursor-pointer border-black ${
              title === query && 'font-bold border-t-2 '
            }`}
            key={title}
            onClick={() => setQuery(title)}>
            <button className="scale-150 md:scale-100">{icon}</button>
            <span className="hidden md:inline pl-1">{title}</span>
          </li>
        ))}
      </ul>
        {/* <PostGrid username={username} query={query} /> */}
      <CacheKeysContext.Provider value={{ postsUrl: `/api/users/${username}/${query}` }}>
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}

