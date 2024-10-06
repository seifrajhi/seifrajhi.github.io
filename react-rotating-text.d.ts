declare module 'react-rotating-text' {
    import * as React from 'react';
  
    interface ReactRotatingTextProps {
      items: string[];
      color?: string;
      typingInterval?: number;
      deletingInterval?: number;
      emptyPause?: number;
      pause?: number;
      cursor?: string;
    }
  
    const ReactRotatingText: React.FC<ReactRotatingTextProps>;
  
    export default ReactRotatingText;
  }
