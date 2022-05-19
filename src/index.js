import ReactDOM from "react-dom/client";
import { Provider } from "react-redux"; //must be imported to use store
import "./index.css";
import App from "./App";
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
); //provide store to app
