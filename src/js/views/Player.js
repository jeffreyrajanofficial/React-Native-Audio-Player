import React from 'react';
import {Text, Dimensions, View, ActivityIndicator, Button, StyleSheet} from "react-native";
import {connect} from "react-redux";
import ProgressBar from "../components/ProgressBar";
import MediaController from "../components/MediaController";
import {setupPlayer, play, pause} from "../actions";

const {width} = Dimensions.get('window')

class Player extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isPlaying: false
        };

        this.props.setupPlayer();


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isPlaying: nextProps.playerController.isPlaying
        })
    }

    onPauseClicked = () => {
        this.props.pause()
    };

    onPlayClicked = async () => {
        await this.props.play({
            id: 10,
            url: {uri: 'https://geekanddummy.com/wp-content/uploads/2014/02/ambient-noise-server-room.mp3'},
            title: 'Title',
            artist: 'Artist',
        })
    };


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Audio
                </Text>
                <ProgressBar/>

                <MediaController
                    onPlayButton={() => this.onPlayClicked()}
                    onPauseButton={() => this.onPauseClicked()}
                    isPlaying={this.state.isPlaying}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
const mapStateToProps = (state) => {
    return {
        playerController: state.PlayerStateReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setupPlayer: () => dispatch(setupPlayer()),
        play: (track) => dispatch(play(track)),
        pause: () => dispatch(pause())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)