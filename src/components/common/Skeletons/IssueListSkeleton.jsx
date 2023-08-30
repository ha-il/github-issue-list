import { styled } from 'styled-components';

function IssueListSkeleton() {
  return (
    <>
      <ListSkeleton />
    </>
  );
}

const ListSkeleton = styled.div`
  margin: 1rem 0;
  height: 80vh;
  border-radius: 8px;
  background-color: whitesmoke;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export default IssueListSkeleton;
