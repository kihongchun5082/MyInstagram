import { Comment, Post, SimplePost } from "@/model/post";
import { assetsURL, client, urlFor } from "./sanity";
import { ProfileUser } from "@/model/user";


export async function getFollowingPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && author->username == "${username}"
        || author._ref in *[_type == "user" && username == "${username}"].following[]._ref]
      | order(_createdAt desc) { 
        "username":author->username, 
        "userImage":author->image,
        "image":photo, 
        "likes":likes[]->username,
        "text":comments[0].comment,
        "comments":count(comments),
        "id":_id,
        "createdAt": _createdAt }`
        )
        .then( mapPosts )
        }
        
function mapPosts(posts: SimplePost[]){
  return posts.map((p: SimplePost) => ({
    ...p,
    likes: p.likes ?? [],
    image: urlFor(p.image),
    userImage: urlFor(p.userImage)
  }))
}

    // | order(_createdAt desc){${simplePostProjection}}
    // .then(mapPosts);
    /* 
    const simplePostProjection = `
      ...,
      "username": author->username,
      "userImage": author->image,
      "image": photo,
      "likes": likes[]->username,
      "text": comments[0].comment,
      "comments": count(comments),
      "id": _id,
      "createdAt": _createdAt
      `; */

export async function getPostById(id:string) {
  console.log('getPostId;', id)
  return(
    client.fetch(
      `*[_type == "post" && _id == "${id}"][0]{
        ...,
        "username": author->username,
        "userImage": author->image,
        "image": photo,
        "likes": likes[]->username,
        comments[]{comment, "username": author->username, "image": author->image},
        "id": _id,
        "createdAt": _createdAt
      }`
    )
    .then((p:Post) => ({
      ...p,
      likes: p.likes ?? [],
      image: urlFor(p.image),
      userImage: urlFor(p.userImage),
      comments: mapCommentImage(p.comments)
    })
    )
)}      

// function mapCommentImage(comments: Comment[]) {
//   const builder = imageUrlBuilder({
//     projectId: process.env.SANITY_PROJECT_ID || '',
//     dataset: 'production',
//   })
//   const urlFor1 = (source:SanityImageSource) => builder.image(source)

//   return comments.map((p: Comment) => ({
//     ...p,
//     image: urlFor1(p.image ?? '').width(800).url()
//     }))
//   } 이것도 오케이 입니다.

function mapCommentImage(comments: Comment[]) {
  return comments.map((c: Comment)=> ({
      ...c,
      image: urlFor(c.image ?? '')
    }))
}

export async function getPostsOf(username:string) {
  return client
    .fetch(
      `*[ _type == "post" && author->username == "${username}"]|order(_createdAt desc) {
      "username":author->username, 
      "userImage":author->image,
      "image":photo, 
      "likes":likes[]->username,
      "text":comments[0].comment,
      "comments":count(comments),
      "id":_id,
      "createdAt": _createdAt }`
    )
    .then(mapPosts);
}


export async function getLikedPostsOf(username: string) {
  return client
    .fetch(
      `*[_type == "post" && "${username}" in likes[]->username]
      | order(_createdAt desc) {
      "username":author->username, 
      "userImage":author->image,
      "image":photo, 
      "likes":likes[]->username,
      "text":comments[0].comment,
      "comments":count(comments),
      "id":_id,
      "createdAt": _createdAt }`
    )
    .then(mapPosts);
}


export async function getSavedPostsOf(username:string) {
  return client
    .fetch(
      `*[ _type == "post" && _id in *[_type == "user" && username == "${username}"].bookmarks[]._ref]
      | order(_createdAt desc) {
      "username":author->username, 
      "userImage":author->image,
      "image":photo, 
      "likes":likes[]->username,
      "text":comments[0].comment,
      "comments":count(comments),
      "id":_id,
      "createdAt": _createdAt }`
    )
    .then(mapPosts);
}

export async function likePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .setIfMissing({ likes: [] })
    .append('likes', [{ _ref: userId, _type: 'reference' }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function disLikePost(postId: string, userId: string) {
  return client
    .patch(postId)
    .unset([`likes[_ref=="${userId}"]`])
    .commit()
}

export async function addComment(postId: string, userId: string, image: string, comment: string) {
  return client
    .patch(postId)
    .setIfMissing({ comments: [] })
    .append('comments', [
      {
        comment,
        author: { _ref: userId, _type: 'reference' },
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function createPost(userId: string, text: string, file: Blob) {
  
  return fetch(assetsURL, {
    method: 'POST',
    headers: {
      'content-type': file.type,
      authorization: `Bearer ${process.env.SANITY_SECRET_TOKEN}`
    },
    body: file
  }).then(res => res.json())
    .then(result => {
      return client.create({
        _type: 'post',
        author: {_ref: userId},
        photo: {asset: {
          _ref: result.document._id
        }},
        comments: [{
          comment: text,
          author: {_ref: userId, _type: 'reference'}
        }],
        likes: []
      },
      { autoGenerateArrayKeys: true }
      )
    })
}