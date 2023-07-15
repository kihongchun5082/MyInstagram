import { ProfileUser } from "@/model/user";
import Avatar from "./Avatar";
import FollowButton from "./FollowButton";

type Props = {
  user: ProfileUser
}
export default function UserProfile({user}: Props) {
  const {username, image, name, following, followers, posts} = user
  const info = [
    { title: "따라 간 님", data: following},
    { title: "따라 온 님", data: followers},
    { title: "좋아하는 사진", data: posts}
  ]
  console.log('userProfile;', posts)
  return (
    <section className="flex flex-col md:flex-row justify-center items-center w-full border-b border-neutral-300">
      <Avatar image={image} highlight size='xlarge'/>
      <div className=" md:ml-10 basis-1/3">
        <div className=" flex flex-col items-center md:flex-row">
          <h1 className=" text-2xl md:mr-8 my-2 md:mb-0">{username}</h1>
          <FollowButton user={user} />
        </div>
        <ul className="my-4 flex gap-4">
          {info.map(({ title, data }, index) => (
            <li key={index}>
              <span className=" font-bold mr-1">{data}</span>
              {title}
            </li>
          ))}
        </ul>
        <p className=" text-xl font-bold text-center md:text-start">{name}</p>
      </div>
    </section>
  );
}
