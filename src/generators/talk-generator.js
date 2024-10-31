const path = require(`path`)

const ENV = process.env.GATSBY_ENV || "development"

/**
 * @param {{ actions: any, graphql: any, reporter: any }} param0
 */
module.exports = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const talkTemplate = path.resolve(`src/templates/talkTemplate.js`)

  const postStatuses = ENV === "development" ? [true, false] : [true]

  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/(talks)/" }
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

  const talks = result.data.allMarkdownRemark.edges

  console.debug(`🚚 Loading talk ... (found ${talks.length} talks)`)

  talks.forEach(({ node }, index) => {
    const prevTalk = index === 0 ? undefined : talks[index - 1].node
    const nextTalk =
      index === talks.length - 1 ? undefined : talks[index + 1].node

    const path = node.frontmatter.path

    console.debug(`- Generating "${path}"..`)

    createPage({
      path: path,
      component: talkTemplate,
      context: {
        prevTalk,
        nextTalk,
      },
    })
  })
}
