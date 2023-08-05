import React from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Home from './features/Notes/Home';
import AddNotes from './features/Notes/AddNotes';
import Edit from './features/Notes/Edit';
import Login from './features/Authcation/Login';
import Signup from './features/Authcation/Signup';

function App() {
  return (
    <div className="App">

   
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/DisplayData' element={<Home/>}/>
    <Route path='/AddNote' element={<AddNotes/>}/>
    <Route path='/Edit/:id' element={<Edit/>}/>
   </Routes>
    </div>
  );
}

export default App;
