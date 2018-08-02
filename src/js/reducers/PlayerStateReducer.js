import {
    PLAY_PAUSE,
    PLAYER_NONE,
    PLAYER_PAUSE,
    PLAYER_PLAY,
    PLAYER_STOP,
    SETUP_PLAYER, SKIP_TO_NEXT, SKIP_TO_PREVIOUS
} from "../actions/ActionConstants";


const initialState = {
    isPlaying: false,
    isStopped: false,
    isNextTrackChanged : false,
    isPreviousTrackChanged: false,
    onPlayerReady: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SETUP_PLAYER:
            return {
                ...state,
                onPlayerReady: true
            };

        case PLAYER_PLAY:
        case PLAYER_PAUSE:
        case PLAYER_NONE:
        case SKIP_TO_PREVIOUS:
        case SKIP_TO_NEXT:
        case PLAYER_STOP:
            return {
                ...state,
                ...action.payload
            };


        default:
            return state;
    }
}
