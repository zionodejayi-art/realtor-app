import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";

function Explore() {

const { properties } =
useContext(PropertyContext);

const currentUser =
JSON.parse(
localStorage.getItem(
"user"
)
);

const [search,setSearch]=
useState("");

const [type,setType]=
useState("All");

const [bedrooms,setBedrooms]=
useState("All");

const [maxPrice,setMaxPrice]=
useState("");

const filteredProperties=
properties.filter(
(property)=>{

const matchesSearch=

property.title
?.toLowerCase()
.includes(
search.toLowerCase()
)

||

property.location
?.toLowerCase()
.includes(
search.toLowerCase()
);

const matchesType=

type==="All"

||

property.type===type;

const matchesBedrooms=

bedrooms==="All"

||

property.bedrooms==
bedrooms;

const matchesPrice=

maxPrice===""

||

Number(
property.price
.replace(/[^\d]/g,"")
)

<=

Number(
maxPrice
);

return(

matchesSearch &&
matchesType &&
matchesBedrooms &&
matchesPrice

);

}
);

return(

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

<div className="max-w-7xl mx-auto">

<h1 className="text-5xl font-bold mb-10">

Explore Properties

</h1>

<div className="bg-[#111827] p-6 rounded-[30px] mb-10 grid md:grid-cols-4 gap-4">

<input
type="text"
placeholder="Search title or location..."
value={search}
onChange={(e)=>
setSearch(
e.target.value
)
}
className="bg-[#1f2937] p-4 rounded-xl"
/>

<select
value={type}
onChange={(e)=>
setType(
e.target.value
)
}
className="bg-[#1f2937] p-4 rounded-xl"
>

<option>All</option>
<option>Buy</option>
<option>Rent</option>

</select>

<select
value={bedrooms}
onChange={(e)=>
setBedrooms(
e.target.value
)
}
className="bg-[#1f2937] p-4 rounded-xl"
>

<option>All</option>
<option>1</option>
<option>2</option>
<option>3</option>
<option>4</option>
<option>5</option>

</select>

<input
type="number"
placeholder="Max Price"
value={maxPrice}
onChange={(e)=>
setMaxPrice(
e.target.value
)
}
className="bg-[#1f2937] p-4 rounded-xl"
/>

</div>

<div className="grid md:grid-cols-3 gap-8">

{

filteredProperties.map(
(property)=>(

<div
key={property.id}
className="bg-[#111827] rounded-[30px] overflow-hidden shadow-lg hover:scale-[1.02] transition"
>

<img
src={property.image}
alt=""
className="w-full h-60 object-cover"
/>

<div className="p-6">

<h2 className="text-2xl font-bold">

{property.title}

</h2>

<p className="text-gray-400 mt-2">

📍 {property.location}

</p>

<p className="text-yellow-400 text-xl font-bold mt-4">

{property.price}

</p>

<div className="flex gap-4 mt-4">

<p>
🛏 {property.bedrooms}
</p>

<p>
🚿 {property.bathrooms}
</p>

</div>

<div className="flex gap-3 mt-6">

<Link
to={`/property/${property.id}`}
className="flex-1"
>

<button className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold">

View Details

</button>

</Link>

{

currentUser?.email===property.owner && (

<Link
to={`/edit-property/${property.id}`}
className="flex-1"
>

<button className="w-full bg-blue-500 py-3 rounded-xl font-bold">

Edit

</button>

</Link>

)

}

</div>

</div>

</div>

))

}

</div>

</div>

</div>

);

}

export default Explore;