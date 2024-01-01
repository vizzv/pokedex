import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import PokemonDetails from './PokemonDetails.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Routes>
        <Route path="pokemon/:id" element={<PokemonDetails/>} />
        <Route eaxact path="/" element={<App />}>
        
        </Route>
      </Routes>
    </BrowserRouter>
)
