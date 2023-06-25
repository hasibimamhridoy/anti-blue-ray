import { useCallback, useEffect, useState } from "react";
import SectionTitle from "../../shared/SectionTitle/SectionTitle";

const AdminOrders = () => {
  const [order, setOrder] = useState([]);
  const [allOrders, setAllOrders] = useState(true);
  const [regularOrders, setRegularOrders] = useState(false);
  const [expressOrders, setExpressOrders] = useState(false);
  const [countDocumentsState, setCountDocumentState] = useState();

  const handleAllOrders = useCallback(() => {
    setAllOrders(true);
    setRegularOrders(false);
    setExpressOrders(false);
    fetchData();
  },[]);

  const handleRegularOrders = () => {
    setAllOrders(false);
    setRegularOrders(true);
    setExpressOrders(false);
    fetchData("regularType=regular");
  };
  const handleExpressOrders = () => {
    setAllOrders(false);
    setRegularOrders(false);
    setExpressOrders(true);
    fetchData("expressType=regular");
  };

  //here is pagination
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(4);
  const pages = parseInt(Math.ceil(countDocumentsState / pageLimit));
  console.log(pages);
  const pageButton = [];
  for (let index = 0; index < pages; index++) {
    pageButton.push(index);
  }

  const handlePreviousPage = () => {
    if (currentPage == 0) {
      setCurrentPage(0);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage == Math.max(...pageButton)) {
      setCurrentPage(Math.max(...pageButton));
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage,pageLimit]);

  async function fetchData(orderType) {
    try {
      const response = await fetch(
        `https://anti-blue-ray-server.vercel.app/allOrders?${orderType}&page=${currentPage}&limit=${pageLimit}`
      );
      const data = await response.json();
      setOrder(data);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  }

  useEffect(() => {
    countDocument();
  }, []);

  async function countDocument() {
    try {
      const response = await fetch(
        `https://anti-blue-ray-server.vercel.app/allOrders/countDocuments`
      );
      const data = await response.json();
      setCountDocumentState(data.count);
    } catch (error) {
      console.log("Error fetching order details:", error);
    }
  }

  return (
    <div className="w-full">
      <SectionTitle title="Admin Dashboard"></SectionTitle>
      <div className="">
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

          {allOrders && <div className="flex justify-center px-5 mt-5">
            <nav aria-label="Page navigation example">
              <ul className="flex gap-y-7 flex-wrap flex-shrink flex-grow -space-x-px">
                <li>
                  <a
                    onClick={handlePreviousPage}
                    className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Previous
                  </a>
                </li>

                {pageButton.map((btn) => {
                  return (
                    <li onClick={() => setCurrentPage(btn)} key={btn}>
                      <a
                        className={`px-3 py-2 leading-tight text-gray-500 border dark:bg-gray-800 cursor-pointer dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                          currentPage === btn &&
                          "bg-purple-700 text-white border-none hover:bg-purple-700 border border-white hover:text-white"
                        }`}
                      >
                        {btn}
                      </a>
                    </li>
                  );
                })}

                <li>
                  <a
                    onClick={handleNextPage}
                    className="px-3 mr-5 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Next
                  </a>
                </li>
                <div className="ml-3">
                  <select
                    onChange={(e) => setPageLimit(e.target.value)}
                    id="countries"
                    className="bg-gray-50 -mt-2 w-[3.5rem] text-gray-900 text-sm rounded-lg  block p-2.5"
                  >
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
              </ul>
            </nav>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
