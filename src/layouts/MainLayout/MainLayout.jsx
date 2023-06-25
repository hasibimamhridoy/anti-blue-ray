import React, { useContext, useEffect, useState } from "react";
import NavigationBar from "../../shared/NavigationBar/NavigationBar";
import FooterBar from "../../shared/FooterBar/FooterBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const MainLayout = () => {
  const loc = useLocation();

useEffect(()=>{

    if (loc.pathname == '/login') {

         document.title = "HeroVerse - LOGIN"
   }

    else if (loc.state) {
          document.title = `HeroVerse - ${loc.state}`
    }

    else if (loc.pathname === '/') {

         document.title = "HeroVerse - Home"
    }
   
    else{
         document.title = `HeroVerse ${loc.pathname.toUpperCase()}`.replace('/','-')
    }

},[loc.pathname,loc.state])
  

  return (
    <div className="bg-gray-900 lg:px-16 px-2">
      <ScrollRestoration></ScrollRestoration>
      <div>
        <NavigationBar></NavigationBar>
      </div>
      <div className="mt-2 lg:mb-20 mb-10">
        <Outlet></Outlet>
      </div>
      <div>
        <FooterBar></FooterBar>
      </div>
    </div>
  );
};

export default MainLayout;
