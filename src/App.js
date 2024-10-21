import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/nav/NavBar';
import AnimeDetails from './pages/AnimeD/animeDetails';
import Overview from './pages/AnimeD/UI/Overview';
import Characters from './pages/AnimeD/UI/Characters';
import Staff from './pages/AnimeD/UI/Staff';
import Reviews from './pages/AnimeD/UI/Reviews';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:id" element={<AnimeDetails />}>
            {/* default of the animeDetails Oulet */}
            <Route index element={<Navigate to="Overview" />} />
            <Route path="Overview" element={<Overview />} />
            <Route path="Characters" element={<Characters />} />
            <Route path="Staff" element={<Staff />} />
            <Route path="Reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
