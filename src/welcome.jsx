import { useQuery, gql } from '@apollo/client';
import ReactMarkdown from "react-markdown"

const GET_WELCOME_PAGE = gql`
{
  asset(id: "32m5j3o83r5vqbgcqbcF0") {
    url
  },
  pageCollection(where: {slug: "welcome"}, limit: 1) {
    items {
      content
      gallery {
        imagesCollection {
          items {
            url(transform: {
              width: 600,
              height: 600,
              resizeStrategy: FILL
            })
          }
        }
      }
    }
  }
}
`

function Welcome() {
  const { loading, error, data } = useQuery(GET_WELCOME_PAGE);

  if (loading) return
  if (error) return

  const page = data.pageCollection.items[0]
  const logoAsset = data.asset

  return (
    <div className="mt-2 lg:mt-8 mx-auto px-2 max-w-prose">
      <ReactMarkdown
        children={page.content}
        components={{
          h2(props) {
            const { node, ...rest } = props
            return <h2 className="mb-4 lg:mb-8 text-2xl lg:text-3xl leading-relaxed" {...rest} />
          },
          p(props) {
            const { node, ...rest } = props
            return <p className="mb-2 text-xl lg:text-2xl" {...rest} />
          },
          a(props) {
            const { node, ...rest } = props
            return <a className="text-cyan-600 hover:text-cyan-400" {...rest} />
          },
          strong(props) {
            const { node, ...rest } = props
            return <strong className="underline decoration-wavy decoration-cyan-400 underline-offset-4" {...rest} />
          }
        }}
      />
      <img className="mx-auto w-16 my-16 lg:my-32 opacity-10 dark:invert" src={logoAsset.url} />
      <div className="flex flex-wrap mb-8 lg:mb-16">
        {page.gallery.imagesCollection.items.map(imageAsset => (
          <a href={imageAsset.url} className="w-1/3 p-1" key={imageAsset.url}><img src={imageAsset.url} /></a>
        ))}
      </div>
  </div>
  )
}

export default Welcome
