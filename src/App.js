import {BrowserRouter as Router, Routes,Route } from "react-router-dom";
import MainLayout from "./components/mainLayout";
import Home from "./pages/home"
import NewBlog from "./pages/newBlogs";
import AuthForm from "./login/AuthForm";
import BlogDetails from "./components/blogDetails";
import Profile from "./pages/profiles";
import BlogCreateSection from "./components/BlogCreateSection";
import EditBlog from "./components/edditBlog";


function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/login" element={<AuthForm/>}/>
        <Route  path="/" element={<MainLayout><Home/></MainLayout>}/>
        <Route path="/newblog" element={<MainLayout><NewBlog/></MainLayout>}/>
        <Route path="/:id" element={<MainLayout><BlogDetails/></MainLayout>}/>
        <Route path="/profile/:userId" element={<MainLayout><Profile /></MainLayout>}/>
        <Route path="/create" element={<MainLayout><BlogCreateSection /></MainLayout>}/>
        <Route path="/edit/:id" element={<MainLayout><EditBlog /></MainLayout>}/>
      </Routes>
    </Router>
  );
}

export default App;
