'use client'
import { SearchUser } from "@/model/user"
import { FormEvent, useState } from "react"
import useSWR from 'swr'
import UserCard from "./UserCard"
import useDebounce from "@/hook/debounce"

export default function UserSearch() {
  const [keyword, setKeyword]= useState('')
  const debouncedKeyword = useDebounce(keyword)
  const {data:users, isLoading, error} = useSWR<SearchUser[]>(`/api/search/${debouncedKeyword}`)
  // console.log('usersearch;', users)
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
  }
  return (
    <section className="w-full flex flex-col items-center max-w-2xl my-4">
      <form className=" w-full mb-4" onSubmit={onSubmit}>
        <input
          className=" w-full text-xl p-3 border-2 border-red-600 "
          type="text"
          autoFocus
          placeholder="누구를 찾나요?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </form>
      {error && <p>뭔가 잘못 되었음!!!😖</p>}
      {isLoading && <p>...Loading</p>}
      {!isLoading && !error && users?.length === 0 && <p>없어요.</p>}
      <ul className="w-full p-4">
        {users &&
          users.map((user) => (
            <li key={user.username}>
              {/* <p>{user.username}</p> */}
              <UserCard user={user} />
            </li>
          ))}
      </ul>
    </section>
  );
}

