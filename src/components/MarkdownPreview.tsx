import { useMemo } from "react";
import { marked } from "marked";

interface MarkdownPreviewProps {
  markdown: string;
}

const MarkdownPreview = ({ markdown }: MarkdownPreviewProps) => {
  const html = useMemo(() => {
    if (!markdown.trim()) {
      return '<p style="color: hsl(215 12% 50%); font-style: italic;">Your preview will appear here...</p>';
    }
    return marked.parse(markdown, { async: false }) as string;
  }, [markdown]);

  return (
    <div
      className="markdown-preview p-8 max-w-none h-full overflow-auto bg-preview"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPreview;
