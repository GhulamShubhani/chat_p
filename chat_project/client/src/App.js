import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './component/Chat'
import './component/main.css';

const socket = io.connect("http://localhost:3005");

function App() {
	const [name , setname] = useState("")
	const [room , setroom] = useState("")
	const [show , setshow] = useState(false)

	const Event1 = (event) =>{
		setname(event.target.value)
		console.log(event.target.value)
	}
	const joinroom =()=>{
		if (name !=="" && room !== ""){
			socket.emit("join_room",room)
			setshow(true)
		}
	}

  return (
    <>
	<div className='t1'>
	{ ! show ? (
		<div className='t3'>
			<div className='t4'>
				<br/>
				<h2>join a chat</h2>
				<input type='text' placeholder='join...' value={name} onChange={Event1} />
				<input type='text' placeholder='room...'  onChange={(event)=>{setroom(event.target.value)}} />
				<button onClick={joinroom}>click</button>
				
			</div>
		</div>
		): (<Chat socket={socket} name={name} room={room} />)	
	}
	</div>
	</>
  );
}

export default App;
