import React, { useEffect, useState } from 'react'
import ScrollBottom from 'react-scroll-to-bottom'
import './main.css'
//import Button from '@material-ui/core/Button'

const Chat = ({socket , name, room } )=>{
    const [ currentMessage , setCurrentMessage] = useState("");
    const [ mesList , setmesList] = useState([]);

    const sendMessage = async ()=>{
        if(currentMessage !== ''){
            const messageData={
                room:room,
                author:name,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };
            console.log(messageData);
            await socket.emit('send_message',messageData);
            setmesList((list)=>[...list,messageData]);
            setCurrentMessage("")
        }
        
    };

    useEffect(()=>{socket.on("recived_message",(data)=>{
        setmesList((list)=>[...list,data])
    })}, [socket]);

    return(
        <>
            <div className='main_div'>
            
                <div className='cent_div'>
                    <div className='header'><h2>Live chat</h2></div>
                    <div className='body'>
                    <ScrollBottom className='msg_cont'>
                        {mesList.map((messageContent)=>{
                            return (
                                <div id='p1' className={  name === messageContent.author ? "you" : "other"}>
                                    <div className='mes'>
                                        <div className='m1' >
                                            <p className=''>{messageContent.message}</p>
                                        </div>
                                       
                                        <div className='m2'>
                                            <p>{messageContent.author}</p>
                                            <p>{messageContent.time}</p>
                                        </div>
                                  </div>
                                </div>
                            )
                        })}
                        </ScrollBottom>
                    </div>
                    <div className='footer'>
                        <input className='inp' type='text' placeholder='hey..' value={currentMessage}
                            onChange={(event)=>{setCurrentMessage(event.target.value)}}
                            onKeyPress={(event)=>{
                                event.key==="Enter" && sendMessage();
                            }}
                        />
                        <button onClick={sendMessage}>&#9658;</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default Chat;