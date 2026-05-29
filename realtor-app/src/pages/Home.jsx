import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {

    navigate(`/explore?search=${search}`);

  };

  return (
    <div className="bg-[#0b1120] min-h-screen text-white pt-28 overflow-hidden">

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SIDE */}
        <div>

          <p className="text-yellow-400 font-semibold tracking-[4px] mb-6">

            LUXURY REAL ESTATE

          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8">

            Find Your
            <span className="text-yellow-400"> Dream </span>
            Luxury Home

          </h1>

          <p className="text-gray-400 text-xl leading-9 mb-10 max-w-2xl">

            Discover premium villas, apartments and luxury homes
            around the world with modern comfort and elegant living.

          </p>

          {/* SEARCH BAR */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-3 flex flex-col md:flex-row gap-4 shadow-2xl">

            <input
              type="text"
              placeholder="Search luxury properties..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent outline-none px-4 py-4 text-lg"
            />

            <button
              onClick={handleSearch}
              className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-8 py-4 rounded-2xl font-bold text-lg"
            >

              Search

            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-6 mt-14">

            <div>

              <h2 className="text-4xl font-extrabold text-yellow-400">
                500+
              </h2>

              <p className="text-gray-400 mt-2">
                Premium Listings
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-extrabold text-yellow-400">
                200+
              </h2>

              <p className="text-gray-400 mt-2">
                Happy Clients
              </p>

            </div>

            <div>

              <h2 className="text-4xl font-extrabold text-yellow-400">
                50+
              </h2>

              <p className="text-gray-400 mt-2">
                Global Cities
              </p>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative">

          {/* MAIN IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="rounded-[40px] h-[700px] w-full object-cover shadow-2xl"
          />

          {/* FLOATING CARD */}
          <div className="absolute bottom-8 left-8 bg-[#111827]/90 backdrop-blur-xl border border-gray-700 rounded-3xl p-6 w-[320px] shadow-2xl">

            <p className="text-yellow-400 font-semibold mb-2">
              Featured Property
            </p>

            <h3 className="text-2xl font-bold mb-2">
              Modern Villa
            </h3>

            <p className="text-gray-400 mb-4">
              Beverly Hills, California
            </p>

            <div className="flex items-center justify-between">

              <span className="text-2xl font-bold text-yellow-400">
                $2.5M
              </span>

              <button
                onClick={() => navigate("/explore")}
                className="bg-yellow-400 hover:bg-yellow-500 transition text-black px-4 py-2 rounded-xl font-bold"
              >

                View

              </button>

            </div>

          </div>

        </div>

      </section>

      {/* SECOND SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="text-center mb-16">

          <p className="text-yellow-400 font-semibold mb-4">
            WHY CHOOSE US
          </p>

          <h2 className="text-5xl font-extrabold">
            Luxury Experience
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-10 hover:scale-105 transition duration-300">

            <div className="text-5xl mb-6">
              🏡
            </div>

            <h3 className="text-3xl font-bold mb-5">
              Premium Homes
            </h3>

            <p className="text-gray-400 leading-8">
              Explore carefully selected luxury properties
              with modern architecture and premium quality.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-10 hover:scale-105 transition duration-300">

            <div className="text-5xl mb-6">
              🌍
            </div>

            <h3 className="text-3xl font-bold mb-5">
              Global Locations
            </h3>

            <p className="text-gray-400 leading-8">
              Find luxury homes in the world’s best cities
              and most exclusive neighbourhoods.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="bg-[#111827] border border-gray-800 rounded-3xl p-10 hover:scale-105 transition duration-300">

            <div className="text-5xl mb-6">
              ⭐
            </div>

            <h3 className="text-3xl font-bold mb-5">
              Trusted Service
            </h3>

            <p className="text-gray-400 leading-8">
              Our expert agents provide world class service
              and help clients find perfect luxury homes.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;