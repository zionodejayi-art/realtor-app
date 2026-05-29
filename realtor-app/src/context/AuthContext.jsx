import { createContext, useState } from "react";

export const AuthContext =
createContext();

function AuthProvider({children}){

const [user,setUser]=
useState(()=>{

try{

const storedUser=
localStorage.getItem(
"user"
);

return storedUser
?

JSON.parse(
storedUser
)

:

null;

}

catch(error){

console.log(
"Invalid localStorage data"
);

localStorage.removeItem(
"user"
);

return null;

}

});

const login=(userData)=>{

setUser(userData);

localStorage.setItem(

"user",

JSON.stringify(
userData
)

);

};

const logout=()=>{

setUser(null);

localStorage.removeItem(
"user"
);

};

return(

<AuthContext.Provider
value={{

user,
login,
logout

}}
>

{children}

</AuthContext.Provider>

);

}

export default AuthProvider;