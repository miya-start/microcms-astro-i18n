import { createClient, type MicroCMSQueries } from 'microcms-js-sdk'
const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
})

export type Blog = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  title: string
  content: string
  eyecatch: {
    url: string
    height: number
    width: number
  }
}
export type BlogResponse = {
  totalCount: number
  offset: number
  limit: number
  contents: Blog[]
}

export const getBlogs = async (queries?: MicroCMSQueries) => {
  if (queries) {
    return await client.get<BlogResponse>({ endpoint: 'blogs', queries })
  }
  return await client.get<BlogResponse>({ endpoint: 'blogs' })
}

export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  if (queries) {
    return await client.get<Blog>({ endpoint: 'blogs', contentId, queries })
  }
  return await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
  })
}
