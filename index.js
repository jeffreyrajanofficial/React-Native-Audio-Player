import { AppRegistry, Platform } from 'react-native';
import App from './src/js/App';

import TrackPlayer from 'react-native-track-player';
import createEventHandler from './src/common/utils/event-handler'
import storeConfig from "./src/configuration/storeConfig";

AppRegistry.registerComponent('AudioPlayer', () => App);

if (Platform.OS === 'ios') {
    TrackPlayer.registerEventHandler(createEventHandler(storeConfig)) // ios event handler
} else {
    AppRegistry.registerHeadlessTask('TrackPlayer', () => createEventHandler(storeConfig)) // android event handler
}
