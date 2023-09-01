import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { styled } from 'styled-components';

function IssueBody({ issueBody }) {
  return (
    <IssueBodyWrapper>
      <ReactMarkdown>{issueBody}</ReactMarkdown>
    </IssueBodyWrapper>
  );
}

export default IssueBody;

const IssueBodyWrapper = styled.div`
  img {
    width: 100%;
  }
  pre {
    overflow: scroll;
    background-color: whitesmoke;
  }
  code {
    padding: 0 0.25rem;
    border-radius: 4px;
  }
`;
