import { createContext, useState, useEffect } from "react";

export const PropertyContext=
createContext();

function PropertyProvider({
children
}){

const [profile,setProfile]=
useState(
JSON.parse(
localStorage.getItem(
"profile"
)
)
||
{
name:"User",
bio:"Welcome to All Realtor",
image:"https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
}
);

const [properties,setProperties]=
useState([]);

const [savedProperties,setSavedProperties]=
useState(
JSON.parse(
localStorage.getItem(
"savedProperties"
)
)
||
[]
);

const [messages,setMessages]=
useState(
JSON.parse(
localStorage.getItem(
"messages"
)
)
||
[]
);

const [notifications,setNotifications]=
useState(
JSON.parse(
localStorage.getItem(
"notifications"
)
)
||
[]
);

const [reviews,setReviews]=
useState(
JSON.parse(
localStorage.getItem(
"reviews"
)
)
||
[]
);

useEffect(()=>{

const storedProperties=
JSON.parse(
localStorage.getItem(
"properties"
)
)
||
[];

setProperties(
storedProperties
);

},[]);

const markNotificationRead=(id)=>{

const updated=
notifications.filter(
item=>
item.id!==id
);

setNotifications(
updated
);

localStorage.setItem(
"notifications",
JSON.stringify(
updated
)
);

};

const saveProfile=(updatedProfile)=>{

setProfile(
updatedProfile
);

localStorage.setItem(
"profile",
JSON.stringify(
updatedProfile
)
);

};

const addNotification=(text)=>{

const updated=[

{
id:Date.now(),
text
},

...notifications

];

setNotifications(
updated
);

localStorage.setItem(
"notifications",
JSON.stringify(
updated
)
);

};

const addProperty=(property)=>{

const updated=[

...properties,

{
...property,
id:Date.now()
}

];

setProperties(
updated
);

localStorage.setItem(
"properties",
JSON.stringify(
updated
)
);

addNotification(
"🏠 Property added"
);

};

const toggleSave=(property)=>{

const exists=
savedProperties.includes(
property.id
);

let updated;

if(exists){

updated=
savedProperties.filter(
id=>
id!==property.id
);

}else{

updated=[

...savedProperties,
property.id

];

addNotification(
"❤️ Property saved"
);

}

setSavedProperties(
updated
);

localStorage.setItem(
"savedProperties",
JSON.stringify(
updated
)
);

};

const sendMessage=(message)=>{

const updated=[

...messages,

{

id:Date.now(),

sender:
message.sender,

receiver:
message.receiver ||
message.realtor ||
"Unknown",

property:
message.property,

text:
message.text,

time:
new Date().toLocaleString(),

read:false,

mine:
message.mine || false,

conversationId:
`${message.sender}-${message.receiver || message.realtor}`

}

];

setMessages(
updated
);

localStorage.setItem(
"messages",
JSON.stringify(
updated
)
);

addNotification(
"📩 New message"
);

};

const getConversation=(user1,user2)=>{

return messages.filter(

message=>

(

message.sender===user1 &&
message.receiver===user2

)

||

(

message.sender===user2 &&
message.receiver===user1

)

);

};

const deleteMessage=(id)=>{

const updated=
messages.filter(
message=>
message.id!==id
);

setMessages(
updated
);

localStorage.setItem(
"messages",
JSON.stringify(
updated
)
);

};

const addReview=(review)=>{

const updated=[

...reviews,

{
...review,
id:Date.now()
}

];

setReviews(
updated
);

localStorage.setItem(
"reviews",
JSON.stringify(
updated
)
);

addNotification(
"⭐ New review"
);

};

const deleteReview=(id)=>{

const updated=
reviews.filter(
review=>
review.id!==id
);

setReviews(
updated
);

localStorage.setItem(
"reviews",
JSON.stringify(
updated
)
);

};

return(

<PropertyContext.Provider
value={{

profile,
setProfile:saveProfile,

properties,
setProperties,
addProperty,

savedProperties,
toggleSave,

messages,
setMessages,
sendMessage,
deleteMessage,
getConversation,

notifications,
markNotificationRead,

reviews,
addReview,
deleteReview

}}
>

{children}

</PropertyContext.Provider>

);

}

export default PropertyProvider;