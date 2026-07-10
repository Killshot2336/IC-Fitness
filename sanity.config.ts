export default {
  name: 'ic-fitness',
  title: 'IC Fitness CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [],
  schema: {
    types: [
      {
        name: 'post',
        title: 'Blog Post',
        type: 'document',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
          { name: 'excerpt', title: 'Excerpt', type: 'text' },
          { name: 'publishedAt', title: 'Published At', type: 'datetime' },
          { name: 'mainImage', title: 'Main Image', type: 'image' },
          {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'author' }],
          },
          { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }] },
        ],
      },
      {
        name: 'author',
        title: 'Author',
        type: 'document',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'image', title: 'Image', type: 'image' },
        ],
      },
      {
        name: 'trainer',
        title: 'Trainer',
        type: 'document',
        fields: [
          { name: 'name', title: 'Name', type: 'string' },
          { name: 'role', title: 'Role', type: 'string' },
          { name: 'bio', title: 'Bio', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
          { name: 'specialties', title: 'Specialties', type: 'array', of: [{ type: 'string' }] },
          { name: 'certifications', title: 'Certifications', type: 'array', of: [{ type: 'string' }] },
        ],
      },
    ],
  },
};
