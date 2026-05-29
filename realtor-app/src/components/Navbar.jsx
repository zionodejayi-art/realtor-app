import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";

function Navbar() {

const location =
useLocation();

const navigate =
useNavigate();

const {

notifications=[],
markNotificationRead

}=
useContext(
PropertyContext
);

const [loggedIn,
setLoggedIn]=
useState(false);

const [menuOpen,
setMenuOpen]=
useState(false);

const [showNotifications,
setShowNotifications]=
useState(false);

useEffect(()=>{

const checkLogin=()=>{

setLoggedIn(
!!localStorage.getItem(
"user"
)
);

};

checkLogin();

window.addEventListener(
"storage",
checkLogin
);

return()=>{

window.removeEventListener(
"storage",
checkLogin
);

};

},[location]);

const handleLogout=()=>{

localStorage.removeItem(
"user"
);

setLoggedIn(
false
);

navigate(
"/login"
);

};

const openNotification=
(item)=>{

if(
item.text.includes(
"message"
)
){

navigate(
"/inbox"
);

}

else if(
item.text.includes(
"saved"
)
){

navigate(
"/profile"
);

}

else if(
item.text.includes(
"Property"
)
){

navigate(
"/profile"
);

}

markNotificationRead(
item.id
);

setShowNotifications(
false
);

};

const navLinks=[

{
name:"Home",
path:"/"
},



{
name:"Explore",
path:"/explore"
},

{
name:"Favorites",
path:"/favorites"
},

...(loggedIn ? [

{
name:"Add Property",
path:"/add-property"
},

{
name:"Inbox",
path:"/inbox"
},

{
name:"Profile",
path:"/profile"
}

] : []),

{
name:"Settings",
path:"/settings"
}

];

return(

<nav className="bg-[#0f172a]/80 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 shadow-xl">

<div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

<Link to="/">

<h1 className="text-3xl font-extrabold text-yellow-400">

All Realtor

</h1>

</Link>

{/* DESKTOP */}

<div className="hidden md:flex items-center gap-8">

{

navLinks.map(
(link)=>(

<Link
key={link.name}
to={link.path}
className={`font-semibold hover:text-yellow-400 transition ${
location.pathname===link.path
?
"text-yellow-400"
:
"text-white"
}`}
>

{link.name}

</Link>

))

}

{/* NOTIFICATIONS */}

{

loggedIn && (

<div className="relative">

<button
onClick={()=>
setShowNotifications(
!showNotifications
)
}
className="text-2xl relative"
>

🔔

{

notifications.length>0&&(

<span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex justify-center items-center">

{notifications.length}

</span>

)

}

</button>

{

showNotifications&&(

<div className="absolute right-0 mt-4 w-72 bg-[#111827] rounded-xl p-4 shadow-xl max-h-[400px] overflow-y-auto">

<h2 className="font-bold mb-4">

Notifications

</h2>

{

notifications.length===0

?

<p className="text-gray-400">

No notifications

</p>

:

notifications.map(
(item)=>(

<div
key={item.id}
onClick={()=>
openNotification(
item
)
}
className="bg-[#1f2937] p-3 rounded-xl mb-2 cursor-pointer hover:bg-[#374151] transition"
>

{item.text}

</div>

))

}

</div>

)

}

</div>

)

}

{

loggedIn

?

<button
onClick={handleLogout}
className="bg-red-500 px-5 py-2 rounded-xl font-bold"
>

Logout

</button>

:

<Link
to="/register"
>

<button
className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold"
>

Register

</button>

</Link>

}

</div>

{/* MOBILE BUTTON + NOTIFICATIONS */}

<div className="md:hidden flex items-center gap-4">

{loggedIn && (

<div className="relative">

<button
onClick={()=>
setShowNotifications(
!showNotifications
)
}
className="text-2xl relative text-white"
>

🔔

{notifications.length > 0 && (

<span className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex justify-center items-center">

{notifications.length}

</span>

)}

</button>

{showNotifications && (

<div className="absolute right-0 mt-4 w-64 bg-[#111827] rounded-xl p-4 shadow-xl max-h-[300px] overflow-y-auto z-50">

<h2 className="font-bold mb-3">

Notifications

</h2>

{notifications.length===0 ?

<p className="text-gray-400">

No notifications

</p>

:

notifications.map((item)=>(

<div
key={item.id}
onClick={()=>
openNotification(item)
}
className="bg-[#1f2937] p-3 rounded-xl mb-2 cursor-pointer hover:bg-[#374151] transition"
>

{item.text}

</div>

))

}

</div>

)}

</div>

)}

<button
onClick={()=>
setMenuOpen(
!menuOpen
)
}
className="text-3xl text-white"
>

☰

</button>

</div>
</div>

{/* MOBILE MENU */}

{

menuOpen&&(

<div className="md:hidden bg-[#1e293b] p-6 flex flex-col gap-5">

{

navLinks.map(
(link)=>(

<Link
key={link.name}
to={link.path}
className="text-white"
onClick={()=>
setMenuOpen(
false
)
}
>

{link.name}

</Link>

))

}

{

loggedIn

?

<button
onClick={handleLogout}
className="bg-red-500 p-3 rounded-xl font-bold"
>

Logout

</button>

:

<Link
to="/register"
>

<button
className="bg-yellow-400 p-3 rounded-xl font-bold text-black"
>

Register

</button>

</Link>

}

</div>

)

}

</nav>

);

}

export default Navbar;