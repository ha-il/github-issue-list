import { useEffect, useState } from 'react';

import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { getIssueDetail } from '../../apis';
import IssueDetailSkeleton from '../common/Skeletons/IssueDetailSkeleton';

import IssueInfo from './IssueInfo';

function IssueDetail() {
  const [issue, setIssue] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [fetchingError, setFetchingError] = useState(null);
  const { issueNumber } = useParams();

  useEffect(() => {
    setisLoading(true);
    // TODO: 에러 핸들링 하려고 했으나, 에러가 apis/index.js 파일에서 발생하여 런타임 에러로 여기까지 에러 전파가 안됨.
    try {
      getIssueDetail(issueNumber).then(res => {
        if (res.status !== 200)
          throw new Error('이슈 목록을 불러오는 과정에서 에러가 발생했습니다.');
        setIssue(res.data);
        setisLoading(false);
      });
    } catch (error) {
      setFetchingError(error);
    }
  }, []);

  return (
    <>
      {fetchingError && <p>{fetchingError}</p>}
      {isLoading ? (
        <IssueDetailSkeleton />
      ) : (
        <>
          <IssueHeader>
            <img src={issue.user.avatar_url} alt='avatar' />
            <IssueInfo issue={issue} />
          </IssueHeader>
          <ReactMarkdown>{issue.body}</ReactMarkdown>
        </>
      )}
    </>
  );
}

const IssueHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;

export default IssueDetail;
