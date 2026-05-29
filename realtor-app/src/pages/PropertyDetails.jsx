import { useParams, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PropertyContext } from "../context/PropertyContext";

function PropertyDetails() {

const { id } = useParams();

const {

properties,
toggleSave,
savedProperties,
sendMessage,
reviews,
addReview,
deleteReview

} = useContext(PropertyContext);

const property =
properties.find(
(item)=>
item.id?.toString()===id
);

const currentUser=
JSON.parse(
localStorage.getItem(
"user"
)
);

const [message,setMessage]=
useState("");

const [selectedImage,setSelectedImage]=
useState("");

const [rating,setRating]=
useState(5);

const [reviewText,setReviewText]=
useState("");

useEffect(()=>{

if(property){

setSelectedImage(
property.image || ""
);

}

},[property]);

if(!property){

return(

<div className="bg-[#0b1120] min-h-screen text-white flex justify-center items-center">

<h1 className="text-2xl sm:text-4xl font-bold">

Property Not Found

</h1>

</div>

);

}

const propertyReviews=

reviews.filter(
review=>
review.propertyId===
property.id
);

const averageRating=

propertyReviews.length>0

?

(

propertyReviews.reduce(
(total,item)=>
total+item.rating,
0
)

/

propertyReviews.length

).toFixed(1)

:

"0";

const handleSend=()=>{

if(!message.trim()) return;

sendMessage({

sender:"User",

realtor:
property.realtorName,

property:
property.title,

text:message,

time:
new Date().toLocaleString(),

read:false

});

alert("Message sent");

setMessage("");

};

const handleReview=()=>{

if(!reviewText.trim())
return;

addReview({

propertyId:
property.id,

user:
currentUser?.name ||
"Anonymous",

rating,

text:
reviewText

});

setReviewText("");

setRating(5);

};

return(

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-4 sm:px-6">

<div className="max-w-7xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-2 gap-10">

{/* LEFT */}

<div>

<img
src={
selectedImage ||
property.image
}
alt=""
className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-[30px]"
/>

{property.images &&
property.images.length>0 && (

<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">

{property.images.map(
(img,index)=>(

<img
key={index}
src={img}
alt=""
onClick={()=>
setSelectedImage(img)
}
className="h-20 sm:h-24 w-full object-cover rounded-xl cursor-pointer border border-gray-700 hover:border-yellow-400"
/>

))
}

</div>

)}

</div>

{/* RIGHT */}

<div>

<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

<h1 className="text-3xl sm:text-5xl font-bold">

{property.title}

</h1>

<button
onClick={()=>
toggleSave(
property
)
}
className="bg-yellow-400 text-black px-5 py-2 rounded-xl font-bold w-full sm:w-auto"
>

{

savedProperties.includes(
property.id
)

?

"❤️ Saved"

:

"🤍 Save"

}

</button>

</div>

<p className="text-gray-400 mt-4">

📍 {property.location}

</p>

<h2 className="text-yellow-400 text-3xl sm:text-4xl font-bold mt-5">

{property.price}

</h2>

<p className="mt-4">

⭐ {averageRating}/5

</p>

<div className="flex flex-wrap gap-6 mt-8">

<p>🛏 {property.bedrooms}</p>

<p>🚿 {property.bathrooms}</p>

<p>📐 {property.area}</p>

</div>

<p className="mt-8 text-gray-300">

{property.description}

</p>

<div className="bg-[#111827] rounded-[25px] p-6 mt-10">

<h2 className="text-2xl font-bold mb-4">

Realtor Contact

</h2>

<p>
👤 {property.realtorName}
</p>

<p className="mt-2">
📞 {property.realtorPhone}
</p>

</div>

<div className="mt-8">

<textarea
value={message}
onChange={(e)=>
setMessage(
e.target.value
)
}
placeholder="Message Realtor..."
className="w-full bg-[#111827] rounded-xl p-4 h-28"
/>

<button
onClick={handleSend}
className="w-full mt-4 bg-yellow-400 text-black py-4 rounded-xl font-bold"
>

Send Message

</button>

</div>

<div className="bg-[#111827] rounded-[25px] p-6 mt-10">

<h2 className="text-2xl font-bold">

⭐ Reviews

</h2>

<select
value={rating}
onChange={(e)=>
setRating(
Number(
e.target.value
)
)
}
className="bg-[#1f2937] p-4 rounded-xl mt-4 w-full"
>

<option value={1}>⭐</option>
<option value={2}>⭐⭐</option>
<option value={3}>⭐⭐⭐</option>
<option value={4}>⭐⭐⭐⭐</option>
<option value={5}>⭐⭐⭐⭐⭐</option>

</select>

<textarea
value={reviewText}
onChange={(e)=>
setReviewText(
e.target.value
)
}
placeholder="Write review..."
className="w-full bg-[#1f2937] rounded-xl p-4 h-28 mt-4"
/>

<button
onClick={handleReview}
className="w-full mt-4 bg-yellow-400 text-black py-4 rounded-xl font-bold"
>

Submit Review

</button>

<div className="mt-6">

{propertyReviews.map(
(review)=>(

<div
key={review.id}
className="bg-[#1f2937] rounded-xl p-4 mb-4"
>

<h3 className="font-bold">

{review.user}

</h3>

<p>
{"⭐".repeat(
review.rating
)}
</p>

<p className="mt-2">

{review.text}

</p>

<button
onClick={()=>
deleteReview(
review.id
)
}
className="bg-red-500 px-4 py-2 rounded-xl mt-3"
>

Delete

</button>

</div>

))
}

</div>

</div>

</div>

</div>

<div className="mt-16">

<h2 className="text-3xl font-bold mb-6">

Similar Properties

</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

{properties
.filter(
item=>
item.id!==property.id
)
.slice(0,3)
.map(
(item)=>(

<div
key={item.id}
className="bg-[#111827] rounded-[25px]"
>

<img
src={item.image}
alt=""
className="w-full h-52 object-cover rounded-t-[25px]"
/>

<div className="p-5">

<h3 className="font-bold text-xl">

{item.title}

</h3>

<p className="text-gray-400">

📍 {item.location}

</p>

<p className="text-yellow-400 font-bold mt-3">

{item.price}

</p>

<Link
to={`/property/${item.id}`}
>

<button className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-xl font-bold">

View Details

</button>

</Link>

</div>

</div>

))

}

</div>

</div>

</div>

</div>

);

}

export default PropertyDetails;