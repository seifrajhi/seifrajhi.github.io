const path = require(`path`)

const ENV = process.env.GATSBY_ENV || "development"

/**
 * @param {{ actions: any, graphql: any, reporter: any }} param0
 */
module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogTemplate = path.resolve(`src/templates/blogTemplate.js`)

  const postStatuses = ENV === "development" ? [true, false] : [true]

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/(blog)/" }
          frontmatter: { published: { eq: true } }
        }
        sort: { frontmatter: { date: DESC }}
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
              date
            }
            excerpt
            html
        
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const blogPosts = result.data.allMarkdownRemark.edges

  console.debug(`🚚 Loading blog posts.. (found ${blogPosts.length} posts)`)

  blogPosts.forEach(({ node }, index) => {
    const prevThought = index === 0 ? undefined : blogPosts[index - 1].node
    const nextThought =
      index === blogPosts.length - 1 ? undefined : blogPosts[index + 1].node

    const path = node.frontmatter.path

    console.debug(`- Generating "${path}"..`)

    createPage({
      path: path,
      component: blogTemplate,
      context: {
        prevThought,
        nextThought,
      },
    })
  })
}
