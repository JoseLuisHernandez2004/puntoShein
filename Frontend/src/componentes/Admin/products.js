// src/componentes/Admin/Products.js
import React, { useState, useEffect } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar la lista de productos
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

  // Simulación de carga de datos desde una API
  useEffect(() => {
    // Aquí iría la llamada a una API para obtener los productos (ejemplo: fetch o axios)
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Ejemplo de datos estáticos
        const productsData = [
          { id: 1, name: 'Camiseta Deportiva', price: 19.99 },
          { id: 2, name: 'Pantalones de Yoga', price: 29.99 },
          { id: 3, name: 'Zapatillas de Running', price: 49.99 }
        ];
        // Simulando tiempo de carga
        setTimeout(() => {
          setProducts(productsData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
      {loading ? (
        <p className="mt-4 text-gray-600">Cargando productos...</p>
      ) : (
        <div className="mt-8">
          {products.length > 0 ? (
            <ul className="space-y-4">
              {products.map(product => (
                <li key={product.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <p className="text-lg font-bold">{product.name}</p>
                  <p className="text-gray-600">Precio: ${product.price.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No se encontraron productos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
