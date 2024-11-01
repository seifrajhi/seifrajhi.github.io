import * as React from "react";
import { useState, useEffect, useRef} from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/theme/layout";
import Seo from "../components/seo/seo";
import PersonRichSnippet from "../components/seo/person-snippet";
import Avatar from "../components/homepage/avatar";
import ThemeSwitcher from "../components/theme/theme-switcher";
import ReactRotatingText from "react-rotating-text";
import MainNavigation from "../components/main-navigation";
import BlogTeaser from "../components/blog/blog-teaser";
import ThoughtTeaser from "../components/thoughts/thought-teaser";
import TalkTeaser from "../components/talks/talk-teaser";
import SearchBar from "../components/search/search";
import LinkComponent from "../components/search/LinkComponent";
import { useFlexSearch } from "react-use-flexsearch";
import SocialLinks from "../components/homepage/SocialLinks";
import NNBackground from "../components/nn-design/nn-background";
import Footer from "../components/footer";
import "./Index.css";

const shuffleArray = (strings: string[]) =>
  strings.sort(() => Math.random() - 1.1);

const titles: string[] = shuffleArray([
  "DevOps Engineer 🛠",
  "Containers and Kubernetes tinkerer 🪛",
  "AWS GEEK ☁️",
  "AWS community builder 👷",
  "Python Enthusiast 🐍",
  "Container Nerd 🧠 🐳",
  "Data Platform Engineer 📊",
  "Site Reliability Engineer SRE 🚀",
  "Cloud Architect ☁️",
  "Tech Blogger ✍️",
  "Head in the clouds ☁️",
  "Code Monkey 🐒",
  "Tech Enthusiast 🤓",
  "Cloud Engineer 🔬",
  "Passive Traveler 🏕",
  "Open Source Contributor 👨‍👩‍👧‍👦",
  "3x AWS Certified 🏅",
  "Problem Solver 🧠",
  "Coffee Guy 🍵",
  "Pythonista 🐍",
  "Idea Generator 💡",
  "Scooter Driver 🛴",
  "Software Engineer 👨‍💻",
  "Life Explorer 🧗‍♂️",
  "CKA Certified 🏅",
  "Science Learner 🚀",
  "Rookie Hacker 🔐",
  "Lifelong Student 📚",
  "AI Evangelist 🔮",
  "Hobby Blogger ✍️",
  "Critical thinker 💬",
]);

