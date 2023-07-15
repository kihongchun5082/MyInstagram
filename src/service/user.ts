import  imageUrlBuilder  from '@sanity/image-url';
import { ProfileUser, SearchUser, SimpleUser } from "@/model/user";
import { client, urlFor } from "./sanity";
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

type OAuthUser = {
  id: string,
  email: string,
  name: string,
  username: string,
  image?: string | null
}
export async function addUser(user: OAuthUser) {
  const doc = {
    _id: user.id,
    _type: "user",
    name: user.name,
    username: user.username,
    email: user.email,
    image: user.image,
    following: [],
    followers: [],
    bookmarks: []
  }
  client.createIfNotExists(doc).then((user) => {
    console.log('addUserDoc;', doc)
  })
  }
export async function getUserByUsername(username:string) {
  console.log('getUserByUsername;',username)
  const userProjection = `
      ...,
      "id": _id,
      following[] -> { username, image },
      followers[] -> { username, image },
      "bookmarks" : bookmarks[] -> _id
  `
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0] {
      ${userProjection}
    }`
    )
    .then((user) => ({
      ...user,
      following: mapFollowing(user.following),
    }));
  }

function mapFollowing(following?: SimpleUser[]) {
  const builder = imageUrlBuilder({
    // baseUrl: 'https://cdn.sanity.io'  ,
    projectId: process.env.SANITY_PROJECT_ID || '',
    dataset: 'production',
  })
  const urlForIn = (source:SanityImageSource) => builder.image(source)

  return following?.map((p: SimpleUser) => ({
    ...p,
    image: urlForIn(p.image ?? '').width(800).url()
    }))
}

export async function searchUsers(keyword?: string) {
  const query = keyword 
  ? `&& (name match "${keyword}") || (username match "${keyword}")`
  : ''
  return client.fetch(
    `*[ _type == "user" ${query}]{
      ...,
      "following": count(following),
      "followers": count(followers)
    }`
    )
    .then(
      (users) => users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
        image: imgIsHttp(user),
      })))
}

function imgIsHttp(user: SearchUser) {
  // const isHttp = user.image?.substring(0, 4);
  const isHttp = (String(user.image).split(':')[0] || '') === 'https';
  {!isHttp && (user.image= urlFor(user.image ?? ''))}
  return(
    // console.log('isHttpSplit;', isHttp)
    user.image
  )
}

export async function getUserForProfile(username:string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && "${username}" in likes[]->username])
    }`
    )
    // "posts": count(*[_type == "post" && author->username == "${username}"]),
    .then((u: ProfileUser) => ({
      ...u,
      following: u.following ?? 0,
      followers: u.followers ?? 0,
      posts: u.posts ?? 0,  
      image: imgIsHttp(u),
    }));
}

export async function addBookmark(userId:string, postId:string) {
  return client
    .patch(userId)
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [{ _ref: postId, _type: 'reference' }])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId:string, postId:string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function followYes(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (me) =>
      me
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, (her) =>
      her
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
  return client
    .transaction()
    .patch(myId, (me) => me.unset([`following[ _ref=="${targetId}"]`]))
    .patch(targetId, (her) => her.unset([`followers[ _ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}