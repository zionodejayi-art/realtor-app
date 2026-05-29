import { Link } from "react-router-dom";

function PropertyCard({
  image,
  title,
  location,
  price,
  type,
  description,
  id,
}) {

  return (
    <div className="bg-[#1e293b] rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300">

      <img
        src={
          image ||
          "https://images.unsplash.com/photo-1568605114967-8130f3a36994"
        }
        alt={title}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        <h3 className="text-2xl font-bold mb-2 text-white">
          {title}
        </h3>

        <p className="text-gray-400 mb-4">
          {location}
        </p>

        <div className="flex items-center justify-between">

          <p className="text-yellow-400 text-2xl font-bold">
            {price}
          </p>

          <Link to={`/property/${id}`}>

            <button className="bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition">

              View

            </button>

          </Link>

        </div>
      </div>
    </div>
  );
}

export default PropertyCard;