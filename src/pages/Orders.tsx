
import { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total: string;
  items: {
    name: string;
    quantity: number;
    price: string;
  }[];
}

export default function Orders() {
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const orders: Order[] = [
    {
      id: 'CMD-001',
      date: '15 Juin 2023',
      status: 'delivered',
      total: '24500 FCFA',
      items: [
        { name: 'Poulet Yassa', quantity: 2, price: '8500 FCFA' },
        { name: 'Alloco Poulet', quantity: 1, price: '7500 FCFA' }
      ]
    },
    {
      id: 'CMD-002',
      date: '22 Août 2023',
      status: 'delivered',
      total: '18700 FCFA',
      items: [
        { name: 'Thiéboudienne', quantity: 1, price: '9200 FCFA' },
        { name: 'Ndolé', quantity: 1, price: '8800 FCFA' },
        { name: 'Jus d\'orange', quantity: 1, price: '700 FCFA' }
      ]
    },
    {
      id: 'CMD-003',
      date: '10 Octobre 2023',
      status: 'cancelled',
      total: '15500 FCFA',
      items: [
        { name: 'Mafé', quantity: 1, price: '9500 FCFA' },
        { name: 'Fufu et Sauce Gombo', quantity: 1, price: '6000 FCFA' }
      ]
    },
    {
      id: 'CMD-004',
      date: '05 Janvier 2024',
      status: 'pending',
      total: '10200 FCFA',
      items: [
        { name: 'Attieke Poisson', quantity: 1, price: '10200 FCFA' }
      ]
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'Livré';
      case 'pending':
        return 'En cours';
      case 'cancelled':
        return 'Annulé';
      default:
        return status;
    }
  };

  const toggleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="pb-24 p-4">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-primary mb-6"
      >
        <ChevronLeft size={20} className="mr-1" />
        Retour
      </button>

      <h1 className="text-2xl font-bold mb-6 text-gray-800">Mes Commandes</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-xl shadow-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <ShoppingBag size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande</h3>
          <p className="text-gray-500">Vous n'avez pas encore passé de commande.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => toggleOrderExpand(order.id)}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{order.id}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{order.date}</div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-3">{order.total}</span>
                  {expandedOrder === order.id ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="text-sm font-medium text-gray-700 mb-2">Détails de la commande</div>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                          <span className="text-gray-800">{item.name}</span>
                          <span className="text-xs text-white bg-primary/80 rounded-full h-5 w-5 flex items-center justify-center ml-2">
                            {item.quantity}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-800">{item.price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 pt-3 border-t border-gray-200">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-primary">{order.total}</span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    {order.status === 'pending' && (
                      <button className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition-colors">
                        Annuler la commande
                      </button>
                    )}
                    <button className="ml-3 px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-primary/90 transition-colors">
                      Détails complets
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { ShoppingBag } from 'lucide-react';
