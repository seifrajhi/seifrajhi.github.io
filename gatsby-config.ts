import type { GatsbyConfig } from "gatsby"
//import { dirname } from "path"
//import { fileURLToPath } from "url"

// @ts-ignore
//const __filename = fileURLToPath(require('url').pathToFileURL(__filename));
// @ts-ignore
//const __dirname = dirname(__filename);

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Saifeddine Rajhi`,
    description: `Hey 👋 My name is Saifeddine and I'm a Senior Data Platform Engineer Engineer, Cloud and DevOps enthusiastic and Life Explorer 🧔🛠👨‍💻📚`,
    keywords: [
      "Saifeddine Rajhi",
      "Saif Rajhi",
      "Saifeddine Rajhi",
      "Saif",
      "Platform engineering",
      "open source",
      "containers nerd 🐳",
    ],
    author: `@RajhiSaifeddine`,
    siteUrl: `https://seifrajhi.github.io`,
    personRichSnippet: {
      name: `Saifeddine Rajhi`,
      alternateName: `Saifeddine Rajhi`,
      gender: `Male`,
      jobTitle: `Senior Data Platform  Engineer, Open source contributor`,
      worksFor: {
        name: "NA",
        sameAs: "later",
      },
      sameAs: [
        `https://x.com/RajhiSaifeddine`,
        `https://github.com/seifrajhi`,
        `https://www.linkedin.com/in/rajhi-saif/`,
        `https://keybase.io/saifrajhi`,
      ],
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }: { query: { site: any, allMarkdownRemark: any } }) => {
              return allMarkdownRemark.edges.map((edge: { node: { frontmatter: { title: string, date: string, path: string, excerpt: string },  } }) => {
                const { frontmatter } = edge.node;
                return {
                  title: frontmatter.title,
                  description: frontmatter.excerpt,
                  date: frontmatter.date,
                  url: site.siteMetadata.siteUrl + frontmatter.path,
                  guid: site.siteMetadata.siteUrl + frontmatter.path,
                  custom_elements: [    
                    { author: "Saif Rajhi rajhiseif@gmail.com" }
                  ],
                };
              });
            },
            query: `
              {
                allMarkdownRemark(
                  filter: {
                    fileAbsolutePath: { regex: "/(blog|thoughts)/" }
                    frontmatter: { published: { eq: true } }
                  }
                  sort: { frontmatter: { date: DESC } }
                  limit: 1000
                ) {
                  edges {
                    node {
                      frontmatter {
                        excerpt
                        path
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Saifeddine Rajhi's Blog RSS Feed",
          },
        ],
      },
     },
      
      {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: ["/", { regex: "^/blog" }, { regex: "^/thoughts" }],
        height: 5,
        prependToBody: false,
        color: `#663399`,
        footerHeight: 500,
        headerHeight: 0,
      },
      },
    `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/`,
      },
      
    },
    "gatsby-plugin-remove-generator",
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://seifrajhi.github.io",
        sitemap: "https://seifrajhi.github.io/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-preconnect",
      options: {
        domains: ["https://utteranc.es", "https://www.google-analytics.com"],
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`, // blurred option adds a lot of inline images that blows up page size
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saifeddine Rajhi - Website`,
        short_name: `seifrajhi-page`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `minimal-ui`,
        icon: `src/images/seifr-icon.jpg`,
      },
    },
    {
      resolve: "gatsby-plugin-webfonts",
      options: {
        fonts: {
          google: [
            {
              family: "Dancing Script",
              fontDisplay: "swap",
              variants: ["300", "400", "700"],
            },
            {
              family: "Ledger",
              fontDisplay: "swap",
              variants: ["300", "400", "700"],
            },
          ],
        },
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-LLPCCGNLH7",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: false,
        // Avoids sending pageview hits from custom paths
        exclude: [],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        alwaysSendReferrer: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: ["G-LLPCCGNLH7"],
        gtagConfig: {
          // optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          // cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          // respectDNT: false,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          delayOnRouteUpdate: 0,
        },
      },
    },
    "gatsby-plugin-dark-mode",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-images-native-lazy-load`,
            options: {
              loading: "lazy", // "lazy" | "eager" | "auto"
            },
          },
          `gatsby-remark-katex`,
          `gatsby-remark-embedder`,
          {
            resolve: "gatsby-remark-video",
            options: {
              width: "100%",
              height: "auto",
              preload: "auto",
              muted: true,
              autoplay: true,
              playsinline: true,
              controls: true,
              loop: true,
            },
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: "100%",
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              loadingStrategy: "lazy", //Optional: Enable support for lazy-load offscreen iframes. Default is disabled.
              urlOverrides: [
                {
                  id: "youtube",
                  embedURL: (videoId: string) =>
                    `https://www.youtube-nocookie.com/embed/${videoId}`,
                },
              ],
              containerClass: "embedVideo-container", //Optional: Custom CSS class for iframe container, for multiple classes separate them by space
              iframeId: false, //Optional: if true, iframe's id will be set to what is provided after 'video:' (YouTube IFrame player API requires iframe id)
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 680,
              linkImagesToOriginal: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              // By default the HTML entities <>&'" are escaped.
              // Add additional HTML escapes by providing a mapping
              // of HTML entities and their escape value IE: { '}': '&#123;' }
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: `<svg class="anchor-icon" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>`,
              className: `anchor`,
            },
          },
          `gatsby-remark-responsive-iframe`,
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noopener noreferrer",
            },
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/content/`,
      },
    },

    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://seifrajhi.github.io`,
        stripQueryString: true,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [
          `/nn-design`,
          `blog/assumptions-of-the-linear-regression`,
          `/indexv2`,
        ], // todo: handle all unpublished articles
      },
    },
    //"gatsby-plugin-webpack-bundle-analyser-v2",
  ],
}

export default config
