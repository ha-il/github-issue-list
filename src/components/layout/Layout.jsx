import Header from './Header';

const { Outlet } = require('react-router-dom');

function Layout() {
  return (
    <>
      <main>
        <Header />
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
