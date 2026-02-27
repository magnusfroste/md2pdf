import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link,
  Image,
  Table,
  Minus,
  ScissorsLineDashed,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface EditorToolbarActions {
  insertAtCursor: (text: string) => void;
  wrapSelection: (before: string, after: string) => void;
}

interface EditorToolbarProps {
  actions: EditorToolbarActions | null;
}

interface ToolButton {
  icon: React.ElementType;
  label: string;
  action: (actions: EditorToolbarActions) => void;
  separator?: false;
}

interface ToolSeparator {
  separator: true;
}

type ToolItem = ToolButton | ToolSeparator;

const tools: ToolItem[] = [
  { icon: Bold, label: "Fetstil (Ctrl+B)", action: (a) => a.wrapSelection("**", "**") },
  { icon: Italic, label: "Kursiv (Ctrl+I)", action: (a) => a.wrapSelection("*", "*") },
  { icon: Strikethrough, label: "Genomstruken", action: (a) => a.wrapSelection("~~", "~~") },
  { separator: true },
  { icon: Heading1, label: "Rubrik 1", action: (a) => a.insertAtCursor("\n# ") },
  { icon: Heading2, label: "Rubrik 2", action: (a) => a.insertAtCursor("\n## ") },
  { icon: Heading3, label: "Rubrik 3", action: (a) => a.insertAtCursor("\n### ") },
  { separator: true },
  { icon: List, label: "Punktlista", action: (a) => a.insertAtCursor("\n- ") },
  { icon: ListOrdered, label: "Numrerad lista", action: (a) => a.insertAtCursor("\n1. ") },
  { icon: Quote, label: "Citat", action: (a) => a.insertAtCursor("\n> ") },
  { icon: Code, label: "Kodblock", action: (a) => a.insertAtCursor("\n```\n\n```\n") },
  { separator: true },
  { icon: Link, label: "Länk", action: (a) => a.insertAtCursor("[text](url)") },
  { icon: Image, label: "Bild", action: (a) => a.insertAtCursor("![alt](url)") },
  { icon: Table, label: "Tabell", action: (a) => a.insertAtCursor("\n| Kolumn 1 | Kolumn 2 |\n|----------|----------|\n| cell     | cell     |\n") },
  { icon: Minus, label: "Horisontell linje", action: (a) => a.insertAtCursor("\n---\n") },
  { separator: true },
  { icon: ScissorsLineDashed, label: "Sidbrytning", action: (a) => a.insertAtCursor("\n<!-- pagebreak -->\n") },
];

const EditorToolbar = ({ actions }: EditorToolbarProps) => {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-0.5 px-3 py-1.5 border-b border-border bg-muted/30 flex-wrap">
        {tools.map((tool, i) => {
          if ("separator" in tool && tool.separator) {
            return <div key={i} className="w-px h-5 bg-border mx-1" />;
          }
          const t = tool as ToolButton;
          const Icon = t.icon;
          return (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => actions && t.action(actions)}
                  disabled={!actions}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
                >
                  <Icon className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">
                {t.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
};

export default EditorToolbar;
