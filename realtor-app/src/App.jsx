import { BrowserRouter, Routes, Route } from "react-router-dom";

import PropertyProvider from "./context/PropertyContext";

import Home from "./pages/Home";
import Inbox from "./pages/Inbox";

/* your existing pages */
import Profile from "./pages/Profile";
import Saved from "./pages/Saved";
import PropertyDetails from "./pages/PropertyDetails";
import Notifications from "./pages/Notifications";
import EditProfile from "./pages/EditProfile";

function App() {

return(

<BrowserRouter>

<PropertyProvider>

<CallProvider>

<Routes>

{/* Main pages */}

<Route
path="/"
element={<Home/>}
/>

<Route
path="/inbox"
element={<Inbox/>}
/>

<Route
path="/profile"
element={<Profile/>}
/>

<Route
path="/saved"
element={<Saved/>}
/>

<Route
path="/property/:id"
element={<PropertyDetails/>}
/>

<Route
path="/notifications"
element={<Notifications/>}
/>

<Route
path="/edit-profile"
element={<EditProfile/>}
/>





</Routes>

</CallProvider>

</PropertyProvider>

</BrowserRouter>

);

}

export default App;