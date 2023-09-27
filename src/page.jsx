import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from "react-markdown"
import { useLoaderData } from "react-router-dom"

export const loader = client => async ({ params }) => {
  const GET_PAGE = gql`
  {
    asset(id: "32m5j3o83r5vqbgcqbcF0") {
      url
    },
    pageCollection(where: {slug: "${params.slug}"}, limit: 1) {
      items {
        title
        content
      }
    }
  }
  `
  return client.query({ query: GET_PAGE });
}

function Page() {

  const { loading, error, data } = useLoaderData()

  if (loading) return
  if (error) return

  const page = data.pageCollection.items[0]
  const logoAsset = data.asset

  return (
    <div className="mt-2 lg:mt-8 mx-auto px-2 max-w-prose lg:text-lg">
      <h1 className="text-2xl lg:text-4xl font-bold mb-4 lg:mb-8">{page.title}</h1>
      <ReactMarkdown
        children={page.content}
        components={{
          h2(props) {
            const { node, ...rest } = props
            return <h2 className="mb-4 lg:mb-8 text-2xl lg:text-3xl leading-relaxed" {...rest} />
          },
          p(props) {
            const { node, ...rest } = props
            return <p className="mb-2" {...rest} />
          },
          a(props) {
            const { node, ...rest } = props
            return <a className="text-cyan-600 hover:text-cyan-400" {...rest} />
          },
          ol(props) {
            const { node, ordered, ...rest } = props
            return <ol className="list-decimal list-outside pl-8 mb-2" ordered="ordered" {...rest} />
          },
        }}
      />
      <img className="mx-auto w-16 my-16 lg:my-32 opacity-10" src={logoAsset.url} />
  </div>
  )
}

export default Page
