import React, { Component } from 'react';
import './App.css';
import { Row, Col } from 'antd';
import Iframe from './components/Iframe';
import InputText from './components/InputText';
// import { crypto } from 'crypto';

var chatSocket;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageArr: [],
      id: ''
    }
  }

  randomStr=(len)=>{
    var str = '';
    var dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-';
    for(var i = 0;i < len;i++){
      var index = Math.floor(Math.random()*dict.length);
      str += dict[index];
    }
    return str;
  }

  componentWillMount(){
    let str = this.randomStr(8);
    this.setState({
      id: str
    })
  }

  componentDidMount(){

    chatSocket = new WebSocket(
      'wss://' + 'shrouded-sea-30945.herokuapp.com' +
      '/ws/chat/' + 'testroom/');

    chatSocket.onmessage=(e)=>{
        let myWord = false;
        var data = JSON.parse(e.data);
        var message = data['message'];
        var id = data['id'];
        if(id === this.state.id){
          myWord = true;
        }
        let tmp = [...this.state.messageArr];
        let obj = {
          'message': message,
          'myWord': myWord
        }
        tmp.push(obj);
        this.setState({
          messageArr:tmp,
        })
        // document.querySelector('#chat-log').value += (message + '\n');
    };

    chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };
  }

  sendMessage=(message)=>{
    chatSocket.send(JSON.stringify({
      'message': message,
      'id': this.state.id
    }));
  }

  render() {
    return (
      <div className="App">
        <Row className="blank">
        </Row>
        <Row className="firstRow">
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <Iframe messageArr={this.state.messageArr}></Iframe>
          </Col>
        </Row>
        <Row className="blank">
        </Row>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <InputText sendMessage={this.sendMessage}></InputText>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
