import { useCallback, useRef, useImperativeHandle, forwardRef } from "react";
import type { EditorToolbarActions } from "@/components/EditorToolbar";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const MarkdownEditor = forwardRef<EditorToolbarActions, MarkdownEditorProps>(
  ({ value, onChange }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const insertAtCursor = useCallback(
      (text: string) => {
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const newValue = value.slice(0, start) + text + value.slice(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          ta.focus();
          const pos = start + text.length;
          ta.setSelectionRange(pos, pos);
        });
      },
      [value, onChange]
    );

    const wrapSelection = useCallback(
      (before: string, after: string) => {
        const ta = textareaRef.current;
        if (!ta) return;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        const selected = value.slice(start, end);
        const newValue = value.slice(0, start) + before + selected + after + value.slice(end);
        onChange(newValue);
        requestAnimationFrame(() => {
          ta.focus();
          if (selected.length > 0) {
            ta.setSelectionRange(start + before.length, end + before.length);
          } else {
            const pos = start + before.length;
            ta.setSelectionRange(pos, pos);
          }
        });
      },
      [value, onChange]
    );

    useImperativeHandle(ref, () => ({ insertAtCursor, wrapSelection }), [
      insertAtCursor,
      wrapSelection,
    ]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e.target.value);
      },
      [onChange]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "b") {
          e.preventDefault();
          wrapSelection("**", "**");
        }
        if ((e.ctrlKey || e.metaKey) && e.key === "i") {
          e.preventDefault();
          wrapSelection("*", "*");
        }
      },
      [wrapSelection]
    );

    return (
      <textarea
        ref={textareaRef}
        className="w-full h-full resize-none bg-editor p-6 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="# Start writing your markdown here..."
        spellCheck={false}
      />
    );
  }
);

MarkdownEditor.displayName = "MarkdownEditor";

export default MarkdownEditor;
