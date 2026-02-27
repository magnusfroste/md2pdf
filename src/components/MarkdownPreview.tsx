import { useMemo, useEffect, useRef } from "react";
import { marked } from "marked";
import { PdfSettings, DEFAULT_PDF_SETTINGS } from "@/types/pdf-settings";

interface MarkdownPreviewProps {
  markdown: string;
  settings?: PdfSettings;
  showPageBoundaries?: boolean;
}

const PAGE_HEIGHTS: Record<string, number> = {
  a4: 297,
  letter: 279.4,
  legal: 355.6,
};

const MarkdownPreview = ({
  markdown,
  settings = DEFAULT_PDF_SETTINGS,
  showPageBoundaries = true,
}: MarkdownPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const html = useMemo(() => {
    if (!markdown.trim()) {
      return '<p style="color: hsl(215 12% 50%); font-style: italic;">Your preview will appear here...</p>';
    }
    return marked.parse(markdown, { async: false }) as string;
  }, [markdown]);

  const styleClass = settings.renderStyle !== "editorial" ? `style-${settings.renderStyle}` : "";
  const themeClass = settings.colorTheme !== "light" ? `theme-${settings.colorTheme}` : "";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove old boundaries
    container.querySelectorAll(".page-boundary").forEach((el) => el.remove());

    if (!showPageBoundaries) return;

    const pageHeightMm = PAGE_HEIGHTS[settings.pageSize] || 297;
    const usableHeightMm = pageHeightMm - settings.marginMm * 2;
    // Approximate: 1mm ≈ 3.78px at 96dpi
    const pxPerMm = 3.78;
    const pageHeightPx = usableHeightMm * pxPerMm;

    const contentHeight = container.scrollHeight;
    let page = 1;
    let y = pageHeightPx;

    while (y < contentHeight) {
      page++;
      const boundary = document.createElement("div");
      boundary.className = "page-boundary";
      boundary.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        top: ${y}px;
        border-top: 2px dashed hsl(165 60% 40% / 0.4);
        pointer-events: none;
        z-index: 10;
      `;
      const label = document.createElement("span");
      label.textContent = `— SIDA ${page} —`;
      label.style.cssText = `
        position: absolute;
        top: -10px;
        left: 50%;
        transform: translateX(-50%);
        background: hsl(165 60% 40% / 0.15);
        color: hsl(165 60% 40%);
        font-size: 10px;
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        padding: 1px 10px;
        border-radius: 4px;
        letter-spacing: 0.05em;
      `;
      boundary.appendChild(label);
      container.appendChild(boundary);
      y += pageHeightPx;
    }
  }, [html, showPageBoundaries, settings.pageSize, settings.marginMm, settings.fontSize]);

  return (
    <div
      ref={containerRef}
      className={`markdown-preview p-8 max-w-none h-full overflow-auto bg-preview relative ${styleClass} ${themeClass}`}
      style={{ fontSize: `${settings.fontSize}px` }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default MarkdownPreview;
