import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import getFilms, { setFilms } from './films';
import getCopyFilms, { setCopyFilms } from './copyFilms';
import getErrorOfLoading, { setErrorOfLoading } from './errorOfLoading';
import getLoading, {setLoading} from './loading';

const rootReducer = combineReducers({
    films: getFilms,
    copyFilms: getCopyFilms,
    loadError: getErrorOfLoading,
    loading: getLoading,
});

export const search = (value) => dispatch => {
    dispatch(setCopyFilms(value));
}

export const getURL = () => async (dispatch) => {
    try {
        dispatch(setErrorOfLoading(false));
        const URL = 'https://swapi.co/api/films/';
        const loadedFilms = fetch(URL).then(films => films.json());
        const [films] = await Promise.all([loadedFilms])
        dispatch(setFilms(films.results));
        dispatch(setCopyFilms(films.results));
        dispatch(setLoading(false));
    } catch {
        dispatch(setErrorOfLoading(true));
        return false;
    }
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;