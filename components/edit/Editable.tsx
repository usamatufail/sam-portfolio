'use client';

import { useEffect, useRef, type ElementType } from 'react';
import { useEditActions, useEditMode, useRegisterOriginal } from './context';

/**
 * One inline-editable piece of copy.
 *
 * In preview mode this renders exactly the markup the page would have rendered
 * anyway, so the public site is untouched by the editor existing.
 */
export function Editable({
  path,
  value,
  as: Tag = 'span',
  className,
  multiline = false,
  title,
  reveal = false,
}: {
  path: string;
  value: string;
  as?: ElementType;
  className?: string;
  /** Allow line breaks. Single-line fields swallow Enter instead. */
  multiline?: boolean;
  title?: string;
  /** Opt into the site's scroll-reveal animation, like a plain element would. */
  reveal?: boolean;
}) {
  const mode = useEditMode();
  const { setValue } = useEditActions();
  const register = useRegisterOriginal();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    register(path, value);
  }, [register, path, value]);

  // `data-anim` has to be a real prop: hyphenated JSX attributes are not type
  // checked on components, so passing it through would silently do nothing.
  const anim = reveal ? { 'data-anim': '' } : {};

  if (mode !== 'edit') {
    return (
      <Tag className={className} {...anim}>
        {value}
      </Tag>
    );
  }

  return (
    <Tag
      ref={ref}
      {...anim}
      data-editable=""
      data-path={path}
      title={title ?? 'Click to edit'}
      className={className}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      spellCheck
      onInput={(event: React.FormEvent<HTMLElement>) => {
        setValue(path, event.currentTarget.textContent ?? '');
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        // Enter would otherwise inject line breaks into a heading or a label.
        if (event.key === 'Enter' && !multiline) {
          event.preventDefault();
          event.currentTarget.blur();
        }
        // Let the palette and the toolbar keep their shortcuts.
        if (event.key === 'Escape') event.currentTarget.blur();
      }}
      onPaste={(event: React.ClipboardEvent<HTMLElement>) => {
        // Firefox lacks plaintext-only, so paste is forced back to plain text.
        event.preventDefault();
        const text = event.clipboardData.getData('text/plain').replace(/\s+/g, ' ');
        document.execCommand('insertText', false, text);
      }}
    >
      {value}
    </Tag>
  );
}
