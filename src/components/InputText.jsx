import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;

export default class InputText extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
    }
    changeTest=(event)=>{
        this.setState({
            value: event.target.value,
        })
    }

    clickTest=()=>{
        this.props.sendMessage(this.state.value);
        this.setState({
            value: '',
        })
    }

    render(){
        return(
            <Row>
                <Col xs={{span:17, offset:1}}>
                    <TextArea placeholder="Input something here..." value={this.state.value} rows={3} onChange={this.changeTest}></TextArea>
                </Col>
                <Col xs={1}></Col>
                <Col xs={4}>
                    <Button onClick={()=>{this.clickTest();}} type="primary" size={"large"} style={{height:"73px"}}>Send</Button>
                </Col>
            </Row>
        )
    }
}