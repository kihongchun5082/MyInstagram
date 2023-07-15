'use client';
import { HomeUser, SimpleUser } from '@/model/user';
import Link from 'next/link';
import useSWR from 'swr'
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useMe from '@/hook/me';

export const dynamic = 'force-dynamic'

export default function FollowingBar() {
  // const { data, isLoading:loading, error } = useSWR<HomeUser>('/api/me')
  const { me, isLoading:loading, error } = useMe()
  const followingUsers = me?.following
  // const followingUsers = data?.following && [
    // ...data?.following,
    // ...data?.following,
    // ...data?.following
  // ]
  // console.log('image형식;', followingUsers)
  // console.log('meReturn;', me)

  return (
    <section className=' w-full flex justify-center items-center p-4 shadow-sm shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto relative z-0'>
      {loading ? (
        <p>Loading....</p>
      ) : (
        (!followingUsers || followingUsers.length === 0) && <p>없어요.</p>
      )}
      {followingUsers && followingUsers.length > 0 && (
        <ScrollableBar>
        {followingUsers.map(({image, username}) => (
              <Link 
                key={username}
                className='flex flex-col items-center w-20'
                href={`/user/${username}`} passHref>
                  <Avatar image={image} highlight size='medium'/>
                <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>
                  { username }
                </p>
              </Link> 
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}

