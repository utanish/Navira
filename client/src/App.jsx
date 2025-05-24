import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage";
import Wizard from "./components/Wizard/Wizard";
import Preview from "./components/Preview/Preview";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<Wizard />} />
            <Route path="/preview/:id" element={<Preview />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
