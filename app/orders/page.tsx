"use client";
import React, { useEffect, useState } from "react";
import { getOrders } from "../services/orderServices";

const ordersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  useEffect(() => {
    async function getAllOrders() {
      const response = await getOrders();
      const orders = await response.json();
      setOrders(orders);
    }
    getAllOrders();
  }, []);
  return (
    <div className="container mx-auto mt-10">
      <div className="bg-white shadow-md rounded my-6">
        <table className="text-left w-full border-collapse">
          <thead>
            <tr>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-gray-900 border-b border-grey-light">
                Order Number
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-gray-900 border-b border-grey-light">
                Date
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-gray-900 border-b border-grey-light">
                Total
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-gray-900 border-b border-grey-light">
                Items
              </th>
              <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-gray-900 border-b border-grey-light">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((orderItem: any) => {
              return (
                <tr key={orderItem.orderId} className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light text-gray-900">
                    {`${orderItem.orderId}`}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-gray-900">
                    {orderItem.date}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-gray-900">
                    €{`${orderItem.total}`}
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-gray-900">
                    3 Items
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-gray-900">
                    <a
                      href={`/orders/${orderItem.orderId}`}
                      className="text-blue-500 hover:text-blue-800"
                    >
                      View
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ordersPage;
