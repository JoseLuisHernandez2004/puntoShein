// src/componentes/Admin/ListaPedidos.js
import React, { useState, useEffect } from 'react';

const ListaPedidos = () => {
  const [orders, setOrders] = useState([]); // Estado para almacenar la lista de pedidos
  const [loading, setLoading] = useState(true); // Estado para manejar el indicador de carga

  // Simulación de carga de datos desde una API
  useEffect(() => {
    // Aquí iría la llamada a una API para obtener los pedidos (ejemplo: fetch o axios)
    const fetchOrders = async () => {
      try {
        setLoading(true);
        // Ejemplo de datos estáticos
        const ordersData = [
          { id: 1, customer: 'Juan Pérez', total: 59.99, status: 'Pendiente' },
          { id: 2, customer: 'María López', total: 89.99, status: 'Completado' },
          { id: 3, customer: 'Carlos García', total: 120.49, status: 'En Proceso' }
        ];
        // Simulando tiempo de carga
        setTimeout(() => {
          setOrders(ordersData);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error al cargar los pedidos:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold text-gray-800">Lista de Pedidos</h1>
      {loading ? (
        <p className="mt-4 text-gray-600">Cargando pedidos...</p>
      ) : (
        <div className="mt-8">
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map(order => (
                <li key={order.id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
                  <p className="text-lg font-bold">Cliente: {order.customer}</p>
                  <p className="text-gray-600">Total: ${order.total.toFixed(2)}</p>
                  <p className="text-gray-600">Estado: {order.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No se encontraron pedidos.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ListaPedidos;