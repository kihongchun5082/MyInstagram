export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'username',
      type: 'string',
      title: 'Username'
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'email',
      type: 'string',
      title: 'Email'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    },
    {
      name: 'following',
      type: 'array',
      title: 'Following',
      of: [
        {
          // name: 'username',
          type: 'reference',
          to: [
            { type: 'user' }
          ]
        }
      ],
      validation: (Rule) => Rule.unique()
    },
    {
      name: 'followers',
      type: 'array',
      title: 'Followers',
      of: [
        {
          // name: 'username',
          type: 'reference',
          to: [
            { type: 'user' }
          ]
        }
      ],
      validation: (Rule) => Rule.unique()
    },
    {
      name: 'bookmarks',
      type: 'array',
      title: 'Bookmarks',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'post' }
          ],
          validation: (Rule) => Rule.unique()
        }
      ],
      validation: (Rule) => Rule.unique()
    }
  ], 
  preview: {
    select: {
      title: 'name',
      subtitle: 'username'
    }
  }
}