const path = require(`path`)

const ENV = process.env.GATSBY_ENV || "development"

module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const thoughtTemplate = path.resolve(`src/templates/thoughtTemplate.js`)

  const postStatuses = ENV === "development" ? [true, false] : [true]

  const result = await graphql(`
   {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: {regex: "/(thoughts)/"  }
          frontmatter: { 
            published: { in: [${postStatuses}] }
          }
        }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
              title
            }
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

  const thoughts = result.data.allMarkdownRemark.edges

  console.debug(
    `🚚 Loading thought posts.. (found ${thoughts.length} thoughts)`
  )

  thoughts.forEach(({ node }, index) => {
    const prevThought = index === 0 ? undefined : thoughts[index - 1].node
    const nextThought =
      index === thoughts.length - 1 ? undefined : thoughts[index + 1].node

    const path = node.frontmatter.path

    console.debug(`- Generating "${path}"..`)

    createPage({
      path: path,
      component: thoughtTemplate,
      context: {
        prevThought,
        nextThought,
      },
    })
  })
}
