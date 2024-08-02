import React from 'react';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import Read from './components/Read';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/create' element = {<Create/>}/>
        <Route path='/update/:id' element = {<Update/>}/>
        <Route path='/delete/:id' element = {<Read/>}/>
        <Route/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
