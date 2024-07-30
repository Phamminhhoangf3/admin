import "antd/lib/button/style";
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
