import { Outlet } from "react-router-dom";

import Navbar from "@components/Navbar";

function AppLayout() {
  return (
    <div className="bg-gray-950 text-gray-50 flex flex-col h-screen">
      <Navbar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
