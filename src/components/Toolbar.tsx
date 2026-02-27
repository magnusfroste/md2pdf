import { Download, FileText, Eye, Columns2 } from "lucide-react";

type ViewMode = "split" | "editor" | "preview";

interface ToolbarProps {
  onExportPdf: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  isExporting: boolean;
}

const Toolbar = ({ onExportPdf, viewMode, onViewModeChange, isExporting }: ToolbarProps) => {
  return (
    <header className="flex items-center justify-between px-5 py-3 bg-toolbar">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-accent" />
        <h1 className="text-toolbar-foreground font-semibold text-base tracking-tight">
          Markdown to PDF
        </h1>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center bg-primary/20 rounded-md p-0.5 mr-3">
          <button
            onClick={() => onViewModeChange("editor")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              viewMode === "editor"
                ? "bg-accent text-accent-foreground"
                : "text-toolbar-muted hover:text-toolbar-foreground"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange("split")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              viewMode === "split"
                ? "bg-accent text-accent-foreground"
                : "text-toolbar-muted hover:text-toolbar-foreground"
            }`}
          >
            <Columns2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onViewModeChange("preview")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              viewMode === "preview"
                ? "bg-accent text-accent-foreground"
                : "text-toolbar-muted hover:text-toolbar-foreground"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={onExportPdf}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          {isExporting ? "Exporterar..." : "Ladda ner PDF"}
        </button>
      </div>
    </header>
  );
};

export default Toolbar;
