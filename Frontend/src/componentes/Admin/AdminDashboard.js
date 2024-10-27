import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Compartido/Footer'; // Asegúrate de importar el Footer

const AdminDashboard = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow p-4">
                <h1 className="text-2xl font-bold">Panel de Administración</h1>
            </header>

            <div className="flex flex-1">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md">
                    <nav className="mt-4">
                        <ul>
                            <li>
                                <Link to="/admin/dashboard" className="block p-4 hover:bg-gray-200">Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/admin/profile" className="block p-4 hover:bg-gray-200">Perfil</Link>
                            </li>
                            <li>
                                <Link to="/admin/users" className="block p-4 hover:bg-gray-200">Usuarios</Link>
                            </li>
                            <li>
                                <Link to="/admin/products" className="block p-4 hover:bg-gray-200">Productos</Link>
                            </li>
                            <li>
                                <Link to="/admin/orders" className="block p-4 hover:bg-gray-200">Pedidos</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <h1 className="text-4xl font-bold">Bienvenido al Panel de Administración</h1>
                    <p className="mt-4">Aquí puedes gestionar usuarios, productos, pedidos, y más.</p>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AdminDashboard;
