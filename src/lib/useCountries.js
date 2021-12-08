const { useState, useEffect } = require("react");

export const useCountries = () => {
    const [countries, setCountries] = useState(null);
    const url = `https://restcountries.com/v3.1/all`;

    useEffect(() => {
        fetch(url)
            .then((resp) => resp.json())
            .then(setCountries);
    }, [url]);
    return countries;
};
