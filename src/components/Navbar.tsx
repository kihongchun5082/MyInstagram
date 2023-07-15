'use client'

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname } from "next/navigation";
import HomeIconPage from "./ui/icons/HomeIcon";
import HomeFillIconPage from "./ui/icons/HomeFillIcon";
import AddPostIconPage from "./ui/icons/AddPostIcon";
import AddPostFillIconPage from "./ui/icons/AddPostFillIcon";
import UserSearchIconPage from "./ui/icons/UserSearchIcon";
import UserSearchFillIconPage from "./ui/icons/UserSearchFillIcon";
import Avatar from "./Avatar";
import ColorButton from "./ui/ColorButton";

const iconsMenu = [
  { 
    href: '/',
    icon: <HomeIconPage />,
    filledIcon: <HomeFillIconPage />
  },
  {
    href: '/new',
    icon: <AddPostIconPage />,
    filledIcon: <AddPostFillIconPage />
  },
  {
    href: '/search',
    icon: <UserSearchIconPage />,
    filledIcon: <UserSearchFillIconPage />
  }
]

export default function NavbarPage() {
  const { data: session } = useSession()
  const loginUser = session?.user
  const pathName = usePathname()
  // console.log(session, loginUser, pathName)
  
  return (
    <div className="flex justify-between items-center px-6">
      <Link href="/" passHref>
        <h1 className=" text-3xl font-bold ">전기홍 인스타그램</h1>
      </Link>
      <nav>
        <ul className="flex items-center text-2xl gap-4 p-4">
          {iconsMenu.map(({ href, icon, filledIcon }) => (
            <li key={href}>
              <Link href={href}>{pathName === href ? icon : filledIcon}</Link>
            </li>
          ))}
          {/* <ul className="flex justify-between">
          {loginUser && (
            <Link href={`/user/${loginUser.username}`} passHref>
            <Avatar image={loginUser.image} />
            </Link>
            )}
            {session ? (
              <div className="flex-row bg-slate-400">
              Signed in as {session.user?.email} <br />
              <button className=" ml-auto border-2 border-black bg-green-400" onClick={() => signOut()}>
              Sign out
              </button>
              </div>
              ) : (
                <>
                Not signed in <br />
                <button
                className="border-2 border-violet-800"
                onClick={() => signIn()}
                >
                Sign in
                </button>
                </>
                )}
              </ul> */}
          {loginUser && (
            <li>
              <Link href={`/user/${loginUser.username}`} passHref>
                <Avatar image={loginUser.image} size="tall" highlight />
              </Link>
            </li>
          )}
          <li className="text-lg">
            {session ? (
              <ColorButton text="나가기" onClick={() => signOut()} />
            ) : (
              <ColorButton text="들어가기" onClick={() => signIn()} />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

