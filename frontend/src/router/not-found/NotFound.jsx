import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function NotFound() {

  return (
    <>
      <h2>No encontrado</h2>
      <Link to={"/"}>Regresar al inicio</Link>
      regreso a pagina principal
    </>


  )
}

export default NotFound
