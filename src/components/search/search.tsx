import React, { FC, useState, useEffect, useRef, ChangeEvent } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';
import "./search.css";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fusejsUrl: string;
  posts: { id: string; frontmatter: { path: string; title: string } }[];
  LinkComponent: React.FC<{ post: any }>;
}

const SearchBar: FC<SearchBarProps> = ({ searchQuery, setSearchQuery, fusejsUrl, posts, LinkComponent }) => {
  const [isActive, setIsActive] = useState(false);
  const [fusejsData, setFusejsData] = useState(null);
  const fetching = useRef(false);

  useEffect(() => {
    if (!fetching.current && !fusejsData && searchQuery) {
      fetching.current = true;

      fetch(fusejsUrl)
        .then((res) => res.json())
        .then((json) => setFusejsData(json));
    }
  }, [fusejsData, searchQuery, fusejsUrl]);

  const fusejsResults = useGatsbyPluginFusejs(searchQuery, fusejsData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    if (!searchQuery) {
      setIsActive(false);
    }
  };

  return (
    <div>
      <form action="" className="search-bar">
        <input
          type="search"
          name="search"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          pattern=".*\S.*"
          required
        />
        <button className="search-btn" type="submit">
          <span></span>
        </button>
      </form>
      <div>
        {fusejsResults.length > 0 ? (
          fusejsResults.map((result: { id: string; [key: string]: any }) => {
            const post = posts.find(p => p.id === result.id);
            return post ? <LinkComponent key={result.id} post={post} /> : null;
          })
        ) : (
          posts && posts.map(post => (
            <LinkComponent key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default SearchBar;
