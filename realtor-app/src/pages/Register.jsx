import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

import {
createUserWithEmailAndPassword
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

function Register(){

const navigate =
useNavigate();

const [name,setName]=
useState("");

const [email,setEmail]=
useState("");

const [password,setPassword]=
useState("");

const [loading,setLoading]=
useState(false);

const handleRegister =
async(e)=>{

e.preventDefault();

setLoading(true);

try{

const userCredential =

await createUserWithEmailAndPassword(
auth,
email,
password
);

const user =
userCredential.user;

localStorage.setItem(
"user",
JSON.stringify({
name,
email:user.email
})
);

alert(
"Registration successful"
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

Create Account

</h1>

<form
onSubmit={handleRegister}
className="flex flex-col gap-5"
>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>
setName(
e.target.value
)}
className="bg-[#1f2937] p-4 rounded-xl text-white outline-none"
/>

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
"Creating Account..."
:
"Register"
}

</button>

</form>

<p className="text-gray-400 text-center mt-6">

Already have an account?

<Link
to="/login"
className="text-yellow-400 ml-2"
>

Login

</Link>

</p>

</div>

</div>

);

}

export default Register;