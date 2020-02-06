export const setErrorOfLoading = errorOfLoad => ({
    type: "ERROR_OF_LOAD",
    errorOfLoad,
});

const getErrorOfLoading = (errorOfLoad = true, action) => {
    switch (action.type) {
        case "ERROR_OF_LOAD":
            return action.errorOfLoad;
        default:
            return errorOfLoad;
    }
}

export default getErrorOfLoading;