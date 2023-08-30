import { useEffect, useState } from 'react';

import { Octokit } from 'octokit';
import { styled } from 'styled-components';

import { sliceArray } from '../../utils';

import IssueGroup from './IssueGroup';

// TODO: API 분리하기
const getIssues = async (page = 1, per_page = 4) => {
  const octokit = new Octokit({});

  const request = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'facebook',
    repo: 'react',
    state: 'open',
    sort: 'comments',
    page: page,
    per_page: per_page,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return request;
};

// TODO: 중복 렌더링 해결하기
function IssueList() {
  const [issues, setIssues] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(2);

  useEffect(() => {
    getIssues(1, 8).then(res => setIssues(res.data));
    setFetching(false);
  }, []);

  const sliceSize = 4;
  const slicedIssuesArray = sliceArray(issues, sliceSize);

  const addIssues = () => {
    getIssues(pageNumber).then(res => setIssues(prev => [...prev, ...res.data]));
    setPageNumber(prev => prev + 1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
        addIssues();
      }
    };
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <IssueListContainer>
        {slicedIssuesArray.map((slicedIssues, idx) => (
          <IssueGroup slicedIssues={slicedIssues} key={idx} />
        ))}
        {isFetching ? <p>로딩</p> : null}
      </IssueListContainer>
    </>
  );
}

const IssueListContainer = styled.ul`
  padding: 0;
`;

export default IssueList;
