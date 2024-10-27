import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md h-screen">
                <div className="p-4">
                    <h1 className="text-2xl font-bold">Panel de Usuario</h1>
                </div>
                <nav className="mt-6">
                    <ul>
                        <li>
                            <Link to="/user/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                                Mis Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/products" className="block py-2 px-4 text-gray-700 hover:bg-gray-200">
                                Productos
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100">
                <h2 className="text-3xl font-bold">Bienvenido al Panel de Usuario!</h2>
                <p className="mt-2">Aquí puedes ver productos, revisar tus pedidos, y gestionar tu cuenta.</p>
                
                <div className="bg-white shadow-md rounded-lg p-6 mt-6">
                    <h3 className="text-xl font-semibold mb-4">Opciones disponibles</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link to="/products" className="text-blue-500 hover:underline">
                                Ver Productos
                            </Link>
                        </li>
                        <li>
                            <Link to="/orders" className="text-blue-500 hover:underline">
                                Mis Pedidos
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="text-blue-500 hover:underline">
                                Gestionar Cuenta
                            </Link>
                        </li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default UserDashboard;
