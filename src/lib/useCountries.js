const { useState, useEffect } = require("react");

export const useCountries = () => {
    const [countries, setCountries] = useState(null);
    const url = `https://restcountries.com/v3.1/all`;

    useEffect(() => {
        try {
            fetch(url)
                .then((resp) => resp.json())
                .then(setCountries);
        } catch (e) {
            console.error(e);
        }
    }, [url]);
    return countries;
};
