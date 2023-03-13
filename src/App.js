import React from 'react';
import Banner from './component/Banner';
import Navbar from './component/Navbar';
import Movies from './component/Movies';
import Favourite from './component/Favourite';
import {Routes,BrowserRouter as Router,Switch,Route, BrowserRouter} from 'react-router-dom';
import './App.css';


function App() {
  return (
     <BrowserRouter>
     <Navbar/>
      <Routes>
          <Route path='/' element={
            <>
            <Banner/>
            <Movies/>
            </>
          }/>
          <Route path='/favourites' element={<Favourite/>}/>
        {/* <Banner/> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
