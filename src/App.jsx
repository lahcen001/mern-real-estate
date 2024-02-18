import React from 'react'
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import About from './pages/About'
import CreateListining from './pages/CreateListining'
import Header from './components/Header'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import UpdateListing from './pages/UpdateListing'
import Listing from './pages/Listing'
import Search from './pages/Search'
import Footer from './pages/Footer'
export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-r from-slate-300 to-slate-50">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/about" element={<About />} />
          <Route path="/create/:id" element={<CreateListining />} />
          <Route path="/listings/:id" element={<Listing />} />
          <Route path="/search" element={<Search />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/update-listing/:id" element={<UpdateListing />} />
            <Route />
          </Route>
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
