import { useContext,useState,useEffect,useRef } from "react";
import { PropertyContext } from "../context/PropertyContext";

function Inbox(){

const {
messages,
setMessages
}
=
useContext(PropertyContext);

const [selectedChat,setSelectedChat]=
useState(messages[0]||null);

const [newMessage,setNewMessage]=
useState("");

const [search,setSearch]=
useState("");

const [typing,setTyping]=
useState(false);

const [onlineUsers,setOnlineUsers]=
useState({});

const [recording,setRecording]=
useState(false);

const messagesEndRef=
useRef(null);

const mediaRecorderRef=
useRef(null);

const audioChunksRef=
useRef([]);

const uniqueChats=[

...new Map(

messages.map(
message=>[
message.sender,
message
]
)

).values()

];

const filteredChats=
uniqueChats.filter(
message=>

message.sender
.toLowerCase()
.includes(search.toLowerCase())

||

(message.property || "")
.toLowerCase()
.includes(search.toLowerCase())

);

useEffect(()=>{

messagesEndRef.current?.
scrollIntoView({
behavior:"smooth"
});

},[messages]);

useEffect(()=>{

const interval=
setInterval(()=>{

const status={};

uniqueChats.forEach(
chat=>{

status[
chat.sender
]
=
Math.random()>0.4;

});

setOnlineUsers(
status
);

},5000);

return()=>
clearInterval(interval);

},[messages]);

const markAsRead=(id)=>{

const updated=

messages.map(
message=>

message.id===id

?

{
...message,
read:true
}

:

message
);

setMessages(updated);

localStorage.setItem(
"messages",
JSON.stringify(updated)
);

};

const handleTyping=(e)=>{

setNewMessage(
e.target.value
);

setTyping(true);

setTimeout(()=>{

setTyping(false);

},1000);

};

const sendReply=()=>{

if(
!newMessage.trim()
||
!selectedChat
)return;

const message={

id:Date.now(),

sender:
selectedChat.sender,

property:
selectedChat.property,

text:newMessage,

time:
new Date()
.toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
}),

mine:true,
read:false,
delivered:false

};

const updated=[
...messages,
message
];

setMessages(updated);

localStorage.setItem(
"messages",
JSON.stringify(updated)
);

setNewMessage("");

setTimeout(()=>{

const delivered=

updated.map(
msg=>

msg.id===message.id

?

{
...msg,
delivered:true,
read:true
}

:

msg
);

setMessages(
delivered
);

localStorage.setItem(
"messages",
JSON.stringify(delivered)
);

},1000);

};

const sendImage=(e)=>{

const file=
e.target.files[0];

if(!file)
return;

const reader=
new FileReader();

reader.onloadend=()=>{

const imageMessage={

id:Date.now(),

sender:
selectedChat.sender,

property:
selectedChat.property,

image:
reader.result,

mine:true,

time:
new Date()
.toLocaleTimeString()

};

const updated=[

...messages,
imageMessage

];

setMessages(updated);

localStorage.setItem(
"messages",
JSON.stringify(updated)
);

};

reader.readAsDataURL(file);

};

