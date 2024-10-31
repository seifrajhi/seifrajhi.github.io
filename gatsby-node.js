/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// https://github.com/fshowalter/franksmovielog.com/blob/main/gatsby-node.ts

const thoughtGenerator = require(`./src/generators/thought-generator`)
const blogGenerator = require(`./src/generators/blog-generator`)
const talkGenerator = require(`./src/generators/talk-generator`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  await thoughtGenerator({ actions, graphql, reporter })
  await blogGenerator({ actions, graphql, reporter })
  await talkGenerator({ actions, graphql, reporter })
}
