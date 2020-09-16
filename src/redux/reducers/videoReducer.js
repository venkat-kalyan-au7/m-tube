const initialState = {
  videos: null,
  comments: null,
  isFetching: false,
  searchQuery: ""
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  if (type === "SET_VIDEOS") {
    return { ...state, videos: payload };
  }

  if (type === "CLEAR_VIDEOS") {
    return { ...state, videos: null };
  }

  if (type === "SET_COMMENTS") {
    return { ...state, comments: payload };
  }

  if (type === "CLEAR_COMMENTS") {
    return { ...state, comments: null };
  }

  if (type === "SET_SEARCH_QUERY") {
    return { ...state, searchQuery: payload };
  }

  if (type === "TOGGLE_FETCHING") {
    return { ...state, isFetching: !state.isFetching };
  }
  return state;
};
