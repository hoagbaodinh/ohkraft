import { Outlet } from 'react-router-dom';
import Navbar from '../components/Layouts/Navbar';
import Footer from '../components/Layouts/Footer';
import LiveChat from '../components/Layouts/LiveChat';
import { useState } from 'react';

const RootPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <Navbar isLogin={(isLogin) => setIsLogin(isLogin)} />
      <main>
        <Outlet context={{ isLogin }} />
      </main>
      <Footer />
      <LiveChat />
    </>
  );
};

export default RootPage;

export function currentUserLoader() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser;
}
