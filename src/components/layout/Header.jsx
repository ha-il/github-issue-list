import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import { REPO_INFO } from '../../apis';

function Header() {
  return (
    <HeaderStyle>
      <Link to='/'>
        <h1>{`${REPO_INFO.organization} / ${REPO_INFO.repository}`}</h1>
      </Link>
    </HeaderStyle>
  );
}
export default Header;

const HeaderStyle = styled.header`
  width: 100%;
  text-align: center;
  padding: 1rem 0;
  & a {
    text-decoration: none;
    color: black;
  }
`;
