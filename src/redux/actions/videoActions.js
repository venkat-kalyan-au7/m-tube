import Axios from "axios";
import config from "../../config";

const { API_KEY, BASE_URL } = config;

export const fetchTrendingVideos = ({ pageToken = "" }) => async dispatch => {
  dispatch({ type: "CLEAR_VIDEOS" });
  const { data } = await Axios.get(`${BASE_URL}/videos`, {
    params: {
      part: "snippet",
      maxResults: 30,
      key: API_KEY,
      chart: "mostPopular",
      regionCode: "IN",
      pageToken
    }
  });
  dispatch({ type: "SET_VIDEOS", payload: data });
};

export const fetchComments = (videoId, pageToken = "") => async (
  dispatch,
  getState
) => {
  const currentComments = getState().videoState.comments;
  const { data } = await Axios.get(
    `https://www.googleapis.com/youtube/v3/commentThreads`,
    {
      params: {
        part: "snippet,replies",
        videoId,
        key: API_KEY,
        pageToken
      }
    }
  );
  console.log(data);

  // { obj1: "something", items: [1, 2] } => currentComment => Cycle 1
  // { obj1: "mango", items: [3, 4] } => data
  // { obj1: "mango", items: [1, 2, 3, 4] } => newCurrentComments => Cycle 2

  // { obj1: "apples", items: [5, 6]} => data
  // { obj1: "apples", items: [1, 2, 3, 4, 5, 6] } => newCurrentComments? => Cycle 2
  dispatch({
    type: "SET_COMMENTS",
    payload: !currentComments
      ? data
      : { ...data, items: [...currentComments.items, ...data.items] }
  });
};

export const clearComments = () => {
  return { type: "CLEAR_COMMENTS" };
};

export const setSearchQuery = searchQuery => {
  return {
    type: "SET_SEARCH_QUERY",
    payload: searchQuery
  };
};

export const fetchSearchResults = ({
  pageToken = "",
  searchQuery
}) => async dispatch => {
  console.log(searchQuery);
  try {
    const { data } = await Axios.get(`${BASE_URL}/search`, {
      params: {
        part: "snippet",
        maxResults: 30,
        key: API_KEY,
        pageToken: pageToken,
        q: searchQuery
      }
    });
    dispatch({ type: "SET_VIDEOS", payload: data });
  } catch (err) {
    console.error(err);
  }
};


export const clearVideos = () => {
  return {
    type: "CLEAR_VIDEOS"
  };
};

export const createPlaylist = ({parameters}) => async dispatch => {
  console.log('parameters:',parameters);
  let url = "https://www.googleapis.com/youtube/v3/playlists?part=snippet";
  //Important
  let token = localStorage.getItem('accessToken');

  let formData = {
    "snippet": {
      "title": parameters.title,
      "description": parameters.description
    }
  };

  fetch(url, {
    "method":"POST",
    "headers":{
      "Authorization": `Bearer ${token}`,
      "content-type": "application/json"
    },
    "body": JSON.stringify(formData)
  })
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log('Reached here:',data);
    dispatch({
      type: "FETCH_PLAYLIST_PENDING",
      payload:[data]
    });
  }) 
  .catch(function(err){
    console.log('error occured',err);
  })
}

export const fetchPlaylists = ({pageToken=""}) => async dispatch => {
  const {data} = await Axios.get(`${BASE_URL}/playlists`, {
    params: {
      part:"snippet",
      maxResults: 30,
      mine: true,
      key: API_KEY,
      pageToken,
      access_token: localStorage.getItem('accessToken')
    }
  });
  console.log('data playlist:',data);
  dispatch({type:"FETCH_PLAYLIST", payload: data});
  dispatch({type:"SET_LOADER", payload: false});
}
