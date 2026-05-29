import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";

function EditProperty(){

const {
properties,
setProperties
}
=
useContext(
PropertyContext
);

const {id}=
useParams();

const navigate=
useNavigate();

const property=
properties.find(
item=>
item.id.toString()===id
);

const [formData,setFormData]=
useState(

property ||

{

title:"",
location:"",
price:"",
bedrooms:"",
bathrooms:"",
area:"",
description:"",
realtorName:"",
realtorPhone:"",
image:"",
images:[]

}

);

if(!property){

return(

<div className="bg-[#0b1120] min-h-screen text-white flex justify-center items-center">

<h1 className="text-4xl font-bold">

Property Not Found

</h1>

</div>

);

}

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};

const handleSubmit=(e)=>{

e.preventDefault();

const updated=

properties.map(
item=>

item.id===property.id

?

formData

:

item

);

setProperties(
updated
);

localStorage.setItem(

"properties",

JSON.stringify(
updated
)

);

alert(
"Property Updated Successfully"
);

navigate(
`/property/${id}`
);

};

return(

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

<div className="max-w-5xl mx-auto bg-[#111827] p-10 rounded-[35px]">

<h1 className="text-5xl font-bold mb-8">

Edit Property

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input
type="text"
name="title"
value={formData.title}
onChange={handleChange}
placeholder="Property Title"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="location"
value={formData.location}
onChange={handleChange}
placeholder="Location"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="price"
value={formData.price}
onChange={handleChange}
placeholder="Price"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="number"
name="bedrooms"
value={formData.bedrooms}
onChange={handleChange}
placeholder="Bedrooms"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="number"
name="bathrooms"
value={formData.bathrooms}
onChange={handleChange}
placeholder="Bathrooms"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="area"
value={formData.area}
onChange={handleChange}
placeholder="Area"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<textarea
name="description"
value={formData.description}
onChange={handleChange}
placeholder="Description"
className="w-full bg-[#1f2937] p-4 rounded-xl h-32"
/>

<input
type="text"
name="realtorName"
value={formData.realtorName}
onChange={handleChange}
placeholder="Realtor Name"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="realtorPhone"
value={formData.realtorPhone}
onChange={handleChange}
placeholder="Phone"
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<button
className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"
>

Save Changes

</button>

</form>

</div>

</div>

);

}

export default EditProperty;