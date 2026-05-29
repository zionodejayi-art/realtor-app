import { useState, useContext } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { useNavigate } from "react-router-dom";

function AddProperty() {

const {
addProperty
}
=
useContext(PropertyContext);

const navigate =
useNavigate();

const currentUser=
JSON.parse(
localStorage.getItem(
"user"
)
);

const [formData,setFormData]=
useState({

title:"",
location:"",
price:"",
bedrooms:"",
bathrooms:"",
area:"",
realtorName:"",
realtorPhone:"",
description:"",
image:"",
images:[],
type:"Buy"

});

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:
e.target.value

});

};

const handleMainImage=(e)=>{

const file=
e.target.files[0];

if(!file)
return;

const reader=
new FileReader();

reader.onloadend=()=>{

setFormData(
(prev)=>({

...prev,

image:
reader.result

})

);

};

reader.readAsDataURL(
file
);

};

const handleOtherImages=(e)=>{

const files=
Array.from(
e.target.files
);

Promise.all(

files.map(
(file)=>{

return new Promise(
(resolve)=>{

const reader=
new FileReader();

reader.onloadend=()=>{

resolve(
reader.result
);

};

reader.readAsDataURL(
file
);

}

);

}

)

)

.then((images)=>{

setFormData(
(prev)=>({

...prev,

images

})

);

});

};

const handleSubmit=(e)=>{

e.preventDefault();

if(

!formData.title ||
!formData.location ||
!formData.price ||
!formData.image

){

alert(
"Please fill required fields and add a main image"
);

return;

}

const cleanProperty={

...formData,

bedrooms:
formData.bedrooms || 0,

bathrooms:
formData.bathrooms || 0,

area:
formData.area || "N/A",

description:
formData.description || "No description",

realtorName:
formData.realtorName || "Unknown Realtor",

realtorPhone:
formData.realtorPhone || "N/A",

images:
formData.images || [],

owner:
currentUser?.email || ""

};

try{

addProperty(
cleanProperty
);

navigate(
"/explore"
);

}
catch{

alert(
"Too many large images are stored. Clear old properties and try smaller images."
);

}

};

return(

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

<div className="max-w-5xl mx-auto bg-[#111827] p-10 rounded-[35px]">

<h1 className="text-5xl font-bold mb-8">

Add Property

</h1>

<form
onSubmit={handleSubmit}
className="space-y-5"
>

<input
type="text"
name="title"
placeholder="Property Title"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="location"
placeholder="Location"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="price"
placeholder="Price"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="number"
name="bedrooms"
placeholder="Bedrooms"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="number"
name="bathrooms"
placeholder="Bathrooms"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="area"
placeholder="Area"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<textarea
name="description"
placeholder="Description"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl h-28"
/>

<input
type="text"
name="realtorName"
placeholder="Realtor Name"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<input
type="text"
name="realtorPhone"
placeholder="Realtor Phone"
onChange={handleChange}
className="w-full bg-[#1f2937] p-4 rounded-xl"
/>

<div>

<label className="font-bold">

Main Property Image

</label>

<input
type="file"
accept="image/*"
onChange={handleMainImage}
className="w-full mt-2"
/>

</div>

<div>

<label className="font-bold">

Other Property Images

</label>

<input
type="file"
accept="image/*"
multiple
onChange={handleOtherImages}
className="w-full mt-2"
/>

</div>

<button
className="w-full bg-yellow-400 text-black p-4 rounded-xl font-bold"
>

Add Property

</button>

</form>

</div>

</div>

);

}

export default AddProperty;