import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

interface MarkdownProps {
    children: string;
}

export default function Markdown(props: MarkdownProps) {
    return (
        <ReactMarkdown className={'MarkdownRenderer'} remarkPlugins={[gfm]}>
            {props.children}
        </ReactMarkdown>
    );
}