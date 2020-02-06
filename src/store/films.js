export const setFilms = films => ({
    type: 'FILMS',
    films
});

const getFilms = (currentFilms = [], action) => {
    switch (action.type) {
        case 'FILMS':
            return action.films;
        default:
            return currentFilms;
    }
}

export default getFilms;