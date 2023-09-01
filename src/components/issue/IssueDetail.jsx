import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';

import { getIssueDetail } from '../../apis';
import Message from '../common/Message';

import IssueBody from './IssueBody';
import IssueDetailSkeleton from './IssueDetailSkeleton';
import IssueInfo from './IssueInfo';

function IssueDetail() {
  const [issue, setIssue] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const { issueNumber } = useParams();

  const fetchIssueDetail = async page => {
    try {
      setErrorMessage('');
      setIsLoading(true);
      const { data } = await getIssueDetail(issueNumber);
      setIssue(data);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIssueDetail();
  }, []);

  return (
    <>
      {errorMessage && <Message message={errorMessage} />}
      {isLoading && <IssueDetailSkeleton />}
      {Object.keys(issue).length === 0 || (
        <>
          <IssueHeader>
            <img src={issue.user.avatar_url} alt='avatar' />
            <IssueInfo issue={issue} />
          </IssueHeader>
          <IssueBody issueBody={issue.body} />
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
