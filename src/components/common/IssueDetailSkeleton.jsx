import { styled } from 'styled-components';

function IssueDetailSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <BodySkeleton />
    </>
  );
}

const HeaderSkeleton = styled.div`
  width: 100%;
  height: 10vh;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: whitesmoke;
`;
const BodySkeleton = styled.div`
  width: 100%;
  height: 60vh;
  border-radius: 8px;
  background-color: whitesmoke;
`;

export default IssueDetailSkeleton;
