import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Plus, Minus, Trash2, Package, Truck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { MROItem } from '../types';
import { MOCK_MRO_ITEMS } from '../data/mockData';

export const MROCatalog: React.FC = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState<{ item: MROItem; quantity: number }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const categories = ['Todos', ...Array.from(new Set(MOCK_MRO_ITEMS.map(i => i.category)))];

    const filteredItems = MOCK_MRO_ITEMS.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || item.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const addToCart = (item: MROItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.item.id === item.id);
            if (existing) {
                return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { item, quantity: 1 }];
        });
    };

    const removeFromCart = (itemId: string) => {
        setCart(prev => prev.filter(i => i.item.id !== itemId));
    };

    const updateQuantity = (itemId: string, delta: number) => {
        setCart(prev => prev.map(i => {
            if (i.item.id === itemId) {
                const newQty = Math.max(1, i.quantity + delta);
                return { ...i, quantity: newQty };
            }
            return i;
        }));
    };

    const cartTotal = cart.reduce((sum, i) => sum + (i.item.price * i.quantity), 0);

    const handleCheckout = () => {
        setIsCheckingOut(true);
        // Simulate checkout process
        setTimeout(() => {
            alert('Orden de Compra Generada Exitosamente!');
            setCart([]);
            setIsCheckingOut(false);
        }, 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <Package className="w-8 h-8 mr-3 text-procure-600" />
                        Catálogo MRO
                    </h1>
                    <p className="text-gray-500 mt-1">Abastecimiento de Mantenimiento, Reparación y Operaciones</p>
                </div>

                {/* Cart Summary / Toggle */}
                <div className="relative group">
                    <button className="bg-white border border-gray-200 p-3 rounded-full shadow-sm hover:shadow-md transition-all relative">
                        <ShoppingCart className="w-6 h-6 text-gray-700" />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                                {cart.reduce((acc, i) => acc + i.quantity, 0)}
                            </span>
                        )}
                    </button>

                    {/* Dropdown Cart (Simple) */}
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 hidden group-hover:block z-50 p-4">
                        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Carrito de Compras</h3>
                        {cart.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-4">El carrito está vacío</p>
                        ) : (
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                {cart.map(({ item, quantity }) => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800 truncate">{item.name}</p>
                                            <p className="text-gray-500">{quantity} x ${item.price.toFixed(2)}</p>
                                        </div>
                                        <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between font-bold text-gray-900 mb-3">
                                        <span>Total:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full bg-procure-600 text-white py-2 rounded-lg font-medium hover:bg-procure-700 transition-colors flex justify-center items-center"
                                    >
                                        {isCheckingOut ? 'Procesando...' : 'Generar Orden'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-procure-500 focus:border-procure-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <Filter className="w-5 h-5 text-gray-500 mr-2" />
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat
                                ? 'bg-procure-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-8">
                {filteredItems.map(item => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 hover:shadow-lg hover:border-procure-300 transition-all duration-300 flex flex-col p-6 group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${item.category === 'Herramientas' ? 'bg-orange-100 text-orange-600' :
                                item.category === 'Seguridad' ? 'bg-red-100 text-red-600' :
                                    item.category === 'Eléctrico' ? 'bg-yellow-100 text-yellow-600' :
                                        item.category === 'Mecánico' ? 'bg-slate-100 text-slate-600' :
                                            'bg-blue-100 text-blue-600'
                                }`}>
                                <Package className="w-6 h-6" />
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${item.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                Stock: {item.stock}
                            </span>
                        </div>

                        <div className="flex-1">
                            <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{item.category}</div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg leading-tight group-hover:text-procure-600 transition-colors">
                                {item.name}
                            </h3>
                            <p className="text-sm text-gray-400 mb-4 flex items-center">
                                <Truck className="w-3 h-3 mr-1" /> {item.supplier}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                            <div className="flex flex-col">
                                <span className="text-xs text-gray-400">Precio Unitario</span>
                                <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => addToCart(item)}
                                className="bg-gray-50 text-gray-600 hover:bg-procure-600 hover:text-white p-2.5 rounded-lg transition-all transform active:scale-95"
                                title="Agregar al carrito"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
