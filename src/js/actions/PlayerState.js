import {
    FORWARD,
    PLAY_PAUSE,
    PLAYBACK_INIT, PLAYBACK_RATE,
    PLAYBACK_STATE,
    PLAYBACK_TRACK,
    PLAYBACK_TRACK_ID,
    PLAYBACK_UPDATE, PLAYER_NONE, PLAYER_PAUSE, PLAYER_PLAY, PLAYER_STOP, REPLAY, RESET_AND_PLAY_TRACK, SET_RATE,
    SETUP_PLAYER, SKIP_TO_NEXT, SKIP_TO_PREVIOUS
} from "./ActionConstants";
import TrackPlayer, {
    CAPABILITY_PAUSE,
    CAPABILITY_PLAY,
    CAPABILITY_SKIP_TO_NEXT,
    CAPABILITY_SKIP_TO_PREVIOUS
} from "react-native-track-player";



function action(type, payload = {}) {
    return {type, ...payload}
}


export const setupPlayer = () => {
    return dispatch => {
        TrackPlayer.setupPlayer().then(async () => {
            await TrackPlayer.updateOptions({
                capabilities: [CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS],
                compactCapabilities: [CAPABILITY_PLAY, CAPABILITY_PAUSE, CAPABILITY_SKIP_TO_NEXT, CAPABILITY_SKIP_TO_PREVIOUS],
                stopWithApp: true
            });

            dispatch({
                type: SETUP_PLAYER,
                payload: true
            })
        });

    }
}
export const playbackInit = () => action(PLAYBACK_INIT)
export const playbackState = state => action(PLAYBACK_STATE, {state})
export const playbackTrackId = trackId => action(PLAYBACK_TRACK_ID, {trackId})
export const playbackTrack = track => action(PLAYBACK_TRACK, {track})
export const playbackUpdate = () => action(PLAYBACK_UPDATE)

export const resetAndPlayTrack = (tracks, track) => action(RESET_AND_PLAY_TRACK, {tracks, track})
export const playPause = (state) => {return {
    type: PLAY_PAUSE,
    payload: state
}; };


export const stop = () => {
    return dispatch => {
        TrackPlayer.stop();
        dispatch({
            type: PLAYER_STOP,
            payload: {
                isPlaying: false,
                isStopped: true,
                isNextTrackChanged : false,
                isPreviousTrackChanged: false
            }
        })
    }
}

export const play = (track) => {
    return async dispatch => {
        await TrackPlayer.reset();
        await TrackPlayer.add(track)
        await TrackPlayer.getQueue().then(queue => {
            console.log("que==="+JSON.stringify(queue))
            TrackPlayer.play();
            dispatch({
                type: PLAYER_PLAY,
                payload: {
                    isPlaying: true,
                    isStopped: false,
                    isNextTrackChanged : false,
                    isPreviousTrackChanged: false
                }
            })
        })

    }
}

export const addTrack = (track) => {
    return dispatch => {
        TrackPlayer.reset();
        TrackPlayer.add(track)
        TrackPlayer.play();
        dispatch({
            type: PLAYER_PLAY,
            payload: {
                isPlaying: true,
                isStopped: false,
                isNextTrackChanged : false,
                isPreviousTrackChanged: false
            }
        })
    }
}

export const pause = () => {
    return dispatch => {
        TrackPlayer.pause();
        dispatch({
            type: PLAYER_PAUSE,
            payload: {
                isPlaying: false,
                isStopped: false,
                isNextTrackChanged : false,
                isPreviousTrackChanged: false
            }
        })
    }
}

export const noneState = () => {
    return dispatch => {
        // TrackPlayer.S();
        dispatch({
            type: PLAYER_NONE,
            payload: {
                isPlaying: false,
                isStopped: false,
                isNextTrackChanged : false,
                isPreviousTrackChanged: false
            }
        })
    }
}

export const skipToPrevious = () => {
    return async dispatch => {
        TrackPlayer.skipToPrevious()
        dispatch({
            type: SKIP_TO_PREVIOUS,
            payload:  {
                isPlaying: true,
                isStopped: false,
                isNextTrackChanged : false,
                isPreviousTrackChanged: true
            }
        })
        /*TrackPlayer.pause();
        await TrackPlayer.getQueue().then((queue) => {
            console.log("currentTrack====="+JSON.stringify(queue))
        if(queue.length === 1) {
            //queue has single track
            TrackPlayer.stop()
            TrackPlayer.play()
                dispatch({
                    type: SKIP_TO_PREVIOUS,
                    payload:  {
                        isPlaying: true,
                        isStopped: false,
                        isNextTrackChanged : false,
                        isPreviousTrackChanged: false
                    }
                })
        } else if(queue.length > 1) {
            //queue has more than one track
            TrackPlayer.getCurrentTrack().then(current_track => {
                for(let i=0; i<queue.length; i++) {
                    if(queue[i].id === current_track.id) {
                        if(i !== 0) {
                            //queue current track is greater than 0th index
                            TrackPlayer.skipToPrevious()
                                dispatch({
                                    type: SKIP_TO_PREVIOUS,
                                    payload:  {
                                        isPlaying: true,
                                        isStopped: false,
                                        isNextTrackChanged : false,
                                        isPreviousTrackChanged: true
                                    }
                                })
                        } else {
                            //queue current track is 0th index

                            dispatch(stop())
                        }
                    }
                }
            })
        } else {
            dispatch(noneState())
        }
    })*/

    }
}


export const skipToNext = () => {
    return async dispatch => {
        TrackPlayer.skipToNext()
        dispatch({
            type: SKIP_TO_NEXT,
            payload:  {
                isPlaying: true,
                isStopped: false,
                isNextTrackChanged : true,
                isPreviousTrackChanged: false
            }
        })
        /*TrackPlayer.pause()
        await TrackPlayer.getQueue().then((queue) => {
        if(queue.length === 1) {
            //queue has single track
            TrackPlayer.stop()
            TrackPlayer.play()

            dispatch({
                    type: SKIP_TO_NEXT,
                    payload:  {
                        isPlaying: true,
                        isStopped: false,
                        isNextTrackChanged : false,
                        isPreviousTrackChanged: false
                    }
                })
        } else if(queue.length > 1) {
            //queue has more than one track
            TrackPlayer.getCurrentTrack().then(current_track => {
                for(let i=0; i<queue.length; i++) {
                    if(queue[i].id === current_track.id) {
                        if(i !== queue.length -1) {
                            //queue current track is greater than 0th index
                            TrackPlayer.skipToNext()
                            dispatch({
                                    type: SKIP_TO_NEXT,
                                    payload:  {
                                        isPlaying: true,
                                        isStopped: false,
                                        isNextTrackChanged : true,
                                        isPreviousTrackChanged: false
                                    }
                                })
                        } else {
                            //queue current track is 0th index
                                dispatch(stop())
                        }
                    }
                }
            })
        } else {
            dispatch(noneState())
        }
    })*/
    }
}

export const replay = () => action(REPLAY)
export const forward = () => action(FORWARD)
export const setRate = () => action(SET_RATE)
export const playbackRate = rate => action(PLAYBACK_RATE, {rate})