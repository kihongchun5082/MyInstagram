import { AuthUser } from "@/model/user";
import Avatar from "./Avatar";

type Props = {
  user: AuthUser
}
export default async function SideBar({user: { image, email, name, username }}: Props) {
  // console.log('sidebarUser;', email)
  return (
    <>
      <div className=" flex items-center">
        {image && <Avatar image={image} />}
        <div className="ml-4">
          <p className=" font-semibold">{email}</p>
          <p className=" font-bold">{username}</p>
          <p className=" text-lg text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className=" text-sm text-neutral-500 mt-8">
        About ˚ nextauth ˚ react ˚ typescript ˚ next
      </p>
      <p className=" font-bold text-sm mt-8 text-neutral-500">
        @Copyright INSTAGRAM from Kihong CHUN
      </p>
    </>
  );
}

