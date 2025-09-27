import { Outlet } from "react-router-dom";
import Header from "../public/Header";

function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}

export default PublicLayout;
