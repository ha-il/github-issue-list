import { useEffect, useState } from 'react';

import { styled } from 'styled-components';

import { getIssues } from '../../apis';
import { sliceArray } from '../../utils';
import IssueListSkeleton from '../common/Skeletons/IssueListSkeleton';

import IssueGroup from './IssueGroup';

// TODO: 로딩화면 -> 이슈리스트 순서대로 렌더링이 되어야 하는데, 로딩화면 -> 빈화면 -> 이슈리스트 순서대로 렌더링 중. 고쳐야함
function IssueList() {
  const [issues, setIssues] = useState([]);
  const [isFetching, setFetching] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  const fetchIssues = (page, perPage = 8) => {
    getIssues(page, perPage).then(res => setIssues(prev => [...prev, ...res.data]));
    setFetching(false);
  };

  useEffect(() => {
    fetchIssues(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
        setPageNumber(prev => prev + 1);
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
      {slicedIssuesArray.map((slicedIssues, idx) => (
        <IssueGroup slicedIssues={slicedIssues} key={idx} isIssuesFetching={isFetching} />
      ))}
      {isFetching && <IssueListSkeleton />}
    </IssueListContainer>
  );
}

const IssueListContainer = styled.ul`
  padding: 0;
`;

export default IssueList;
