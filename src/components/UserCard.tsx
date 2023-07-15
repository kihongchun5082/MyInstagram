import { SearchUser } from "@/model/user";
import Link from "next/link";
import Avatar from "./Avatar";

type Props = {
  user: SearchUser
}
export default function UserCard({ user }: Props) {
  const { name, username, image, following, followers } = user;
  return (
    <div className="w-full border border-neutral-400 flex items-center">
      <Link
        className="flex items-center w-full rounded-sm border border-neutral-300 mb-2 p-4 bg-white hover:bg-neutral-50"
        href={`/user/${username}`}
        passHref>
        <Avatar image={image} highlight />
        <div className=" text-neutral-500 p-2 items-center">
          <p className=" text-lg text-slate-700 leading-4">{username}</p>
          <p className=" font-bold">{name}</p>
          <p className=" text-sm text-slate-400 leading-4">{`${followers} followers ${following} following`}</p>
        </div>
      </Link>
    </div>
  );
}