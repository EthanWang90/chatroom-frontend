import React from 'react';
import {Row, Col, Tag} from 'antd';
import QueueAnim from 'rc-queue-anim';

export default class Iframe extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            messageArr: [],
        }
    }

    componentWillMount(){
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
                <div>
                    <Tag color="cyan">Welcome!</Tag>
                </div>
                <div style={{height:"20px"}}></div>
                {
                    this.props.messageArr.map((value,index)=>{
                        return (
                            <div key={index} style={{fontFamily:"'Carter One', cursive"}}>
                                <Row>
                                    {
                                        value['myWord']?(
                                            <Col xs={{span:8, offset:14}}>
                                                <QueueAnim delay={300} className="queue-simple">
                                                    <div key="a" style={{borderRadius:"5px", backgroundColor:"lightblue", height:"auto",width:"auto", wordWrap:'break-word', overflow:'hidden'}}>
                                                        {value['message']}
                                                    </div>
                                                </QueueAnim>
                                            </Col>
                                        ):(
                                            <Col xs={{span:8, offset:2}}>
                                                <QueueAnim delay={300} className="queue-simple">
                                                    <div key="b" style={{borderRadius:"5px", backgroundColor:"lightgreen", height:"auto", width:"auto", wordWrap:'break-word', overflow:'hidden'}}>
                                                        {value['message']}
                                                    </div>
                                                </QueueAnim>
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