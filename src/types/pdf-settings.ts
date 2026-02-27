export type PageSize = "a4" | "letter" | "legal";
export type RenderStyle = "editorial" | "latex" | "github" | "minimal";
export type ColorTheme = "light" | "dark" | "sepia";

export interface PdfSettings {
  pageSize: PageSize;
  marginMm: number;
  fontSize: number;
  renderStyle: RenderStyle;
  colorTheme: ColorTheme;
  showHeader: boolean;
  headerText: string;
  showFooter: boolean;
  showPageNumbers: boolean;
}

export const DEFAULT_PDF_SETTINGS: PdfSettings = {
  pageSize: "a4",
  marginMm: 15,
  fontSize: 16,
  renderStyle: "editorial",
  colorTheme: "light",
  showHeader: false,
  headerText: "",
  showFooter: true,
  showPageNumbers: true,
};

export const PAGE_SIZE_LABELS: Record<PageSize, string> = {
  a4: "A4",
  letter: "US Letter",
  legal: "US Legal",
};

export const RENDER_STYLE_LABELS: Record<RenderStyle, string> = {
  editorial: "Editorial (Serif)",
  latex: "LaTeX (Akademisk)",
  github: "GitHub",
  minimal: "Minimalistisk",
};

export const COLOR_THEME_LABELS: Record<ColorTheme, string> = {
  light: "Ljust",
  dark: "Mörkt",
  sepia: "Sepia",
};
