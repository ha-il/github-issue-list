import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { styled } from 'styled-components';

import IssueInfo from './IssueInfo';

function IssueDetail({ issue }) {
  const {
    user: { avatar_url },
    body,
  } = issue;

  return (
    <>
      <IssueHeader>
        <img src={avatar_url} alt='avatar' />
        <IssueInfo issue={issue} />
      </IssueHeader>
      <ReactMarkdown>{body}</ReactMarkdown>
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
