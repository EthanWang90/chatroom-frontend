import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'antd';
import Button from 'antd/lib/button';
import Iframe from './components/Iframe';
import InputText from './components/InputText';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row className="blank">
        </Row>
        <Row className="firstRow">
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <Iframe></Iframe>
          </Col>
        </Row>
        <Row className="blank">
        </Row>
        <Row>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <InputText></InputText>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
