const initialState = {
    playlist:null,
    pending_playlist:[]
};

export default (state = initialState, action) => {
    const {payload, type} = action;
    
    switch(type) {
        case 'FETCH_PLAYLIST':
            //important
            return {...state, playlist: payload.items}
        break;

        case 'FETCH_PLAYLIST_PENDING':
            return {...state, pending_playlist: state.pending_playlist.concat(payload) }
        
        default:
            break;
    }

    return state;
}