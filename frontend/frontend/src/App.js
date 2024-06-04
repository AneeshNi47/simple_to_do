import Header from "./components/layout/header";
import Dashboard from "./components/tasks/Dashboard";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/layout/PrivateRoute";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/" element={<PrivateRoute element={Dashboard} />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
