import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { getIssues } from '../../apis';
import { sliceArray } from '../../utils';
import Message from '../common/Message';

import IssueGroup from './IssueGroup';

function IssueList() {
  const [issues, setIssues] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchIssues = async page => {
    try {
      setErrorMessage('');
      setIsLoading(true);
      const { data } = await getIssues(page);
      setIssues(prev => [...prev, ...data]);
      setPageNumber(prev => prev + 1);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues(pageNumber);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        fetchIssues(pageNumber);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pageNumber]);

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
