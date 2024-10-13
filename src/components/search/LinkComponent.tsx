import React, { FC } from 'react';
import "./search.css";

interface LinkComponentProps {
  post: {
    id: string;
    path: string;
    title: string;
    rawMarkdownBody?: string; // Optional since search results might not have this field
  };
}

const LinkComponent: FC<LinkComponentProps> = ({ post }) => {
  return (
    <div className="search-result">
      <h4 style={{ textAlign: 'center' }}>
        <a href={post.path} className='link-url'>{post.title}</a>
      </h4>
      {post.rawMarkdownBody && (
        <p>{post.rawMarkdownBody.substring(0, 100)}...</p> // Display a snippet of the post if available
      )}
    </div>
  );
};

export default LinkComponent;
