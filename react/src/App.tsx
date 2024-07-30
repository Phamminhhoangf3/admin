import "antd/lib/button/style";
import './i18n/config';
import RouteElements from "./routers";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <RouteElements />
    </BrowserRouter>
  );
}

export default App;
