import { styled } from 'styled-components';

function Message({ message }) {
  return <LoadingWrapper>{message}</LoadingWrapper>;
}

const LoadingWrapper = styled.div`
  width: 100%;
  height: 4rem;
  font-size: 2rem;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 1rem;
  font-weight: 700;
`;

export default Message;
