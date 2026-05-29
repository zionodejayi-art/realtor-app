import { useContext, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

function Settings(){

const navigate=
useNavigate();

const {

profile,
setProfile,
messages,
deleteMessage,
notifications,
markNotificationRead

}=useContext(
PropertyContext
);

const [soundEffects,
setSoundEffects]=
useState(

JSON.parse(
localStorage.getItem(
"soundEffects"
)
)

?? true

);

const [notificationsOn,
setNotificationsOn]=
useState(

JSON.parse(
localStorage.getItem(
"notificationsOn"
)
)

?? true

);

const saveSettings=()=>{

localStorage.setItem(
"soundEffects",
JSON.stringify(
soundEffects
)
);

localStorage.setItem(
"notificationsOn",
JSON.stringify(
notificationsOn
)
);

alert(
"Settings saved"
);

};

const clearInbox=()=>{

messages.forEach(
(message)=>
deleteMessage(
message.id
)
);

};

const clearNotifications=()=>{

notifications.forEach(
(notification)=>
markNotificationRead(
notification.id
)
);

};

const logout=()=>{

localStorage.removeItem(
"user"
);

navigate(
"/login"
);

};

return(

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

<div className="max-w-4xl mx-auto">

<h1 className="text-4xl font-bold mb-8">

Settings

</h1>

<div className="bg-[#111827] rounded-[30px] p-8 space-y-6">

<div className="flex justify-between items-center">

<div>

<h2 className="font-bold">

Sound Effects

</h2>

<p className="text-gray-400">

Turn sounds on or off

</p>

</div>

<input
type="checkbox"
checked={soundEffects}
onChange={()=>
setSoundEffects(
!soundEffects
)
}
/>

</div>

<div className="flex justify-between items-center">

<div>

<h2 className="font-bold">

Notifications

</h2>

<p className="text-gray-400">

Enable or disable notifications

</p>

</div>

<input
type="checkbox"
checked={notificationsOn}
onChange={()=>
setNotificationsOn(
!notificationsOn
)
}
/>

</div>

<div className="border-t border-gray-700 pt-6">

<button
onClick={clearInbox}
className="w-full bg-blue-500 py-3 rounded-xl font-bold mb-4"
>

Clear Inbox

</button>

<button
onClick={clearNotifications}
className="w-full bg-purple-500 py-3 rounded-xl font-bold mb-4"
>

Clear Notifications

</button>

<button
onClick={saveSettings}
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold mb-4"
>

Save Settings

</button>

<button
onClick={logout}
className="w-full bg-red-500 py-3 rounded-xl font-bold"
>

Logout

</button>

</div>

</div>

</div>

</div>

);

}

export default Settings;