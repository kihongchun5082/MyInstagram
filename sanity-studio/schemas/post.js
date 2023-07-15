export default {
  name: 'post',
  type: 'document',
  title: 'Post',
  fields: [
    {
      name: 'author',
      type: 'reference',
      title: 'Author',
      to: [
        {
          type: 'user'
        }
      ]
    },
    {
      name: 'photo',
      type: 'image',
      title: 'Photo'
    },
    {
      name: 'likes',
      type: 'array',
      title: 'Likes',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'user' }
          ]
        }
      ],
      validation: (Rule) => Rule.unique()
    },
    {
      name: 'comments',
      type: 'array',
      title: 'Comments',
      of: [
        {
          name: 'comment',
          type: 'document',
          title: 'Comment',
          fields: [
            { 
              name: 'author',
              type: 'reference',
              title: 'Author',
              to: [
                {
                  type: 'user'
                }
              ]
            },
            {
              name: 'comment',
              type: 'string',
              title: 'Comment'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'comments.0.comment',
      authorName: 'author.name',
      authorUsername: 'author.username',
      media: 'photo'
    },
    prepare(selection) {
      const { title, authorName, authorUsername, media } = selection
      return {
        title,
        subtitle: `by ${authorName} (${authorUsername})`,
        media
      }
    }
  }
}