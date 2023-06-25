import React, { useContext, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../ContextProvider/AuthContextProvider";
import { toast } from "react-toastify";

const BuyNow = () => {
  const product = useLoaderData();
  const {user} = useContext(AuthContext)
  const { _id, name, color, price, description, image } = product;

  const [regular, setRegular] = useState("");
  const [express, setExpress] = useState(false);
  const [expressPrice, setExpressPrice] = useState("");

  const hanldeExpress = (value) => {
    setExpress(!express);

    console.log(value);

    if (value === "express") {
      const newPrice = price + 5;
      setExpressPrice(newPrice.toFixed(2));
      console.log(expressPrice);
    }

    if (value === "regular") {
      setExpressPrice("");
    }
  };

  const handelPlaceOrder = async () => {
    const userEmail = user?.email
    const orderProduct = { expressPrice, productid: _id, name, image, price,userEmail,color };
    try {
      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderProduct),
      });

      if (response.ok) {
        console.log("Place order successfully !");
        toast.success('Place order successfully !', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      } else {
        console.log("Product creation failed!");
      }
    } catch (error) {
      console.log("Error sending the POST request:", error);
    }
  };

  return (
    <div className="relative flex flex-col lg:w-3/5 lg:h-[30rem] w-full h-full mx-auto rounded-xl bg-gray-700 bg-clip-border text-white shadow-md">
      <div className="relative mx-4 mt-4  overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700">
        <img src={image} className="h-full w-full object-cover" />
      </div>
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="block font-sans text-lg font-medium leading-relaxed text-blue-gray-900 antialiased">
            {name}
          </p>
          <p className="block font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
            ${price}
          </p>
        </div>
        <p className="block font-sans text-sm font-normal leading-normal text-white antialiased opacity-75">
          {description}
        </p>

        <div className="mt-2">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-white dark:text-white"
          >
            Select Delivary Options?
          </label>
          <select
            onChange={(e) => hanldeExpress(e.target.value)}
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none block  p-2.5"
          >
            {/* <option selected disabled>
              Choose{" "}
            </option> */}
            <option selected value="regular">
              Regular Delivary
            </option>
            <option value="express">Express Delivary</option>
          </select>
          {expressPrice && (
            <p className="text-yellow-400 mt-2">
              You Select Express Delivary. It cost additinally 5 doller.
            </p>
          )}

          <div className="mt-2">
            <h1>Order Summary</h1>
            <hr className="w-32 mt-1" />
            Price : {price}
            {expressPrice && (
              <p className="text-yellow-400">Express Additinal Charge : $5</p>
            )}
            {expressPrice && (
              <p className="text-yellow-400">Total Price : {expressPrice}</p>
            )}
            {!expressPrice && (
              <p className="text-yellow-400">Total Price : {price}</p>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <button
          onClick={handelPlaceOrder}
          className="block w-full select-none rounded-lg bg-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default BuyNow;
