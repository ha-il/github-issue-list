import { styled } from 'styled-components';

import Header from './Header';

const { Outlet } = require('react-router-dom');

function Layout() {
  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

const Main = styled.main`
  padding: 0 2rem;
`;

export default Layout;
