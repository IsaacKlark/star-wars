export const setCopyFilms = copyFilms => ({
    type: 'COPYFILMS',
    copyFilms
});

const getCopyFilms = (currentCopyFilms = [], action) => {
    switch (action.type) {
        case 'COPYFILMS':
            return action.copyFilms;
        default:
            return currentCopyFilms;
    }
}

export default getCopyFilms;