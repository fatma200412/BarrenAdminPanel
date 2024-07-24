import Dashboard from "../pages/admin/dashboard/index";
import Events from "../pages/admin/events";
import Promotion from "../pages/admin/promotion";
import ContactList from "../pages/admin/contactList";
import Payouts from "../pages/admin/payouts";
import Reports from "../pages/admin/reports";
import AdminRoot from "../pages/admin/adminRoot";
import MyTeam from "../pages/admin/myTeam";
import Login from "../pages/admin/login";
import NoPage from "../pages/noPage";

export const routes = [
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "/admin/events",
        element: <Events />,
      },
      {
        path: "/admin/promotion",
        element: <Promotion />,
      },
      {
        path: "/admin/contactList",
        element: <ContactList />,
      },
      {
        path: "/admin/payouts",
        element: <Payouts />,
      },
      {
        path: "/admin/reports",
        element: <Reports />,
      },

      {
        path: "/admin/about",
        element: <Dashboard />,
      },
      {
        path: "/admin/myteam",
        element: <MyTeam />,
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <NoPage />,
  },
];
