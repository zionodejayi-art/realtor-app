import { useState } from "react";

import {
Link,
useNavigate
} from "react-router-dom";

import {
signInWithEmailAndPassword
} from "firebase/auth";

import { auth } from "../firebase";

function Login(){

const navigate =
useNavigate();

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const [loading,setLoading]=
useState(false);

const handleLogin =
async(e)=>{

e.preventDefault();

setLoading(true);

try{

const userCredential =

await signInWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

localStorage.setItem(
"user",
JSON.stringify({
email:user.email
})
);

alert(
"Login successful"
);

navigate("/");

}catch(error){

alert(error.message);

}

setLoading(false);

};

return(

<div className="bg-[#0b1120] min-h-screen flex justify-center items-center px-4">

<div className="bg-[#111827] w-full max-w-md rounded-[30px] p-8 shadow-2xl">

<h1 className="text-4xl font-bold text-yellow-400 text-center mb-8">

Welcome Back

</h1>

<form
onSubmit={handleLogin}
className="flex flex-col gap-5"
>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>
setEmail(
e.target.value
)}
className="bg-[#1f2937] p-4 rounded-xl text-white outline-none"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>
setPassword(
e.target.value
)}
className="bg-[#1f2937] p-4 rounded-xl text-white outline-none"
/>

<button
type="submit"
disabled={loading}
className="bg-yellow-400 text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition"
>

{
loading
?
"Logging in..."
:
"Login"
}

</button>

</form>

<p className="text-gray-400 text-center mt-6">

Don't have an account?

<Link
to="/register"
className="text-yellow-400 ml-2"
>

Register

</Link>

</p>

</div>

</div>

);

}

export default Login;