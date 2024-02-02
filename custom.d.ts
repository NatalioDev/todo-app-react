declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.ImgHTMLAttributes<HTMLImageElement>;
    const src: string | undefined;
    export default src;
  }