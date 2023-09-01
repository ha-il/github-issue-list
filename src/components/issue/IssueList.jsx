import { styled } from 'styled-components';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { sliceArray } from '../../utils';
import Message from '../common/Message';

import IssueGroup from './IssueGroup';

function IssueList() {
  const { issues, isLoading, errorMessage } = useInfiniteScroll();

  const listNumPerAdImage = 4;
  const sliceSize = listNumPerAdImage;
  const slicedIssuesArray = sliceArray(issues, sliceSize);

  return (
    <IssueListContainer>
      {errorMessage && <Message message={errorMessage} />}
      {slicedIssuesArray.map((slicedIssues, idx) => (
        <IssueGroup slicedIssues={slicedIssues} key={idx} />
      ))}
      {isLoading && <Message message={'로딩 중입니다...'} />}
    </IssueListContainer>
  );
}

const IssueListContainer = styled.ul`
  padding: 0;
`;

export default IssueList;
