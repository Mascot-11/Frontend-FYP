import { Outlet,} from "react-router-dom";
import AdminSidebar from "./Adminsidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-grow p-4 ml-64">
        <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
