import { styled } from 'styled-components';

function Header() {
  return (
    <HeaderStyle>
      <h1>facebook / react</h1>
    </HeaderStyle>
  );
}
export default Header;

const HeaderStyle = styled.header`
  width: 100%;
  text-align: center;
  padding: 1rem 0;
`;
