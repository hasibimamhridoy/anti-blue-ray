import React, { useEffect } from "react";
import { useLoaderData, useLocation } from "react-router-dom";
const ProductsDetails = () => {
  const product = useLoaderData();
  
  const loc = useLocation();
  const {
    category_id,
    description,
    name,
    picture,
    price,
    quantity,
    rating,
    seller_email,
    seller_name,
    sub_category,
    _id,
  } = product;

  useEffect(() => {
    loc.state = product.name;
  }, [product]);

  useEffect(() => {
    if (loc.state) {
      document.title = `HeroVerse - ${loc.state}`;
    }
  }, [loc.pathname]);

  return (
    <div>
      <h1 className="text-xl text-center lg:w-2/4 mx-auto lg:my-10 my-5 lg:text-3xl text-white font-semibold">
        {name}
      </h1>
      <div className="flex flex-col lg:flex lg:flex-row gap-5 justify-between">
        <div className="relative h-full lg:w-[65%]">
          <img
            className="w-full border border-purple-800 opacity-75 rounded-xl lg:h-96 h-52"
            src={picture}
            alt=""
          />
          <span className="absolute top-0 right-0 p-5 text-white">Hello</span>
          <div className="desc">
            <div className="flex items-center justify-between">
              <h1 className="text-xl lg:my-5 my-3 lg:text-xl text-white font-semibold">
                Description
              </h1>

              <div className="flex items-center gap-4">
                <span className="flex w-3 h-3 bg-yellow-300 rounded-full"></span>
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  {sub_category}
                </span>
              </div>
            </div>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
        <div className="h-full lg:w-[35%]">
          <div className="lg:h-96 p-5 bg-purple-800 rounded-lg">
            <h1 className=" text-lg text-justify text-gray-100">{name}</h1>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>

            <div className="space-y-2">
              <h1 className="text-gray-300">
                Seller Name :{" "}
                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  {seller_name}
                </span>{" "}
              </h1>
              <h1 className="text-gray-300">
                Seller Email :{" "}
                <span className="bg-yellow-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  {seller_email}
                </span>{" "}
              </h1>

              <h1 className="text-gray-300">
                Quantity :
                <span className="bg-yellow-100 ml-3 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                  {quantity}
                </span>
              </h1>
            </div>

            <div className="mt-5">
              <div className="flex items-center">
                <Rating name="read-only" value={rating} readOnly />
                <span className="text-center text-gray-200 mt-1 ml-2">
                  {rating}
                </span>
              </div>

              <div className="mt-5">
                <span className="text-2xl font-bold text-white border py-2 px-3 rounded-full dark:text-white">
                  $ {price}
                </span>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  className="text-black w-full hover:bg-gray-100 bg-white  focus:outline-none  dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
