import "./App.css";
import About from "./pages/admin/about";
import ContactList from "./pages/admin/contactList";
import ConversionSetup from "./pages/admin/conversionSetup";
import Dashboard from "./pages/admin/dashboard";
import Events from "./pages/admin/events/indedx";
import Payouts from "./pages/admin/payouts";
import Promotion from "./pages/admin/promotion";
import Reports from "./pages/admin/reports";
import Subscription from "./pages/admin/subscription";

function App() {
  return (
    <>
      <Dashboard />
      <Events />
      <Promotion />
      <ContactList />
      <Payouts />
      <Reports />
      <Subscription />
      <ConversionSetup />
      <About />
    </>
  );
}

export default App;
