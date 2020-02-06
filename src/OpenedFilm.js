import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import CharactersFromUrl from './CharactersFromUrl';
import * as storeFuncs from './store/store';

const OpenedFilm = ({ films, getURL }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const filteredFilm = films.filter(film => (
        film.title === searchParams.get('film')
    ));

    useEffect(() => {
        getURL();
    }, [])

    return (
        <div className="opened-film">
            <Link to="/" className="opened-film__back">
                Back
            </Link>
            {filteredFilm.map(film => (
                <section 
                    className="opened-film__section" 
                    key={film.episode_id}
                >
                    <h2 className="opened-film__title">
                        {film.title}
                    </h2>
                    <p className="opened-film__crawl">
                        {film.opening_crawl}
                    </p>
                    <div className="opened-film__authors-and-date">
                        <p className="opened-film__create-info">
                            director: {film.director}
                        </p>
                        <p className="opened-film__create-info">
                            producer: {film.producer}
                        </p>
                        <p className="opened-film__create-info">
                            release date: {film.release_date}
                        </p>
                    </div>
                    <CharactersFromUrl URLs={filteredFilm[0].characters}/>
                    <CharactersFromUrl URLs={filteredFilm[0].planets}/>
                    <CharactersFromUrl URLs={filteredFilm[0].starships}/>
                    <CharactersFromUrl URLs={filteredFilm[0].species}/>
                    <CharactersFromUrl URLs={filteredFilm[0].vehicles}/>
                </section>
            ))}
        </div>
    )
}

const getAPI = state => ({
    films: state.films,
})

const storesFuncs = {
    getURL: storeFuncs.getURL,
  }

export default connect(getAPI, storesFuncs)(OpenedFilm);