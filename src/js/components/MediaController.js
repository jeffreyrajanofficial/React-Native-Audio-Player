import React, {Component} from 'react';
import {TouchableOpacity, View, Image} from "react-native";


export default class MediaController extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                {!this.props.isPlaying ?
                    <TouchableOpacity onPress={this.props.onPlayButton}>
                        <Image source={require('../../assets/baseline_play_arrow_black_18dp.png')}
                               style={{width: 50, height: 50}} resizeMode='cover'/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={this.props.onPauseButton}>
                        <Image source={require('../../assets/baseline_pause_black_18dp.png')}
                               style={{width: 50, height: 50}} resizeMode='cover'/>
                    </TouchableOpacity>}
            </View>
        )
    }
}