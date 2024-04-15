import React, { useCallback, useState } from 'react';
import { debounce } from '../../utils/debounce';
import { getSuggestions } from '../../api/api';
import './Autocomplete.css';

const DEBOUBCE_DELAY = 300;

export const Autocomplete = () => {
    const [autocompleteValue, setAutocompleteValue] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchSuggestions = async (value: string) => {
        setSuggestions([]);
        if (value) {
            setIsLoading(true);
            const result = await getSuggestions(value);
            setError(result.error);
            setSuggestions(result.suggestions);
            setIsLoading(false);
        }
    };

    const handleAutocompleteChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setAutocompleteValue(event.target.value);
        debounceSuggestionsFetching(event.target.value.trim());
    };

    // delayed call for performance optimization
    const debounceSuggestionsFetching = useCallback(
        debounce(fetchSuggestions, DEBOUBCE_DELAY),
        []
    );

    const handleSuggestionSelect = (value: string) => {
        setAutocompleteValue(value);
        setSuggestions([]);
    };

    // higlighting the matching part of the text
    const getHighlightedText = (text: string) => {
        const parts = text.split(
            new RegExp(`(${autocompleteValue.trim()})`, 'gi')
        );
        return (
            <>
                {parts.map((part, i) => (
                    <span
                        key={i}
                        className={
                            part.toLowerCase() ===
                            autocompleteValue.trim().toLowerCase()
                                ? 'autocomplete__suggestions-item__highlight'
                                : ''
                        }
                    >
                        {part}
                    </span>
                ))}
            </>
        );
    };

    return (
        <div className="autocomplete__container">
            <label>Historical Figures Search</label>
            <input
                type="text"
                onChange={handleAutocompleteChange}
                value={autocompleteValue}
            />
            {error && <p className="autocomplete__error">{error}</p>}
            {isLoading && <p>Loading...</p>}
            <ul className="autocomplete__suggestions">
                {suggestions.map((item, index) => (
                    <li
                        className={'autocomplete__suggestions-item'}
                        key={index}
                        onClick={() => handleSuggestionSelect(item)}
                    >
                        {getHighlightedText(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
};
