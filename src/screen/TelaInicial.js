import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image, 
  StatusBar, 
  Alert
} from 'react-native'
import restart_icon from '../assets/restart_icon.png';
import config_icon from '../assets/config_icon.png';
import pause_icon from '../assets/pause_icon.png';
import play_icon from '../assets/play_icon.png';
import sound_icon from '../assets/sound_icon.png';
import nosound_icon from '../assets/nosound_icon.png';
import whiteplayerimg from  '../assets/whiteplayer.png';
import blackplayerimg from  '../assets/blackplayer.png';
const Sound = require('react-native-sound');
import clock_sound from '../assets/clock.mp3';
import finish_sound from '../assets/finish.mp3';
import pass_turn_sound from '../assets/pass_turn.mp3';

export default class Inicio extends Component {
  stopDisable = true;
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      minutes_Counter: '10',
      seconds_Counter: '00',
      timer2: null,
      minutes_Counter2: '10',
      seconds_Counter2: '00',
      startDisable: false,
      playDisable: false,
      playDisable2: true,
      soundDisable: false,
    }
    this.onButtonPlay = this.onButtonPlay.bind(this);
  }
  
  componentDidMount(){
    this.clocksound = new Sound(clock_sound, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    this.finishsound = new Sound(finish_sound, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
    this.pass_turn = new Sound(pass_turn_sound, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
    clearInterval(this.state.timer2);
  }
onSound = () => {
  if(this.state.soundDisable == false){
    this.setState({soundDisable: true})
  }else{
    this.setState({soundDisable: false})
  }
}
  onButtonRestart= () => {  
    this.setState({playDisable: false})
    this.setState({playDisable2: false})
    clearInterval(this.state.timer);
    clearInterval(this.state.timer2);
    this.setState({
      timer: null,
      timer2: null,
      minutes_Counter: '10',
      seconds_Counter: '00',
      minutes_Counter2: '10',
      seconds_Counter2: '00',
    });
  }
  
  onButtonPlay = (player) => {
    if(this.state.soundDisable==false){
      this.pass_turn.play((success) => {
        if (!success) {
          console.log('Erro')
        }
      })
    }
    if(player==1){
      this.setState({playDisable: true});
      this.setState({playDisable2: false});
      clearInterval(this.state.timer);
      let timer2 = setInterval(() => {
        if(this.state.seconds_Counter2=='00' && this.state.minutes_Counter2=='00'){
          if(this.state.soundDisable==false){
            this.finishsound.play((success) => {
              if (!success) {
                console.log('Erro')
              }
            })
          }
          Alert.alert('Chess Timer', 'Peças pretas ganharam');
          this.setState({playDisable: false})
          this.setState({playDisable2: false})
          clearInterval(this.state.timer);
          clearInterval(this.state.timer2);
          this.setState({
            timer: null,
            timer2: null,
            minutes_Counter: '10',
            seconds_Counter: '00',
            minutes_Counter2: '10',
            seconds_Counter2: '00',
          });
         }else{
          
        if(this.state.soundDisable==false){
          this.clocksound.play((success) => {
            if (!success) {
              console.log('Erro')
            }
          })
        }
        var num = (Number(this.state.seconds_Counter2) - 1).toString(),
                  count = this.state.minutes_Counter2;
        if (Number(this.state.seconds_Counter2) == 0) {
          count = (Number(this.state.minutes_Counter2) - 1).toString();
          num = '59';
        }
        this.setState({
          minutes_Counter2: count.length == 1 ? '0' + count : count,
          seconds_Counter2: num.length == 1 ? '0' + num : num
        }); 
        }
      }, 1000);
      this.setState({ timer2 });      
    }else{
      this.setState({playDisable2: true});
      this.setState({playDisable: false});
      clearInterval(this.state.timer2);
      
      let timer = setInterval(() => {
        
     if(this.state.seconds_Counter=='00' && this.state.minutes_Counter=='00'){
      if(this.state.soundDisable==false){
        this.finishsound.play((success) => {
          if (!success) {
            console.log('Erro')
          }
        })
      }
      Alert.alert('Chess Timer', 'Peças brancas ganharam');
      this.setState({playDisable: false})
      this.setState({playDisable2: false})
      clearInterval(this.state.timer);
      clearInterval(this.state.timer2);
      this.setState({
        timer: null,
        timer2: null,
        minutes_Counter: '10',
        seconds_Counter: '00',
        minutes_Counter2: '10',
        seconds_Counter2: '00',
      });
     }else{
      if(this.state.soundDisable==false){
        this.clocksound.play((success) => {
          if (!success) {
            console.log('Erro')
          }
        })
      }
      var num = (Number(this.state.seconds_Counter) - 1).toString(),
                count = this.state.minutes_Counter;
      if (Number(this.state.seconds_Counter) == 0) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = '59';
      }
      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });
     }
        
      }, 1000);
      this.setState({ timer });
    }
  }

  onButtonConfig = () => {
    Alert.alert("Chess Timer", "Soon...");
  }
  render() {
    return (
      <> 
        <StatusBar hidden={true} />
        <View style={styles.MainContainer}>
          <TouchableOpacity onPress={e=> {this.onButtonPlay(2,e)}} style={styles.view_j1} disabled={this.state.playDisable2}> 
            <Text style={styles.text_time_p1}>{this.state.minutes_Counter2} : {this.state.seconds_Counter2}</Text>
            <Image
                style={styles.imgwhite}
                source={whiteplayerimg}
            />
          </TouchableOpacity>  
          <View style={styles.view_actions}>

            <TouchableOpacity onPress={this.onButtonRestart}>
              <Image
                style={styles.icons}
                source={restart_icon}
              />
            </TouchableOpacity>

         

            <TouchableOpacity onPress={this.onSound}>
              <Image
              style={styles.icons}
              source={this.state.soundDisable ? nosound_icon : sound_icon}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.onButtonConfig}>
              <Image
              style={styles.icons}
              source={config_icon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={e=> {this.onButtonPlay(1,e)}} style={styles.view_j2} disabled={this.state.playDisable}> 
            <Image
                style={styles.imgblack}
                source={blackplayerimg}
            /> 
            <Text style={styles.text_time_p2}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  MainContainer: {
    flex: 5,
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imgblack:{
    width: 40,
    height: 40,
  },
  imgwhite:{
    width: 40,
    height: 40,
    transform: [
      { rotateX: '180deg' },
      {rotateY: '180deg'}
    ]
  },
  view_actions:{
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  icons:{
    margin: 20,
    width: 50,
    height: 50,
  },
  iconsound:{
    width: 50,
    height: 50,
    backgroundColor: "#ffb3b3",
  },
  text_time_p1:{
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
    color: '#FFF',
    transform: [
      { rotateX: '180deg' },
      {rotateY: '180deg'}
    ]
  },
  text_time_p2:{
    fontSize: 60,
    textAlign: "center",
    fontWeight: "bold",
    color: '#FFF',
  },
  view_j1:{
    width: "100%",
    height: 200,
    backgroundColor: "#ffb3b3",
    justifyContent: "center",
    alignItems: "center",
  },
  view_j2:{
    width: "100%",
    height: 200,
    backgroundColor: "#ff9933",
    justifyContent: "center",
    alignItems: "center",
  }
});

/*

transform: [
      { rotateX: '180deg' },
      {rotateY: '180deg'}

    ]*/
