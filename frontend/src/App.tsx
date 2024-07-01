import {
  BrowserRouter,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Layout from "./routes/Layout";
import MainPage from "./routes/main-page/MainPage";
import Establishments from "./routes/establishments/Establishments";
import Establishment from "./routes/establishment/Establishment";
import UserProfile from "./routes/user-profile/UserProfile";
import Login from "./routes/login/Login";
import Register from "./routes/register/Register";
import NewEstablishment from "./routes/new-establishment/NewEstablishment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/establishments/:category"
            element={<Establishments />}
          />
          <Route
            path="/establishments/:category/:id"
            element={<Establishment />}
          />
          <Route path="/user/:id" element={<UserProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-establishment" element={<NewEstablishment />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
