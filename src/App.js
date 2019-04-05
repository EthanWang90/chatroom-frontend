import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Row, Col } from 'antd';
import Button from 'antd/lib/button';
import Iframe from './components/Iframe'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row>
          <Col xs={{ span: 22, offset: 1 }} sm={{ span: 8, offset: 8 }}>
            <Iframe></Iframe>
          </Col>
        </Row>
        <Row>
          <Button type="primary">Button</Button>
        </Row>
      </div>
    );
  }
}

export default App;
