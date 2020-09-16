import { SET_CURRENT_VIDEO, TOGGLE_CURRENT_VIDEO_FETCHING_STATE, SET_COMMENTS } from '../actionTypes'
import axios from 'axios'
import config from '../../config'
export const fetchVideo = videoid => async disptach => {
    try {
        disptach({ type: TOGGLE_CURRENT_VIDEO_FETCHING_STATE })
        disptach({ type: SET_CURRENT_VIDEO, payload: null })
        let { data } = await axios(
            `${config.BASE_URL}/videos?part=snippet,contentDetails,statistics&key=${config.API_KEY}&id=${videoid}`
        )
        const chnlId = data.items[0].snippet.channelId
        const { data: pictures } = await axios(`${config.BASE_URL}/channels?part=snippet&id=${chnlId},items.id&key=${config.API_KEY}`)
        data.items[0].snippet.channelId = pictures.items[0].snippet.thumbnails.default.url
        disptach({ type: SET_CURRENT_VIDEO, payload: data })
    }
    catch (err) {
        console.error(err)
    }
    finally {
        disptach({ type: TOGGLE_CURRENT_VIDEO_FETCHING_STATE })
    }
}

export const fetchComments = videoid => async disptach => {
    try {
        disptach({ type: TOGGLE_CURRENT_VIDEO_FETCHING_STATE })
        let { data } = await axios(
            `${config.BASE_URL}/commentThreads?part=snippet,replies&key=${config.API_KEY}&videoId=${videoid}`
        )


        disptach({ type: SET_COMMENTS, payload: data })
    }
    catch (err) {
        console.error(err)
    }
    finally {
        disptach({ type: TOGGLE_CURRENT_VIDEO_FETCHING_STATE })
    }
}