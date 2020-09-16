const initialState = {
    loader: null
};

export default (state = initialState, action) => {
    const {payload, type} = action;

    if(type === "SET_LOADER") {
        return {...state, loader: payload}
    }

    return state;
}