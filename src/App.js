import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import MainLayout from "./components/mainLayout";
import Home from "./pages/home"
import NewBlog from "./pages/newBlogs";
import AuthForm from "./login/AuthForm";
import BlogDetails from "./components/blogDetails";
import CreateBlog from "./components/create";
import Profile from "./pages/profiles";



function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/login" element={<AuthForm/>}/>
        <Route  path="/" element={<MainLayout><Home/></MainLayout>}/>
        <Route path="newblog" element={<MainLayout><NewBlog/></MainLayout>}/>
        <Route path="/:id" element={<MainLayout><BlogDetails/></MainLayout>}/>
        <Route path="/create" element={<MainLayout><CreateBlog/></MainLayout>}/>
        <Route path="/profile/:userId" element={<MainLayout><Profile /></MainLayout>}/>
      </Routes>
    </Router>
  );
}

export default App;
