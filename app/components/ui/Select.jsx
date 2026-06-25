'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

export default function Select({
    id,
    value,
    onChange,
    options,
    placeholder = 'Select an option',
}) {
    const [open, setOpen] = useState(false);
    const [focusIndex, setFocusIndex] = useState(-1);
    const rootRef = useRef(null);
    const listId = useId();

    const selected = options.find((option) => option.value === value);
    const displayLabel = selected?.label ?? placeholder;
    const isPlaceholder = !value;

    useEffect(() => {
        if (!open) return undefined;

        const onPointerDown = (event) => {
            if (!rootRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };

        const onKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [open]);

    useEffect(() => {
        if (!open) setFocusIndex(-1);
    }, [open]);

    const selectOption = (option) => {
        onChange(option.value);
        setOpen(false);
    };

    const onTriggerKeyDown = (event) => {
        if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(true);
            setFocusIndex(Math.max(0, options.findIndex((option) => option.value === value)));
        }
    };

    const onMenuKeyDown = (event) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setFocusIndex((index) => Math.min(index + 1, options.length - 1));
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            setFocusIndex((index) => Math.max(index - 1, 0));
        } else if (event.key === 'Enter' && focusIndex >= 0) {
            event.preventDefault();
            selectOption(options[focusIndex]);
        }
    };

    return (
        <div className={`custom-select ${open ? 'is-open' : ''}`} ref={rootRef}>
            <button
                type="button"
                id={id}
                className={`custom-select__trigger ${isPlaceholder ? 'is-placeholder' : ''}`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                onClick={() => setOpen((current) => !current)}
                onKeyDown={onTriggerKeyDown}
            >
                <span className="custom-select__value">{displayLabel}</span>
                <ChevronDown size={14} className="custom-select__chevron" aria-hidden="true" />
            </button>

            {open && (
                <ul
                    id={listId}
                    role="listbox"
                    className="custom-select__menu"
                    aria-labelledby={id}
                    onKeyDown={onMenuKeyDown}
                    tabIndex={-1}
                >
                    {options.map((option, index) => {
                        const isSelected = value === option.value;
                        const isFocused = focusIndex === index;

                        return (
                            <li
                                key={option.value || `option-${index}`}
                                role="option"
                                aria-selected={isSelected}
                                className={[
                                    'custom-select__option',
                                    isSelected ? 'is-selected' : '',
                                    isFocused ? 'is-focused' : '',
                                ].filter(Boolean).join(' ')}
                                onMouseEnter={() => setFocusIndex(index)}
                                onClick={() => selectOption(option)}
                            >
                                <span>{option.label}</span>
                                {isSelected && <Check size={13} strokeWidth={2.25} aria-hidden="true" />}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
