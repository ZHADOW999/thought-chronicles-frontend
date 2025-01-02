import React from 'react';
import { Link } from 'react-router-dom';
import "./notFound.css"

const NotFound = () => {
  return (
<>
    <section className="error-container">
      <span className="four"><span className="screen-reader-text sr-only">4</span></span>
      <span className="zero"><span className="screen-reader-text sr-only">0</span></span>
      <span className="four"><span className="screen-reader-text sr-only">4</span></span>
    </section>
  
    <p className='text-3 capitalize font-roboto-bold  text-gray-800 mb-4 text-center'>Page not found.</p>
    <p className=' leading-tight  font-roboto-regular text-center text-lg text-gray-600 mb-6'>It's either the page was deleted or does not exist</p>
    <div className="link-container ">
      <Link target="_blank" to={'/'} className="more-link">Go back to home page</Link>
    </div>
</>
    
  );
};

export default NotFound;
