"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Mail, Package, Trash2, RefreshCw } from "lucide-react";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
  createdAt: string;
}

interface OrderSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  projectDescription: string;
  references: string;
  package: {
    name: string;
    price: number;
  };
  createdAt: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"contacts" | "orders">("contacts");
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [orders, setOrders] = useState<OrderSubmission[]>([]);

  const loadData = () => {
    if (typeof window !== "undefined") {
      const savedContacts = localStorage.getItem("contactSubmissions");
      const savedOrders = localStorage.getItem("orderSubmissions");
      
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      }
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteContact = (id: string) => {
    const updated = contacts.filter((c) => c.id !== id);
    setContacts(updated);
    localStorage.setItem("contactSubmissions", JSON.stringify(updated));
  };

  const handleDeleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    setOrders(updated);
    localStorage.setItem("orderSubmissions", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (activeTab === "contacts") {
      setContacts([]);
      localStorage.removeItem("contactSubmissions");
    } else {
      setOrders([]);
      localStorage.removeItem("orderSubmissions");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-10 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-[#e11d48] font-semibold text-sm uppercase tracking-wider">Admin Panel</span>
            <h1 className="text-4xl md:text-5xl font-black text-white mt-4 mb-4">
              Dashboard
            </h1>
            <p className="text-white/70">
              View and manage contact submissions and orders
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("contacts")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all {
                  activeTab === "contacts"
                    ? "bg-[#e11d48] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Mail size={18} />
                Contacts ({contacts.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all {
                  activeTab === "orders"
                    ? "bg-[#e11d48] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Package size={18} />
                Orders ({orders.length})
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={loadData}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100 transition-colors"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            </div>
          </div>

          {activeTab === "contacts" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {contacts.length === 0 ? (
                <div className="p-12 text-center">
                  <Mail size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Contact Submissions</h3>
                  <p className="text-gray-500">Contact form submissions will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Phone</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Service</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Message</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{contact.name}</td>
                          <td className="py-4 px-6 text-gray-600">{contact.email}</td>
                          <td className="py-4 px-6 text-gray-600">{contact.phone}</td>
                          <td className="py-4 px-6">
                            <span className="bg-[#e11d48]/10 text-[#e11d48] px-3 py-1 rounded-full text-sm">
                              {contact.serviceType || "General"}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600 max-w-xs truncate">{contact.message}</td>
                          <td className="py-4 px-6 text-gray-500 text-sm">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "orders" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              {orders.length === 0 ? (
                <div className="p-12 text-center">
                  <Package size={48} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Orders</h3>
                  <p className="text-gray-500">Order submissions will appear here.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Name</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Business</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Email</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Phone</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Package</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id} className="border-b hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{order.name}</td>
                          <td className="py-4 px-6 text-gray-600">{order.businessName}</td>
                          <td className="py-4 px-6 text-gray-600">{order.email}</td>
                          <td className="py-4 px-6 text-gray-600">{order.phone}</td>
                          <td className="py-4 px-6">
                            <span className="bg-[#e11d48]/10 text-[#e11d48] px-3 py-1 rounded-full text-sm">
                              {order.package?.name}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-bold text-gray-900">
                            ₹{order.package?.price?.toLocaleString()}
                          </td>
                          <td className="py-4 px-6 text-gray-500 text-sm">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-6">
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