const IndexPage = (): JSX.Element => {
    const { recentPosts, recentThoughts, recentTalks, localSearchPages } = useStaticQuery(
      graphql`
        query {
          localSearchPages {
            index
            store
          }
          recentPosts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 3
            filter: {
              fileAbsolutePath: { regex: "/(blog)/" }
              frontmatter: { published: { eq: true } }
            }
          ) {
            edges {
              node {
                timeToRead
                frontmatter {
                  id
                  humanDate: date(formatString: "MMM D, YYYY")
                  fullDate: date(formatString: "YYYY-MM-DD")
                  path
                  title
                  keywords
                  excerpt
                  cover {
                    childImageSharp {
                      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    }
                  }
                }
              }
            }
          }
          recentThoughts: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 3
            filter: {
              fileAbsolutePath: { regex: "/(thoughts)/" }
              frontmatter: { published: { eq: true } }
            }
          ) {
            edges {
              node {
                timeToRead
                frontmatter {
                  id
                  humanDate: date(formatString: "MMM D, YYYY")
                  fullDate: date(formatString: "YYYY-MM-DD")
                  path
                  title
                  keywords
                  excerpt
                  cover {
                    childImageSharp {
                      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    }
                  }
                }
              }
            }
          }
          recentTalks: allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 3
            filter: {
              fileAbsolutePath: { regex: "/(talks)/" }
              frontmatter: { published: { eq: true } }
            }
          ) {
            edges {
              node {
                timeToRead
                frontmatter {
                  id
                  humanDate: date(formatString: "MMM D, YYYY")
                  fullDate: date(formatString: "YYYY-MM-DD")
                  path
                  title
                  keywords
                  excerpt
                  cover {
                    childImageSharp {
                      gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
                    }
                  }
                }
              }
            }
          }
        }
      `
    )
    

   
    const { search } = typeof window !== 'undefined' ? window.location : { search: '' };
    const query = typeof window !== 'undefined' ? new URLSearchParams(search).get('s') : '';
    const [searchQuery, setSearchQuery] = useState(query || '');
    const [isHovered, setIsHovered] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const inactivityTimeoutRef = useRef<number | null>(null);
    const resetTimeoutRef = useRef<number | null>(null);
  
    useEffect(() => {
      if (searchQuery) {
        setShowResults(true);
        if (inactivityTimeoutRef.current) {
          clearTimeout(inactivityTimeoutRef.current);
        }
        inactivityTimeoutRef.current = window.setTimeout(() => {
          setShowResults(false);
        }, 5000); // 3 seconds of inactivity
  
        if (resetTimeoutRef.current) {
          clearTimeout(resetTimeoutRef.current);
        }
        resetTimeoutRef.current = window.setTimeout(() => {
          setSearchQuery('');
          setShowResults(false);
        }, 8000); // 5 seconds to reset
      } else {
        setShowResults(false);
      }
    }, [searchQuery]);
  
    const handleMouseEnter = () => {
      setIsHovered(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  
    const handleMouseLeave = () => {
      setIsHovered(false);
      timeoutRef.current = window.setTimeout(() => {
        if (!isHovered) {
          setShowResults(false);
        }
      }, 5000); // 2 seconds delay
    };
  
    const handleInputChange = (query: string) => {
      setSearchQuery(query);
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
      resetTimeoutRef.current = window.setTimeout(() => {
        setSearchQuery('');
        setShowResults(false);
      }, 5000); // 5 seconds to reset
    };
  
    const results = localSearchPages
      ? useFlexSearch(searchQuery, localSearchPages.index, localSearchPages.store)
      : [];
  
    useEffect(() => {
      if (!searchQuery) {
        setIsHovered(false);
      }
    }, [searchQuery]);
  
    return (
      <Layout>
        <Seo
          title="Saifeddine Rajhi - Platform engineer and DevOps Engineer, Containers nerd"
          isUniqueTitle={true}
          className="home-page-v2"
          pagePath="/"
        />
        <SearchBar searchQuery={searchQuery} setSearchQuery={handleInputChange} />
        {showResults && (
          <div
            className="search-results"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {searchQuery && results.length === 0 && (
              <p className="activity-notfound">No results found</p>
            )}
            {results.map(result => (
              <LinkComponent key={result.id} post={result} />
            ))}
          </div>
        )}

      <main className="homepagev2">
        <div className="intro">
          <div id="hero-header" className="hero-header homepage-sidebar">
            <NNBackground theme="dark" id="neural-network-background"/>
            <figure className="hero-intro">
              <div className="logo">
                <div className="avatar">
                  <Avatar />
                </div>
              </div>
              <h1 className="name">
                <span className="first-name">Saifeddine</span>{" "}
                <span className="second-name">Rajhi</span>
              </h1>
              <div className="title">
                <ReactRotatingText items={titles} />
              </div>
              <br></br>
              <MainNavigation space={"homepage"} />
              <SocialLinks showPatreon={true} iconSize="sm" />
              <div className="theme-switcher">
                <ThemeSwitcher />
              </div>
            </figure>
          </div>
        </div>
        <div className="mylife">
          <NNBackground theme="dark" id="neural-network-background" />
          <div>
            <p className="hey">Hi there<span role="img">👋</span>, Saif here!</p>
            <p>
            I’m Saifeddine, but you can call me <strong>Saif</strong>. I’m a Senior Data Platform Engineer and a former Site Reliability Engineer. I’m all about containers, Kubernetes, and diving into the latest tech trends. 
            </p>
            <p>
              <strong><em>Let’s Connect! <a href="https://cal.com/saifeddine-rajhi" className="link-url">Schedule a meeting</a> on my calendar to discuss potential collaborations, projects, or just to network.</em></strong>
            </p>
           <br />
          </div>
          <div>
            <h2 className="activity-title">Learn & Share</h2>
            <div>
              <p>
                I am a lifetime learner with a keen interest in a broad range of topics, including Containers and Cloud, 
                Kubernetes, DevOps, Platform Engineering, AI, Security, Networking, Open Source, AWS, 
                Automation, Infrastructure as Code, Monitoring, and Reliability Engineering.
              </p>
              <br />
              <br />
              <p>
                When I have spare time, I enjoy putting together my knowledge
                about those enlightening topics and share with others.
              </p>
              <div className="recent-posts">
                {recentPosts.edges.map(
                  ({ node: { timeToRead, frontmatter } }) => (
                    <BlogTeaser
                      key={frontmatter.id}
                      id={frontmatter.id}
                      title={frontmatter.title}
                      url={frontmatter.path}
                      timeToRead={timeToRead}
                      publishedHumanDate={frontmatter.humanDate}
                      publishedFullDate={frontmatter.fullDate}
                      excerpt={frontmatter.excerpt}
                      cover={frontmatter.cover.childImageSharp.gatsbyImageData}
                      keywords={frontmatter.keywords}
                    />
                  )
                )}
              </div>
              <div className="all-button-wrapper">
                <a className="read-all-button" href={"/blog/"}>
                  Read All Posts
                </a>
              </div>
            </div>
          </div>
          <br />
          <div>
            <h2 className="activity-title">Think & Write</h2>
            <div>
              <p>
                Another thing I like to do is to explore this world, think about
                its components, their interconnections and finally capture my
                observations and thoughts.
              </p>
              <p>
                These thoughts are usually about self-development, management
                and people perceptions and mindsets.
              </p>
              <div className="recent-thoughts">
                {recentThoughts.edges.map(
                  ({ node: { timeToRead, frontmatter } }) => (
                    <ThoughtTeaser
                      key={frontmatter.id}
                      id={frontmatter.id}
                      title={frontmatter.title}
                      url={frontmatter.path}
                      timeToRead={timeToRead}
                      publishedHumanDate={frontmatter.humanDate}
                      publishedFullDate={frontmatter.fullDate}
                      excerpt={frontmatter.excerpt}
                      cover={frontmatter.cover.childImageSharp.gatsbyImageData}
                      keywords={frontmatter.keywords}
                    />
                  )
                )}
              </div>
              <div className="all-button-wrapper">
                <a className="read-all-button" href={"/thoughts/"}>
                  Read All Thoughts
                </a>
              </div>
            </div>
          </div>
          <div>
            <h2 className="activity-title">Speak & Inspire</h2>
            <div>
              <p>
              I love geeking out about tech and sharing my journey through public speaking. I've given talks on all things AWS, Containers, Cloud, Kubernetes, Platform Engineering, Networking and Automation.
              </p>
              <br></br>
              <p>
              My mission? To spark curiosity and spread knowledge. Whether it's at conferences, webinars, or meetups, I break down complex topics into bite-sized, digestible pieces, making tech fun and accessible for everyone.
              </p>
              <div className="recent-talks">
                {recentTalks.edges.map(
                  ({ node: { timeToRead, frontmatter } }) => (
                    <TalkTeaser
                      key={frontmatter.id}
                      id={frontmatter.id}
                      title={frontmatter.title}
                      url={frontmatter.path}
                      timeToRead={timeToRead}
                      publishedHumanDate={frontmatter.humanDate}
                      publishedFullDate={frontmatter.fullDate}
                      excerpt={frontmatter.excerpt}
                      cover={frontmatter.cover.childImageSharp.gatsbyImageData}
                      keywords={frontmatter.keywords}
                    />
                  )
                )}
              </div>
              <div className="all-button-wrapper">
                <a className="read-all-button" href={"/talks/"}>
                  Check All my Talks
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <PersonRichSnippet />
    </Layout>
  );
};

export default IndexPage;
