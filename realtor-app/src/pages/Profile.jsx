import { useContext, useState } from "react";
import { PropertyContext } from "../context/PropertyContext";
import { Link } from "react-router-dom";

function Profile() {

  const {
    profile,
    setProfile,
    properties,
    savedProperties
  } = useContext(PropertyContext);

  const defaultProfile = {

    name: "User",
    bio: "Welcome to All Realtor",
    image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"

  };

  const currentProfile =
    profile || defaultProfile;

  const [editing,
    setEditing] =
    useState(false);

  const [activeTab,
    setActiveTab] =
    useState("myposts");

  const [name,
    setName] =
    useState(
      currentProfile.name
    );

  const [bio,
    setBio] =
    useState(
      currentProfile.bio
    );

  const [image,
    setImage] =
    useState(
      currentProfile.image
    );

  const myPosts =
    properties || [];

  const savedPosts =
    (properties || []).filter(

      property =>

      (savedProperties || [])
      .includes(
        property.id
      )

    );

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];

    if(file){

      const reader =
        new FileReader();

      reader.onloadend = () => {

        setImage(
          reader.result
        );

      };

      reader.readAsDataURL(
        file
      );

    }

  };

  const saveProfile = () => {

    setProfile({

      name,
      bio,
      image

    });

    setEditing(false);

  };

  return (

    <div className="bg-[#0b1120] min-h-screen text-white pt-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* PROFILE CARD */}

        <div className="bg-[#111827] rounded-[30px] p-8">

          {editing ? (

            <div className="space-y-5">

              <div className="flex justify-center">

                <img
                  src={image}
                  alt=""
                  className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400"
                />

              </div>

              <input
                type="text"
                value={name}
                onChange={(e)=>
                  setName(
                    e.target.value
                  )
                }
                placeholder="Name"
                className="w-full bg-[#1f2937] p-4 rounded-xl"
              />

              <textarea
                value={bio}
                onChange={(e)=>
                  setBio(
                    e.target.value
                  )
                }
                placeholder="Bio"
                className="w-full bg-[#1f2937] p-4 rounded-xl h-24"
              />

              {/* FILE CHOOSE */}

              <div>

                <label className="block mb-2 font-bold">

                  Profile Image

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                  className="w-full bg-[#1f2937] p-3 rounded-xl"
                />

              </div>

              <button
                onClick={saveProfile}
                className="bg-yellow-400 text-black px-6 py-3 rounded-xl font-bold"
              >

                Save Profile

              </button>

            </div>

          )

          :

          (

            <div className="flex items-center gap-6">

              <img
                src={image}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-4 border-yellow-400"
              />

              <div>

                <h1 className="text-4xl font-bold">

                  {name}

                </h1>

                <p className="text-gray-400 mt-2">

                  {bio}

                </p>

                <button
                  onClick={() =>
                    setEditing(
                      true
                    )
                  }
                  className="bg-yellow-400 text-black px-5 py-2 rounded-xl mt-4 font-bold"
                >

                  Edit Profile

                </button>

              </div>

            </div>

          )}

        </div>

        {/* TABS */}

        <div className="flex gap-4 mt-10">

          <button
            onClick={() =>
              setActiveTab(
                "myposts"
              )
            }
            className={`px-6 py-3 rounded-xl font-bold ${
            activeTab==="myposts"
            ?
            "bg-yellow-400 text-black"
            :
            "bg-[#111827]"
            }`}
          >

            My Posts

          </button>

          <button
            onClick={() =>
              setActiveTab(
                "saved"
              )
            }
            className={`px-6 py-3 rounded-xl font-bold ${
            activeTab==="saved"
            ?
            "bg-yellow-400 text-black"
            :
            "bg-[#111827]"
            }`}
          >

            Saved

          </button>

        </div>

        {/* PROPERTY CARDS */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          {(activeTab==="myposts"
          ? myPosts
          : savedPosts)

          .map(
            (property)=>(

            <div
              key={property.id}
              className="bg-[#111827] rounded-[25px] overflow-hidden"
            >

              <img
                src={property.image}
                alt=""
                className="w-full h-52 object-cover"
              />

              <div className="p-5">

                <h2 className="font-bold text-xl">

                  {property.title}

                </h2>

                <p className="text-gray-400">

                  📍 {property.location}

                </p>

                <p className="text-yellow-400 font-bold mt-3">

                  {property.price}

                </p>

                <Link
                  to={`/property/${property.id}`}
                >

                  <button className="w-full mt-4 bg-yellow-400 text-black py-3 rounded-xl">

                    View Details

                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Profile;