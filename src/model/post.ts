export type Post = {
  id: string
  username: string
  userImage: string
  image: string
  text: string
  createdAt: string
  likes: string[]
  comments: Comment[]
}  

export type SimplePost = Omit<Post, 'comments'> & {
  comments: number
}  

export type Comment = {
  comment: string
  username: string
  image?: string | undefined
}