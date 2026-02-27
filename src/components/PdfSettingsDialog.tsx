import { Settings } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PdfSettings,
  PageSize,
  RenderStyle,
  ColorTheme,
  PAGE_SIZE_LABELS,
  RENDER_STYLE_LABELS,
  COLOR_THEME_LABELS,
} from "@/types/pdf-settings";

interface PdfSettingsDialogProps {
  settings: PdfSettings;
  onChange: (settings: PdfSettings) => void;
}

const PdfSettingsDialog = ({ settings, onChange }: PdfSettingsDialogProps) => {
  const update = <K extends keyof PdfSettings>(key: K, value: PdfSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-3 py-2 rounded-md text-toolbar-muted hover:text-toolbar-foreground text-sm font-medium transition-colors">
          <Settings className="w-4 h-4" />
          Inställningar
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>PDF-inställningar</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {/* Render Style */}
          <div className="space-y-2">
            <Label>Renderingsstil</Label>
            <Select
              value={settings.renderStyle}
              onValueChange={(v) => update("renderStyle", v as RenderStyle)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(RENDER_STYLE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Theme */}
          <div className="space-y-2">
            <Label>Färgtema</Label>
            <Select
              value={settings.colorTheme}
              onValueChange={(v) => update("colorTheme", v as ColorTheme)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(COLOR_THEME_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Page Size */}
          <div className="space-y-2">
            <Label>Sidstorlek</Label>
            <Select
              value={settings.pageSize}
              onValueChange={(v) => update("pageSize", v as PageSize)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PAGE_SIZE_LABELS).map(([key, label]) => (
                  <SelectItem key={key} value={key}>{label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Margins */}
          <div className="space-y-2">
            <Label>Marginaler: {settings.marginMm} mm</Label>
            <Slider
              value={[settings.marginMm]}
              onValueChange={([v]) => update("marginMm", v)}
              min={5}
              max={40}
              step={1}
            />
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label>Textstorlek: {settings.fontSize}px</Label>
            <Slider
              value={[settings.fontSize]}
              onValueChange={([v]) => update("fontSize", v)}
              min={10}
              max={24}
              step={1}
            />
          </div>

          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Sidhuvud</Label>
              <Switch
                checked={settings.showHeader}
                onCheckedChange={(v) => update("showHeader", v)}
              />
            </div>
            {settings.showHeader && (
              <Input
                placeholder="Dokumenttitel / rubrik"
                value={settings.headerText}
                onChange={(e) => update("headerText", e.target.value)}
              />
            )}
          </div>

          {/* Footer / Page Numbers */}
          <div className="flex items-center justify-between">
            <Label>Sidnummer</Label>
            <Switch
              checked={settings.showPageNumbers}
              onCheckedChange={(v) => update("showPageNumbers", v)}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfSettingsDialog;
