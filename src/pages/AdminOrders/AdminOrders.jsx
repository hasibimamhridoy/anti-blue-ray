import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [allOrders, setAllOrders] = useState(true);
  const [regularOrders, setRegularOrders] = useState(false);
  const [expressOrders, setExpressOrders] = useState(false);

  const handleAllOrders = () => {
    setAllOrders(true);
    setRegularOrders(false);
    setExpressOrders(false);
    fetchData();
  };
  const handleRegularOrders = () => {
    setAllOrders(false);
    setRegularOrders(true);
    setExpressOrders(false);
    fetchData('regularType=regular');
  };
  const handleExpressOrders = () => {
    setAllOrders(false);
    setRegularOrders(false);
    setExpressOrders(true);
    fetchData('expressType=regular');
  };

  console.log(allOrders);
  console.log(regularOrders);
  console.log(expressOrders);

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData(orderType) {
    try {
      const response = await fetch(
        `http://localhost:5000/allOrders?${orderType}`
      );
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  }

  return (
    <div className="w-full">
      This is admin orders
      <div className="border">
        <div className="space-x-5 tabButton p-2 mx-auto">
          <div className="flex justify-center gap-5">
            <button
              onClick={() => handleAllOrders()}
              className={`${
                allOrders
                  ? "border-b-purple-500 transition duration-700 border-b-2 text-purple-500"
                  : "text-white"
              }`}
            >
              All Orders
            </button>
            <button
              onClick={() => handleRegularOrders()}
              className={`${
                regularOrders
                  ? "border-b-purple-500 transition duration-700 border-b-2 text-purple-500"
                  : "text-white"
              }`}
            >
              Regular Orders
            </button>
            <button
              onClick={() => handleExpressOrders()}
              className={`${
                expressOrders
                  ? "border-b-purple-500 transition duration-700 border-b-2 text-purple-500"
                  : "text-white"
              }`}
            >
              Express Orders
            </button>
          </div>

          <div className="relative overflow-x-auto rounded-lg mt-10">
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
                      <td className="px-6 py-4">{od.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
