import React, { useState, useEffect, useRef, FC } from "react";
import { graphql, PageProps } from "gatsby";
import { useGatsbyPluginFusejs } from 'react-use-fusejs';
import SearchBar from "./search";
import "./search.css";
import LinkComponent from "./LinkComponent"; 

interface SearchPageProps extends PageProps {
  data: {
    localSearchPages: {
      index: string;
      store: string;
    };
    allMarkdownRemark: {
      nodes: {
        id: string;
        frontmatter: {
          path: string;
          title: string;
        };
        rawMarkdownBody: string;
      }[];
    };
    fusejs: {
      publicUrl: string;
    };
  };
}

const SearchPage: FC<SearchPageProps> = ({ data }) => {
  const { localSearchPages: { index, store }, allMarkdownRemark: { nodes }, fusejs } = data;
  const [searchQuery, setSearchQuery] = useState("");
  const [fusejsData, setFusejsData] = useState(null);
  const fetching = useRef(false);

  useEffect(() => {
    if (!fetching.current && !fusejsData && searchQuery) {
      fetching.current = true;

      fetch(fusejs.publicUrl)
        .then((res) => res.json())
        .then((json) => setFusejsData(json));
    }
  }, [fusejsData, searchQuery, fusejs.publicUrl]);

  const fusejsResults = useGatsbyPluginFusejs(searchQuery, fusejsData);

  return (
    <div>
      <h1>Blog</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      {fusejsResults.length > 0 ? (
        fusejsResults.map((result: { id: string; [key: string]: any }) => {
          const post = nodes.find(p => p.id === result.id);
          return post ? <LinkComponent key={result.id} post={post} /> : null;
        })
      ) : (
        nodes.map(post => (
          <LinkComponent key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export const query = graphql`
  query {
    localSearchPages {
      index
      store
    }
    allMarkdownRemark {
      nodes {
        id
        frontmatter {
          path
          title
        }
        rawMarkdownBody
      }
    }
    fusejs {
      publicUrl
    }
  }
`;

export default SearchPage;
