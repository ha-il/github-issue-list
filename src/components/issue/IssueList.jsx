import { useCallback, useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { getIssues } from '../../apis';
import { sliceArray, throttle } from '../../utils';
import Message from '../common/Message';

import IssueGroup from './IssueGroup';

function IssueList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [issues, setIssues] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchIssues = useCallback(
    async page => {
      try {
        const { data } = await getIssues(page);
        setErrorMessage('');
        setIsLoading(true);
        setIssues(prev => [...prev, ...data]);
        setPageNumber(pageNumber + 1);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    },
    [pageNumber],
  );

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if ((window.innerHeight + scrollTop >= offsetHeight) & (isLoading === false)) {
        fetchIssues(pageNumber);
      }
    });
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageNumber]);

  useEffect(() => {
    fetchIssues(pageNumber);
  }, []);

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
