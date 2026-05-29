import { useContext } from "react";
import { Link } from "react-router-dom";
import { PropertyContext } from "../context/PropertyContext";

function Favorites() {

const {
properties,
savedProperties,
toggleSave
} =
useContext(
PropertyContext
);

const favoriteProperties =
properties.filter(
property =>
savedProperties.includes(
property.id
)
);

return (

<div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

<div className="max-w-7xl mx-auto">

<h1 className="text-5xl font-bold mb-8">

❤️ Favorites

</h1>

{

favoriteProperties.length===0

?

<div className="bg-[#111827] p-8 rounded-[30px] text-center">

<h2 className="text-2xl font-bold">

No saved properties yet

</h2>

<p className="text-gray-400 mt-3">

Save properties and they will appear here

</p>

</div>

:

<div className="grid md:grid-cols-3 gap-6">

{

favoriteProperties.map(
(property)=>(

<div
key={property.id}
className="bg-[#111827] rounded-[25px] overflow-hidden"
>

<img
src={
property.image
}
alt=""
className="w-full h-56 object-cover"
/>

<div className="p-5">

<h2 className="text-xl font-bold">

{property.title}

</h2>

<p className="text-gray-400 mt-2">

📍 {property.location}

</p>

<p className="text-yellow-400 font-bold text-xl mt-3">

{property.price}

</p>

<div className="flex gap-3 mt-5">

<Link
to={`/property/${property.id}`}
className="flex-1"
>

<button
className="w-full bg-yellow-400 text-black py-3 rounded-xl font-bold"
>

View Details

</button>

</Link>

<button
onClick={()=>
toggleSave(
property
)
}
className="bg-red-500 px-4 rounded-xl"
>

🗑

</button>

</div>

</div>

</div>

))

}

</div>

}

</div>

</div>

);

}

export default Favorites;
