import { Dashboard } from "../pages/admin/dashboard/index";
import { Events } from "../pages/admin/events";
import { Promotion } from "../pages/admin/promotion";
import { ContactList } from "../pages/admin/contactList";
import { Payouts } from "../pages/admin/payouts";
import { Reports } from "../pages/admin/reports";
import AdminRoot from "../pages/admin/adminRoot";
import Login from "../pages/admin/login";
import NoPage from "../pages/noPage";
import Register from "../pages/admin/register";
import ForgetPassword from "../pages/forgetPassword";
import MyProfile from "../pages/admin/myProfile";
import About from "../pages/admin/about";
import CreateNewEvent from "../pages/admin/createNewEvent";
import CreateOnlineAndVenueEvent from "../pages/admin/createOnlineAndVenueEvent";
import ProtectedRoute from "../protectedRoute";

export const routes = [
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        element: (
          <ProtectedRoute element={<Dashboard />} allowedRoles={["admin"]} />
        ),
      },
      {
        path: "/admin/events",
        element: (
          <ProtectedRoute element={<Events />} allowedRoles={["admin"]} />
        ),
      },
      {
        path: "/admin/promotion",
        element: (
          <ProtectedRoute element={<Promotion />} allowedRoles={["admin"]} />
        ),
      },
      {
        path: "/admin/contactList",
        element: (
          <ProtectedRoute element={<ContactList />} allowedRoles={["admin"]} />
        ),
      },
      {
        path: "/admin/payouts",
        element: (
          <ProtectedRoute element={<Payouts />} allowedRoles={["admin"]} />
        ),
      },
      {
        path: "/admin/reports",
        element: (
          <ProtectedRoute element={<Reports />} allowedRoles={["admin"]} />
        ),
      },

      {
        path: "/admin/about",
        element: (
          <ProtectedRoute element={<About />} allowedRoles={["admin"]} />
        ),
      },
    ],
  },
  {
    path: "/createNewEvent",
    element: <CreateNewEvent />,
  },
  {
    path: "/createNewEvent/create",
    element: <CreateOnlineAndVenueEvent />,
  },
  {
    path: "/myProfile",
    element: <MyProfile />,
  },
  {
    path: "*",
    element: <NoPage />,
  },
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/forgetpass",
    element: <ForgetPassword />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
