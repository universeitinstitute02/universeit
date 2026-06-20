import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AddressNavbar from "../components/clientSide/AddressNavbar/AddressNavbar";
import Navbar from "../components/clientSide/Navbar/Navbar";
import Footer from "../components/clientSide/Footer/Footer";
import WhatsAppButton from "../components/clientSide/WhatsAppButton";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <div className="relative bg-white">
      <AddressNavbar />
      <header className="sticky top-0 z-40">
        <Navbar />
      </header>
      <main>
      <Outlet></Outlet>
      </main>
      <footer>
      <Footer />
      </footer>
      <WhatsAppButton></WhatsAppButton>
    </div>
  );
};

export default MainLayout;
