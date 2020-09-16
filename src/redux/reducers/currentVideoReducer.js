import { SET_CURRENT_VIDEO, TOGGLE_CURRENT_VIDEO_FETCHING_STATE,SET_COMMENTS } from '../actionTypes'
const initialState = {
    video: null,
    isFetchingCurrentVideo: false,
    comments:null
}

const currentVideoReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_CURRENT_VIDEO:
            return { ...state, video: payload }
        case TOGGLE_CURRENT_VIDEO_FETCHING_STATE:
            return { ...state, isFetchingCurrentVideo: !state.isFetchingCurrentVideo }
        case SET_COMMENTS:
            return {...state, comments:payload}
        default:
            return state
    }
}
export default currentVideoReducer