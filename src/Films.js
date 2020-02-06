import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as storeFuncs from './store/store';
import ErroOfLoading from './ErrorOfLoading';
import { Link, useLocation, useHistory } from 'react-router-dom';

const Films = ({ 
  getURL, 
  films, 
  loadError, 
  getLoading, 
  copyFilms, 
  search 
}) => {
  const location = useLocation();
  const history = useHistory();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    getURL();
  }, [])

  const setURLParams = (title) => {
    searchParams.set('film', title);
    setTimeout(() => {
      history.push({ search: searchParams.toString() });
    }, 0)
  }

  const searchFilms = (e) => {
    const filteredFilms = [...films].filter(film => {
      return film.title.toLowerCase().includes(e.target.value);
    });

    search(filteredFilms);
  }

  const sortFilms = () => {
    search([...films].sort((a, b) => {
      if (copyFilms[0].title > copyFilms[1].title) {
        if (a.title > b.title) {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (a.title > b.title) {
          return -1;
        } else {
          return 1;
        }
      }
    }));
  }

  if (loadError) {
    return <ErroOfLoading />
  }

  if (getLoading) {
    return <h1 className="loading">...LOADING</h1>
  }

    return (
      <>
        <h1 className="starwars__h1">
            STARWARS FILMS
        </h1>

        <ul className="films__ul">
          <li>
            <form action="" className="films__form">
              <input 
                type="text" 
                placeholder="...search" 
                className="films__input"
                onChange={searchFilms}
              />
              <button 
                type="button" 
                className="films__button"
                onClick={sortFilms}
              > 
                sort by name
              </button>
            </form>
          </li>
          {
            copyFilms.map(film => {
              return (
                <li key={film.episode_id}>
                  <Link 
                    to="/film"
                    className="films__a"
                    onClick={() => setURLParams(film.title)}
                  >
                    {film.title}
                  </Link>
                </li>
              )
            })
          }
        </ul>
      </>
    );
}

const storesFuncs = {
  getURL: storeFuncs.getURL,
  search: storeFuncs.search
}
  
const getAPI = state => ({
  films: state.films,
  copyFilms: state.copyFilms,
  loadError: state.loadError,
  getLoading: state.loading
})

export default connect(getAPI, storesFuncs)(Films);