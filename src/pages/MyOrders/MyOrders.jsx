import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../ContextProvider/AuthContextProvider";

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://anti-blue-ray-server.vercel.app/myOrders/${user?.email}`
      );
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  }

  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="lg:w-2/4 rounded-lg mx-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Product name
            </th>
            <th scope="col" className="px-6 py-3">
              Color
            </th>
            <th scope="col" className="px-6 py-3">
              Delivary Method
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {order.map((od) => {
            return (
              <tr
                key={od._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {od.name}
                </th>
                <td className="px-6 py-4">{od.color}</td>
                
                <td className="px-6 py-4">{od.expressPrice ? "Express Delivary" : ""}</td>
                
                <td className="px-6 py-4">{od.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
