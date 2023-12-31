import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

function AdImage() {
  return (
    <Link to='https://www.wanted.co.kr/ '>
      <ImageContainer>
        <img
          src='https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fuserweb%2Flogo_wanted_black.png&w=110&q=100'
          alt='wanted'
        ></img>
      </ImageContainer>
    </Link>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  margin-top: 1rem;
  background-color: whitesmoke;
  border-radius: 4px;
`;

export default AdImage;
