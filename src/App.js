import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'antd';
import Button from 'antd/lib/button';
import Iframe from './components/Iframe';
import InputText from './components/InputText';

var chatSocket;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageArr: [1,2,3,4,5]
    }
  }

  componentDidMount(){
    chatSocket = new WebSocket(
      'wss://' + 'shrouded-sea-30945.herokuapp.com' +
      '/ws/chat/' + 'testroom/');

    console.log(chatSocket);

    chatSocket.onmessage=(e)=>{
        var data = JSON.parse(e.data);
        var message = data['message'];
        console.log(message);
        console.log(this.state.messageArr);
        let tmp = [...this.state.messageArr];
        console.log(tmp.push(message));
        this.setState({
          messageArr:tmp,
        },()=>{
          console.log(this.state.messageArr);
        })
        // document.querySelector('#chat-log').value += (message + '\n');
    };

    chatSocket.onclose = function(e) {
      console.error('Chat socket closed unexpectedly');
    };
  }

  sendMessage=(message)=>{
    chatSocket.send(JSON.stringify({
      'message': message
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
