import TrackPlayer from 'react-native-track-player'

import {
    playbackState,
    playbackTrackId,
    replay,
    forward,
    skipToPrevious,
    skipToNext, playPause, noneState, stop, play, pause
} from '../../js/actions';
import {PLAYER_PAUSE, PLAYER_PLAY, PLAYER_STOP, SKIP_TO_NEXT, SKIP_TO_PREVIOUS} from "../../js/actions/ActionConstants";

async function eventHandler(store, data) {
    console.log("type======"+JSON.stringify(data));
    switch (data.type) {
        // forward remote events to the player
        case 'remote-play':
            //store.dispatch(play());
            TrackPlayer.play()
            store.dispatch({
                type: PLAYER_PLAY,
                payload: {
                    isPlaying: true,
                    isStopped: false,
                    isNextTrackChanged : false,
                    isPreviousTrackChanged: false
                }
            })
            break;
        case 'remote-pause':
            // store.dispatch(pause());
            TrackPlayer.pause()
            store.dispatch({
                type: PLAYER_PAUSE,
                payload: {
                    isPlaying: false,
                    isStopped: false,
                    isNextTrackChanged : false,
                    isPreviousTrackChanged: false
                }
            })
            break;
        case 'remote-stop':
            // store.dispatch(stop());
            TrackPlayer.stop()
            dispatch({
                type: PLAYER_STOP,
                payload: {
                    isPlaying: false,
                    isStopped: true,
                    isNextTrackChanged : false,
                    isPreviousTrackChanged: false
                }
            })
            break;
        case 'remote-next':
            // store.dispatch(skipToNext());
            TrackPlayer.skipToNext()
            store.dispatch({
                type: SKIP_TO_NEXT,
                payload:  {
                    isPlaying: true,
                    isStopped: false,
                    isNextTrackChanged : true,
                    isPreviousTrackChanged: false
                }
            })
            break;
        case 'remote-previous':
            // store.dispatch(skipToPrevious())
            TrackPlayer.skipToPrevious()
            store.dispatch({
                    type: SKIP_TO_PREVIOUS,
                    payload:  {
                        isPlaying: true,
                        isStopped: false,
                        isNextTrackChanged : false,
                        isPreviousTrackChanged: true
                    }
                })
            break;
        /*case 'remote-seek':
            TrackPlayer.seekTo(data.position)
            break
        case 'remote-jump-backward':
            store.dispatch(replay())
            break;
        case 'remote-jump-forward':
            store.dispatch(forward())
            break;

        // make ducking smoother by adding a fade in/out
        case 'remote-duck':
            TrackPlayer.setVolume(data.ducking ? 0.5 : 1)
            break;*/

        // playback updates
        case 'playback-state':
            // Player State
            // TrackPlayer.STATE_NONE 0
            // TrackPlayer.STATE_PLAYING 3
            // TrackPlayer.STATE_PAUSED 2
            // TrackPlayer.STATE_STOPPED 1
            // TrackPlayer.STATE_BUFFERING 6
            console.log("State========"+data.state)
            switch (data.state) {
                case 0:
                    store.dispatch(noneState())
                    break
                case 1:
                    store.dispatch({
                        type: PLAYER_STOP,
                        payload: {
                            isPlaying: false,
                            isStopped: true,
                            isNextTrackChanged : false,
                            isPreviousTrackChanged: false
                        }
                    })
                    break
                case 2:
                    store.dispatch({
                        type: PLAYER_PAUSE,
                        payload: {
                            isPlaying: false,
                            isStopped: false,
                            isNextTrackChanged : false,
                            isPreviousTrackChanged: false
                        }
                    })
                    break
                case 3:
                    store.dispatch({
                        type: PLAYER_PLAY,
                        payload: {
                            isPlaying: true,
                            isStopped: false,
                            isNextTrackChanged : false,
                            isPreviousTrackChanged: false
                        }
                    })
                    break
                case 6:
                    store.dispatch({
                        type: PLAYER_PLAY,
                        payload: {
                            isPlaying: true,
                            isStopped: false,
                            isNextTrackChanged : false,
                            isPreviousTrackChanged: false
                        }
                    })
                    break
            }
            store.dispatch(playbackState(data.state))
            break;
        case 'playback-track-changed':
            //store.dispatch(playbackTrackId(data.nextTrack));
            break;
        case 'playback-error':

            //Alert.alert(data.error);
            break

        case 'playback-queue-ended':
            store.dispatch(noneState());
            break
        case 'playback-unbind':
            store.dispatch(noneState());
            break
    }
}

export default function (store) {
    return eventHandler.bind(null, store)
}
