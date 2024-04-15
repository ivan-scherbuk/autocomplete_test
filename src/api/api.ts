interface iHistoricalFigure {
    name: string;
    title: string;
}

const DEFAULT_ERROR = 'Something went wrong...';

// fetch suggestions for autocomplete from historical figures API
export const getSuggestions = async (value: string) => {
    try {
        const response = await fetch(
            `${process.env.REACT_APP_API_URL}?name=${value}`,
            {
                method: 'GET',
                headers: {
                    'X-Api-Key': process.env.REACT_APP_API_KEY || '',
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        if (response.ok) {
            if (!data.length) {
                return {
                    suggestions: [],
                    error: 'No data for this search. Please, try another combination',
                };
            } else {
                return {
                    suggestions: data.map(
                        (item: iHistoricalFigure) => item.name
                    ),
                    error: '',
                };
            }
        } else {
            return {
                suggestions: [],
                error: DEFAULT_ERROR,
            };
        }
    } catch (error) {
        return {
            suggestions: [],
            error: DEFAULT_ERROR,
        };
    }
};
