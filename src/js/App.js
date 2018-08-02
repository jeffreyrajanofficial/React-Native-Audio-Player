/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Player from "./views/Player";
import {Provider} from "react-redux";
import storeConfig from "../configuration/storeConfig";

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Provider store={storeConfig}>
                <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                    <Player />
                </View>
            </Provider>
        );
    }
}
