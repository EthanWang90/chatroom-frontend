import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';
import { timeout } from 'q';

const { TextArea } = Input;

export default class InputText extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            value: '',
        }
    }
    changeTest=(event)=>{
        console.log(event.target.value);
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
            <Row gutter={16}>
                <Col xs={20}>
                    <TextArea rows={3} onChange={this.changeTest}>{this.state.value}</TextArea>
                </Col>
                <Col xs={4}>
                    <Button onClick={()=>{this.clickTest();}} type="primary" size={"large"} style={{height:"73px"}}>Send</Button>
                </Col>
            </Row>
        )
    }
}