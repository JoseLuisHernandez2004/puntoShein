import React from 'react';

const Home = ({ isLoggedIn }) => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow mt-16">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">Punto Shein</h2>
        <p className="text-lg text-gray-600 mb-10">La mejor tienda de ropa y accesorios en línea</p>
        
        {/* Image Section */}
        <div className="w-full max-w-4xl">
          <img
            src=""
            alt="Product showcase"
            className="w-full h-auto object-cover rounded-lg shadow-lg" 
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
