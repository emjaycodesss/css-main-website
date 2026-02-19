import React, { useState, useRef, useId, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

/**
 * Searchable select (combobox) for Program field.
 * Design system: same height/radius/colors as Input; listbox uses card-style background.
 * Accessible: label, expanded/collapsed, listbox role, keyboard nav (arrow keys, Enter, Escape).
 */
export interface SearchableSelectProps {
  /** Visible label (required for a11y) */
  label: string;
  /** Options list */
  options: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  /** Placeholder when empty */
  placeholder?: string;
  /** Inline validation error */
  error?: string;
  disabled?: boolean;
  /** Optional id; otherwise generated */
  id?: string;
}

/* Trigger: min-h ensures full box; box-border + explicit border avoids bottom cut-off from overflow/clipping */
const triggerClasses =
  'w-full min-h-[40px] h-10 py-0 px-4 pr-10 box-border border rounded-[12px] text-left text-white font-[var(--font-sans)] text-[var(--text-body)] cursor-pointer transition-[border-color] duration-150 focus:outline-none focus:border-[#8b7ee6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(139,126,230,0.4)] disabled:opacity-35 disabled:cursor-not-allowed flex items-center justify-between bg-[rgba(37,40,55,0.95)]';
/* Listbox: no max-height so all options visible; portal positions with fixed to avoid card overflow clipping */
const listboxBaseClasses =
  'z-[9999] overflow-auto rounded-[12px] border border-[rgba(139,126,230,0.2)] bg-[rgba(37,40,55,0.98)] shadow-[var(--shadow-level-2)] py-1';

export function SearchableSelect({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  disabled,
  id: idProp,
}: SearchableSelectProps) {
  const id = idProp ?? `searchable-${useId()}`;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [highlightIndex, setHighlightIndex] = useState(0);
  /** Position for portal: fixed coords so listbox isn't clipped by card overflow */
  const [listboxStyle, setListboxStyle] = useState<{ top: number; left: number; width: number } | null>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayValue = selectedOption?.label ?? '';

  /** Filter options by query (case-insensitive) */
  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const openList = () => {
    if (disabled) return;
    setOpen(true);
    setQuery('');
    setHighlightIndex(0);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const closeList = () => {
    setOpen(false);
    setQuery('');
  };

  const selectValue = (option: SearchableSelectOption) => {
    onChange(option.value);
    closeList();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        closeList();
        return;
      case 'ArrowDown':
        e.preventDefault();
        setHighlightIndex((i) => (i < filteredOptions.length - 1 ? i + 1 : 0));
        return;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightIndex((i) => (i > 0 ? i - 1 : filteredOptions.length - 1));
        return;
      case 'Enter':
        e.preventDefault();
        if (filteredOptions[highlightIndex]) selectValue(filteredOptions[highlightIndex]);
        return;
      default:
        return;
    }
  };

  /** When open, measure trigger and set listbox position (for portal); position:fixed so dropdown isn't clipped by card */
  useEffect(() => {
    if (!open || !triggerRef.current) {
      setListboxStyle(null);
      return;
    }
    const update = () => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setListboxStyle({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open]);

  /** Ensure highlighted item is in view */
  useEffect(() => {
    if (!open || !listRef.current) return;
    const el = listRef.current.querySelector('[data-highlight="true"]');
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightIndex, open]);

  /* overflow-visible so trigger border is not clipped; listbox rendered in portal so it's never cut */
  return (
    <div className="w-full relative overflow-visible">
      <label
        htmlFor={id}
        className="block text-[var(--text-subhead)] text-white mb-2 cursor-default"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </label>
      <div
        ref={triggerRef}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={`${id}-listbox`}
        aria-activedescendant={open && filteredOptions[highlightIndex] ? `${id}-opt-${filteredOptions[highlightIndex].value}` : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onKeyDown={handleKeyDown}
      >
        <div className="relative overflow-visible">
          {open ? (
            <input
              ref={inputRef}
              id={id}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onBlur={() => setTimeout(closeList, 150)}
              placeholder={displayValue || placeholder}
              disabled={disabled}
              className={cn(
                triggerClasses,
                error ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'
              )}
              aria-autocomplete="list"
              aria-controls={`${id}-listbox`}
            />
          ) : (
            <button
              id={id}
              type="button"
              onClick={openList}
              disabled={disabled}
              className={cn(
                triggerClasses,
                error ? 'border-[#f87171]' : 'border-[rgba(58,53,80,0.8)]'
              )}
            >
              <span className={displayValue ? 'text-white' : 'text-[rgba(184,180,201,0.5)]'}>
                {displayValue || placeholder}
              </span>
              <ChevronDown className="h-5 w-5 text-[#b5a8d4] shrink-0" aria-hidden />
            </button>
          )}
        </div>
      </div>
      {open &&
        listboxStyle &&
        createPortal(
          <ul
            ref={listRef}
            id={`${id}-listbox`}
            role="listbox"
            className={cn(listboxBaseClasses)}
            aria-label={label}
            style={{
              position: 'fixed',
              top: listboxStyle.top,
              left: listboxStyle.left,
              width: listboxStyle.width,
              minHeight: '2rem',
            }}
          >
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-3 text-[var(--text-subhead)] text-[#b8b4c9]">No matches</li>
            ) : (
              filteredOptions.map((opt, i) => (
                <li
                  key={opt.value}
                  id={`${id}-opt-${opt.value}`}
                  role="option"
                  aria-selected={opt.value === value}
                  data-highlight={i === highlightIndex}
                  className={cn(
                    'px-4 py-3 cursor-pointer text-[var(--text-body)] transition-colors',
                    i === highlightIndex
                      ? 'bg-[rgba(139,126,230,0.2)] text-white'
                      : 'text-[#b8b4c9] hover:bg-[rgba(139,126,230,0.1)] hover:text-white'
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectValue(opt);
                  }}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>,
          document.body
        )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-[var(--text-caption-1)] text-[#f87171] cursor-default" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
