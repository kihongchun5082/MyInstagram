'use client'
import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr'
import Button from './ui/Button';
import useMe from '@/hook/me';

type Props = {
  user: ProfileUser
}
export default function FollowButton({user}: Props) {
  const { username } = user
  // const { data:me } = useSWR<HomeUser>('/api/me')
  const { me, setToggleFollow } = useMe();
  const isFollowing = me && me.following.find((i) => i.username === username);
  const showButton = me && me.username !== username;
  const text = isFollowing ? '따라가지 않을게요.' : '따라 갈래요.';
  const handleFollow = () => {
    setToggleFollow(user.id, !isFollowing)
  }
  return (
    <div>
      {showButton && (
        <Button
          text={text}
          onClick={handleFollow}
          red={text === '따라 갈래요.'}
        />
      )}
    </div>
  );
}