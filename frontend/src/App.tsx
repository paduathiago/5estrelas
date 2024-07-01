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
import { useCookies } from "react-cookie";
import Favorites from "./routes/favourites/Favourites";
import UserEstablishments from "./routes/user-establishments/UserEstablishments";

function App() {
  const [cookies] = useCookies();

  const loggedIn = cookies.AuthToken;
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
          {loggedIn && (
            <>
              <Route path="/new-establishment" element={<NewEstablishment />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/my-services" element={<UserEstablishments />} />
            </>
          )}
          <Route path="*" element={<div>404 not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
