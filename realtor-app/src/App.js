import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import AddProperty from "./pages/AddProperty";
import Profile from "./pages/Profile";
import Inbox from "./pages/Inbox";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PropertyDetails from "./pages/PropertyDetails";
import Favorites from "./pages/Favorites";
import EditProperty from "./pages/EditProperty";


import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

return(

<BrowserRouter>

<Navbar/>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/explore"
element={<Explore/>}
/>

<Route
path="/login"
element={<Login/>}
/>

<Route
path="/register"
element={<Register/>}
/>

<Route
path="/property/:id"
element={<PropertyDetails/>}
/>

<Route
path="/add-property"
element={

<ProtectedRoute>

<AddProperty/>

</ProtectedRoute>

}
/>

<Route
path="/profile"
element={

<ProtectedRoute>

<Profile/>

</ProtectedRoute>

}
/>

<Route
path="/inbox"
element={

<ProtectedRoute>

<Inbox/>

</ProtectedRoute>

}
/>

<Route
path="/favorites"
element={

<ProtectedRoute>

<Favorites/>

</ProtectedRoute>

}
/>

<Route
path="/edit-property/:id"
element={

<ProtectedRoute>

<EditProperty/>

</ProtectedRoute>

}
/>

<Route
path="/settings"
element={<Settings/>}
/>




</Routes>

</BrowserRouter>

);

}

export default App;