const startRecording=async()=>{

if(
!selectedChat ||
recording ||
mediaRecorderRef.current?.state==="recording"
)
return;

try{

const stream=
await navigator.mediaDevices.getUserMedia({
audio:true
});

const recorder=
new MediaRecorder(stream);

mediaRecorderRef.current=
recorder;

audioChunksRef.current=[];

recorder.ondataavailable=
(event)=>{

if(event.data.size>0){

audioChunksRef.current.push(
event.data
);

}

};

recorder.onstop=()=>{

const audioBlob=
new Blob(
audioChunksRef.current,
{
type:"audio/webm"
}
);

const audioUrl=
URL.createObjectURL(
audioBlob
);

const audioMessage={

id:Date.now(),

sender:
selectedChat.sender,

property:
selectedChat.property,

audio:
audioUrl,

mine:true,

time:
new Date()
.toLocaleTimeString()

};

const updated=[

...messages,
audioMessage

];

setMessages(updated);

localStorage.setItem(
"messages",
JSON.stringify(updated)
);

stream
.getTracks()
.forEach(
track=>track.stop()
);

mediaRecorderRef.current=
null;

};

recorder.start();

setRecording(true);

}catch(err){

console.log(
"Recording Error:",
err
);

}

};
const stopRecording=()=>{

if(
!mediaRecorderRef.current
)
return;

if(
mediaRecorderRef.current.state==="recording"
){

mediaRecorderRef.current.stop();

}

setRecording(false);

};
return(

<div className="bg-[#0b1120] min-h-screen text-white pt-20 px-2">

<div className="max-w-7xl mx-auto">

<div className="flex flex-col md:grid md:grid-cols-[320px_1fr] gap-4">

<div
className={`bg-[#111827] rounded-[30px] p-4 h-[85vh] overflow-y-auto
${selectedChat ? "hidden md:block":"block"}
`}
>

<input
placeholder="Search..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)}
className="w-full bg-[#1f2937] p-3 rounded-xl mb-4"
/>

{
filteredChats.map(
message=>(

<div
key={message.id}
onClick={()=>{
setSelectedChat(message);
markAsRead(message.id);
}}

className={`p-4 mb-3 rounded-xl cursor-pointer

${
selectedChat?.sender===
message.sender

?

"bg-yellow-400 text-black"

:

"bg-[#1f2937]"
}
`}
>

<div className="flex justify-between">

<h2 className="font-bold">

{message.sender}

</h2>

{
!message.read&&
<div className="bg-red-500 w-3 h-3 rounded-full"/>
}

</div>

<p className="text-sm truncate">

{message.text||"📷 Image"}

</p>

</div>

))
}

</div>

<div
className={`bg-[#111827] rounded-[30px] h-[85vh] flex flex-col

${selectedChat
?
"block"
:
"hidden md:flex"
}
`}
>

{
selectedChat ?

<>

<div className="border-b p-4 flex items-center gap-3">

<button
onClick={()=>
setSelectedChat(null)
}
className="md:hidden"
>
←
</button>

<div>

<h2 className="font-bold">
{selectedChat.sender}
</h2>

<p className="text-sm">
{
onlineUsers[
selectedChat.sender
]
?
"🟢 Online"
:
"⚫ Offline"
}
</p>

</div>

</div>

<div className="flex-1 overflow-y-auto p-5">

{
messages
.filter(
msg=>
msg.sender===
selectedChat.sender
)

.map(
msg=>(

<div
key={msg.id}
className={`mb-4 flex

${
msg.mine
?
"justify-end"
:
"justify-start"
}
`}
>

<div
className={`rounded-2xl p-4 w-fit max-w-[85%] sm:max-w-[70%]

${
msg.mine
?
"bg-yellow-400 text-black"
:
"bg-[#1f2937]"
}
`}
>

{msg.text&&
<p>{msg.text}</p>
}

{msg.image&&

<img
src={msg.image}
alt=""
className="rounded-xl max-w-full"
/>
}

{msg.audio &&

<div className="mt-2 w-[200px] sm:w-[280px] max-w-full">

<audio
controls
preload="metadata"
key={msg.id}
className="w-full h-10 rounded-lg"
onEnded={(e)=>{
e.target.currentTime=0;
}}
>

<source
src={msg.audio}
type="audio/webm"
/>

Your browser does not support audio

</audio>

</div>

}

<div className="flex justify-between mt-2 text-xs">

<p>{msg.time}</p>

{
msg.mine&&(

<p>

{
msg.read
?
"✓✓"
:
msg.delivered
?
"✓✓"
:
"✓"
}

</p>

)
}

</div>

</div>

</div>

))
}

<div ref={messagesEndRef}/>

</div>

{typing&&

<p className="px-4 text-gray-400">

Typing...

</p>

}

<div className="border-t p-4 flex gap-2">

<input
value={newMessage}
onChange={handleTyping}
placeholder="Message..."
className="flex-1 bg-[#1f2937] p-3 rounded-xl"
/> 

<label className="bg-[#1f2937] p-2 rounded-xl cursor-pointer">

📷

<input
hidden
type="file"
accept="image/*"
onChange={sendImage}
/>

</label>

<button
onMouseDown={startRecording}
onMouseUp={stopRecording}
onTouchStart={startRecording}
onTouchEnd={stopRecording}
className={`px-3 rounded-xl transition-all

${
recording
?
"bg-red-500 scale-110"
:
"bg-[#1f2937]"
}
`}
>

🎤

</button>

<button
onClick={sendReply}
className="bg-yellow-400 text-white px-3 rounded-xl"
>

⇨

</button>

</div>

</>

:

<div className="flex flex-1 justify-center items-center text-gray-400">

Select a conversation

</div>

}

</div>

</div>

</div>

</div>

);

}

export default Inbox;