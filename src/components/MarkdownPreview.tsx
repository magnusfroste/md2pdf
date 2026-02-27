import { useMemo } from "react";
import { marked } from "marked";
import { PdfSettings, DEFAULT_PDF_SETTINGS } from "@/types/pdf-settings";

interface MarkdownPreviewProps {
  markdown: string;
  settings?: PdfSettings;
}

const MarkdownPreview = ({ markdown, settings = DEFAULT_PDF_SETTINGS }: MarkdownPreviewProps) => {
  const html = useMemo(() => {
    if (!markdown.trim()) {
      return '<p style="color: hsl(215 12% 50%); font-style: italic;">Your preview will appear here...</p>';
    }
    return marked.parse(markdown, { async: false }) as string;
  }, [markdown]);

  const styleClass = settings.renderStyle !== "editorial" ? `style-${settings.renderStyle}` : "";
  const themeClass = settings.colorTheme !== "light" ? `theme-${settings.colorTheme}` : "";

  return (
    <div
      className={`markdown-preview p-8 max-w-none h-full overflow-auto bg-preview ${styleClass} ${themeClass}`}
      style={{ fontSize: `${settings.fontSize}px` }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPreview;
