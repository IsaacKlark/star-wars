import React, { useState } from 'react';

const CharactersFromUrl = ({ URLs }) => {
    const [characters, setCharacters] = useState([]);
    const [charactersURLs, setCharactersURLs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTypeOfUrl = () => {
        if (URLs[0] && URLs[0].includes('planet')) {
            return 'planets:';
        } else if (URLs[0] && URLs[0].includes('people')) {
            return 'characters:';
        } else if (URLs[0] && URLs[0].includes('starships')) {
            return 'starships:'
        } else if (URLs[0] && URLs[0].includes('vehicles')) {
            return 'vehicles:'
        } else if (URLs[0] && URLs[0].includes('species')) {
            return 'scpecies:'
        } 
    }

    const getCharactersFromURL = async () => {
            const charactersArray = [];
            for (let i = 0; i < URLs.length; i++) {
                const URL = URLs[i];
                const loadedPersons = fetch(URL).then(person => person.json());
                const [persons] = await Promise.all([loadedPersons]);
                charactersArray.push(persons);
            }

            setCharacters(charactersArray);
            setCharactersURLs(URLs);
            setLoading(false);
    }

    if (URLs && charactersURLs !== URLs) {
        getCharactersFromURL();
    }

    if (loading === true) {
        return (
            <div className="opened-film__details">
                <p>
                    {getTypeOfUrl()}
                </p>
                <p className="opened-film__loading">
                    ...Loading
                </p>
            </div>
        )
    }

    return (
        <div className="opened-film__details">
            <p>
                {getTypeOfUrl()}
            </p>
            <ul>
                {
                    characters.map((character, index) => (
                        <li key= {character.name}>
                            {character.name}
                            {index === characters.length - 1 ? "." : ","}
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default CharactersFromUrl;