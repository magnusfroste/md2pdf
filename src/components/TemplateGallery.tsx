import { LayoutTemplate } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TEMPLATES, Template } from "@/data/templates";
import { useState } from "react";

interface TemplateGalleryProps {
  onSelect: (content: string) => void;
}

const TemplateGallery = ({ onSelect }: TemplateGalleryProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (template: Template) => {
    onSelect(template.content);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-toolbar-muted hover:text-toolbar-foreground text-sm font-medium transition-colors">
          <LayoutTemplate className="w-4 h-4" />
          Mallar
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Välj en mall</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3 pt-2">
          {TEMPLATES.map((template) => {
            const Icon = template.icon;
            return (
              <button
                key={template.id}
                onClick={() => handleSelect(template)}
                className="flex flex-col items-start gap-2 p-4 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/5 transition-colors text-left group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-5 h-5 text-accent" />
                  <span className="font-medium text-sm text-card-foreground">{template.name}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateGallery;
