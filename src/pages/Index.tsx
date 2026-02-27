import { useState, useCallback, useRef } from "react";
import MarkdownEditor from "@/components/MarkdownEditor";
import MarkdownPreview from "@/components/MarkdownPreview";
import Toolbar from "@/components/Toolbar";
import EditorToolbar from "@/components/EditorToolbar";
import type { EditorToolbarActions } from "@/components/EditorToolbar";
import { toast } from "sonner";
import { PdfSettings, DEFAULT_PDF_SETTINGS } from "@/types/pdf-settings";

const DEFAULT_MARKDOWN = `# Welcome to Markdown to PDF

Convert your markdown into beautiful PDF documents instantly.

## Features

- **Live preview** — See your changes in real-time
- **Clean typography** — Elegant serif font for readability
- **One-click export** — Download as PDF instantly

## Example Content

Here's a code block:

\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> "The best way to predict the future is to create it." — Peter Drucker

### Table Example

| Feature | Status |
|---------|--------|
| Headings | ✅ |
| Lists | ✅ |
| Code blocks | ✅ |
| Tables | ✅ |
| Blockquotes | ✅ |

---

Start editing on the left to see your markdown rendered here!
`;

type ViewMode = "split" | "editor" | "preview";

const Index = () => {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [isExporting, setIsExporting] = useState(false);
  const [pdfSettings, setPdfSettings] = useState<PdfSettings>(DEFAULT_PDF_SETTINGS);
  const [showPageBoundaries, setShowPageBoundaries] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<EditorToolbarActions>(null);

  const handleExportPdf = useCallback(async () => {
    if (!markdown.trim()) {
      toast.error("Skriv lite markdown först!");
      return;
    }

    setIsExporting(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;

      const styleClass = pdfSettings.renderStyle !== "editorial" ? `style-${pdfSettings.renderStyle}` : "";
      const themeClass = pdfSettings.colorTheme !== "light" ? `theme-${pdfSettings.colorTheme}` : "";

      const element = document.createElement("div");
      element.className = `markdown-preview ${styleClass} ${themeClass}`;
      element.style.padding = "40px";
      element.style.maxWidth = "800px";
      element.style.margin = "0 auto";
      element.style.fontSize = `${pdfSettings.fontSize}px`;
      element.style.lineHeight = "1.8";
      element.style.color = "#1a1e2e";

      const { marked } = await import("marked");
      element.innerHTML = marked.parse(markdown, { async: false }) as string;

      // Copy styles
      const style = document.createElement("style");
      const cssRules = Array.from(document.styleSheets)
        .flatMap((sheet) => {
          try {
            return Array.from(sheet.cssRules);
          } catch {
            return [];
          }
        })
        .filter((rule) => rule.cssText.includes("markdown-preview"))
        .map((rule) => rule.cssText)
        .join("\n");

      style.textContent = cssRules;
      element.prepend(style);

      document.body.appendChild(element);

      const pageSizeMap = { a4: "a4", letter: "letter", legal: "legal" } as const;

      await (html2pdf() as any)
        .set({
          margin: [pdfSettings.marginMm, pdfSettings.marginMm, pdfSettings.marginMm, pdfSettings.marginMm],
          filename: "document.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: pageSizeMap[pdfSettings.pageSize], orientation: "portrait" },
          pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        })
        .from(element)
        .save();

      document.body.removeChild(element);
      toast.success("PDF nedladdad!");
    } catch (error) {
      console.error("PDF export failed:", error);
      toast.error("Kunde inte skapa PDF. Försök igen.");
    } finally {
      setIsExporting(false);
    }
  }, [markdown, pdfSettings]);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toolbar
        onExportPdf={handleExportPdf}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        isExporting={isExporting}
        pdfSettings={pdfSettings}
        onPdfSettingsChange={setPdfSettings}
        onSelectTemplate={setMarkdown}
        showPageBoundaries={showPageBoundaries}
        onTogglePageBoundaries={() => setShowPageBoundaries((v) => !v)}
      />

      <main className="flex flex-1 min-h-0">
        {/* Editor */}
        {(viewMode === "split" || viewMode === "editor") && (
          <div
            className={`flex flex-col border-r border-border ${
              viewMode === "split" ? "w-1/2" : "w-full"
            }`}
          >
            <div className="px-5 py-2 border-b border-border bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Markdown
              </span>
            </div>
            <EditorToolbar actions={editorRef.current} />
            <div className="flex-1 min-h-0">
              <MarkdownEditor ref={editorRef} value={markdown} onChange={setMarkdown} />
            </div>
          </div>
        )}

        {/* Preview */}
        {(viewMode === "split" || viewMode === "preview") && (
          <div
            className={`flex flex-col ${
              viewMode === "split" ? "w-1/2" : "w-full"
            }`}
          >
            <div className="px-5 py-2 border-b border-border bg-muted/50">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Förhandsgranskning
              </span>
            </div>
            <div className="flex-1 min-h-0 overflow-auto" ref={previewRef}>
              <MarkdownPreview markdown={markdown} settings={pdfSettings} showPageBoundaries={showPageBoundaries} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
