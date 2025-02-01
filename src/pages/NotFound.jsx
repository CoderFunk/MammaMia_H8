import React from 'react'
import { Link } from 'react-router-dom';

const E404 = () => {
  return (
    <div id='E404'>
        
        <Link to="/">
        <button className='mt-3' > Volver a inicio </button>
        </Link>

        <div className="e404"></div>
        
    </div>
  )
}

export default E404;