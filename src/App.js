import React, { Component } from 'react';
import './App.css';
import { Row, Col, Modal, Icon} from 'antd';
import Iframe from './components/Iframe';
import InputText from './components/InputText';
// import { crypto } from 'crypto';

var chatSocket;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      messageArr: [],
      id: '',
      ModalText: 'The Heroku server has terminated the connection, would you like to reconnect?',
      visible: false,
      confirmLoading: false,
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
    this.eachConn();
  }

  handleOk = () => {
    this.setState({
      ModalText: 'Re-connecting to the Heroku server...',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.eachConn();
      this.setState({
        visible: false,
        confirmLoading: false,
        ModalText: 'The Heroku server has terminated the connection, would you like to reconnect?'
      });
    }, 2000);
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }

  sendMessage=(message)=>{
    try{
      chatSocket.send(JSON.stringify({
        'message': message,
        'id': this.state.id
      }));
    }
    catch(e){
      console.log(e);
      this.setState({
        visible: true,
      });
    }
  }

  eachConn=()=>{
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

    chatSocket.onclose=(e)=>{
      console.error('Chat socket closed unexpectedly');
      this.setState({
        visible: true,
      });
    };
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
        <Modal
          title="Notice"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{this.state.ModalText}</p>
        </Modal>
        <Row className="blank">
        </Row>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <InputText sendMessage={this.sendMessage}></InputText>
          </Col>
        </Row>
        <div style={{height:'20px'}}></div>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <Row>
              <Col xs={{ span: 22, offset: 1}}><Icon type="user" />Ethan Wang</Col>
            </Row>
            <Row>
              <Col xs={{ span: 22, offset: 1}}><Icon type="mail" />wyynzmail@gmail.com</Col>
            </Row>
            <Row>
              <Col xs={{ span: 22, offset: 1}}><Icon type="tags" />React, Ant, Ant Motion, WebSocket, Django, Django-Channels, Redis, Heroku</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
