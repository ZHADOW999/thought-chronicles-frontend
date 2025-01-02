import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import React, { Suspense } from "react";
import MainLayout from "./components/mainLayout";
// import Home from "./pages/home"

import EditBlog from "./components/editBlog";
import AuthForm from "./login/AuthForm";
import NotFound from "./pages/404 page/404page";
// import BlogDetails from "./components/blogDetails";
// import Profile from "./pages/profiles";
// import BlogCreateSection from "./components/BlogCreateSection";
// import Stories from "./pages/stories"; 
// import Library from "./pages/libraries";


function App() {
const Home = React.lazy(()=>import("./pages/home"))
const BlogDetails = React.lazy(()=> import("./components/blogDetails"))
const Profile = React.lazy(()=> import("./pages/profiles"))
const BlogCreateSection = React.lazy(()=> import("./components/BlogCreateSection"))
const Stories = React.lazy(()=> import("./pages/stories"))
const Library = React.lazy(()=> import("./pages/libraries"))

  return (
    <Router>
      <Suspense fallback={<p ></p>}>
      <Routes>
        <Route exact path="/login" element={<AuthForm/>}/>
          <Route  path="/" element={<MainLayout><Home/></MainLayout>}/>
          <Route path="/:id" element={<MainLayout><BlogDetails/></MainLayout>}/>
          <Route path="/profile/:userId" element={<MainLayout><Profile /></MainLayout>}/>
          <Route path="/create" element={<MainLayout><BlogCreateSection /></MainLayout>}/>
          <Route path="/edit/:id" element={<MainLayout><EditBlog /></MainLayout>}/>
          <Route path="/stories" element={<MainLayout><Stories /></MainLayout>}/>
          <Route path="/library" element={<MainLayout><Library /></MainLayout>}/>
          <Route path="*" element={<NotFound/>}/>
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
