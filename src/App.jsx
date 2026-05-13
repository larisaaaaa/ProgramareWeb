import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './Navbar.jsx'
import NotFound from './pages/NotFound.jsx';
import About from './pages/About.jsx';
import ProjectList from './ProjectList.jsx';

function App() {
 return (
 <BrowserRouter>
 <Navbar />
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/projects" element={<Projects />} />
 <Route path="/contact" element={<Contact />} />
 <Route path="*" element={<NotFound />} />
 <Route path="/about" element={<About />} />
 </Routes>

 </BrowserRouter>
 );
}
export default App;