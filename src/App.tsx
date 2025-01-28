import { Route, Routes } from "react-router-dom";
// pages
import IndexPage from "@/pages/index";
import TurneePage from "@/pages/turnee";
import MagazinPage from "@/pages/magazin";
import AboutPage from "@/pages/about";
import ProfilePage from "@/pages/profile";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import CardPage from "@/pages/card";
import CartPage from "@/pages/cart";
import TurneuPage from "@/pages/turneu";
import TeamPage from "@/pages/team";
import TeamRegisterPage from "@/pages/teamRegister";
// context
import { AppProvider } from './contexts/context';

function App() {

  return (
    <AppProvider>
      <Routes>
        <Route element={<IndexPage />} path="/" />
        <Route element={<TurneePage />} path="/turnee" />
        <Route element={<TurneuPage />} path="/turneu" />
        <Route element={<TeamPage />} path="/team" />
        <Route element={<TeamRegisterPage />} path="/teamRegister" />
        <Route element={<MagazinPage />} path="/magazin" />
        <Route element={<AboutPage />} path="/about" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<CardPage />} path="/card/:id" />
      </Routes>
    </AppProvider>
    
  );
}

export default App;

