import React from 'react';
import Message from './Message';
import { Card } from 'antd';
import {Row, Col} from 'antd';

export default class Iframe extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            messageArr: [],
        }
    }

    componentWillMount(){
        console.log(this.props.messageArr)
        this.setState({
            messageArr: this.props.messageArr,
        })
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
    }

    componentDidUpdate(){
        this.scrollToBottom();
    }

    render(){
        return(
            <div className="scrollable-container">
                {
                    this.props.messageArr.map((value,index)=>{
                        return (
                            <div key={index}>
                                <Row>
                                    {
                                        value['myWord']?(
                                            <Col xs={{span:8, offset:14}}>
                                                <Card size={'small'} bordered={false} style={{backgroundColor:"lightblue", height:"auto", width:"auto", wordWrap:'break-word', overflow:'hidden'}}>
                                                    <p>{value['message']}</p>
                                                </Card>
                                            </Col>
                                        ):(
                                            <Col xs={{span:8, offset:2}}>
                                                <Card size={'small'} bordered={false} style={{backgroundColor:"lightgreen", height:"auto", width:"auto", wordWrap:'break-word', overflow:'hidden'}}>
                                                    <p>{value['message']}</p>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>
                                <div style={{height:"20px"}}></div>
                            </div>
                        )
                    })
                }
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </div>
        )
    }
}