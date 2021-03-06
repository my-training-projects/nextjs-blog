import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";

import PostHeader from "./post-header";

import styles from "./post-content.module.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("jsx", jsx);

function PostContent(props) {
  const { title, image, content, slug } = props.post;

  const customComponents = {
    // image(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },

    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === `img`) {
        const image = node.children[0];

        return (
          <div className={styles.image}>
            <Image
              src={`/images/posts/${slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;

      const language = className.split("-")[1];

      return (
        <SyntaxHighlighter
          language={language}
          children={children}
          style={atomDark}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={`/images/posts/${slug}/${image}`} />
      <ReactMarkdown components={customComponents}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
