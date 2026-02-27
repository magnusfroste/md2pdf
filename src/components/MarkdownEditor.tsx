import { useCallback } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = ({ value, onChange }: MarkdownEditorProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <textarea
      className="w-full h-full resize-none bg-editor p-6 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
      value={value}
      onChange={handleChange}
      placeholder="# Start writing your markdown here...

## Features
- **Bold** and *italic* text
- Lists and tables
- Code blocks
- And more..."
      spellCheck={false}
    />
  );
};

export default MarkdownEditor;
