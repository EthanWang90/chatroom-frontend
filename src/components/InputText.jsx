import React from 'react';
import { Input } from 'antd';
import { Row, Col } from 'antd';
import { Button } from 'antd';

const { TextArea } = Input;

export default class InputText extends React.Component{
    render(){
        return(
            <Row>
                <Col xs={20}>
                    <TextArea rows={3}></TextArea>
                </Col>
                <Col xs={4}>
                    <Button type="primary" size={"large"} style={{height:"73px"}}>Send</Button>
                </Col>
            </Row>
        )
    }
}