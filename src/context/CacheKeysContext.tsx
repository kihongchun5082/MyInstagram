import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsUrl: string
}
export const CacheKeysContext = createContext<CacheKeysValue>({
  postsUrl: '/api/posts'
})

export const useCacheKeys = () => useContext(CacheKeysContext)
