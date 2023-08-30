import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

import IssueInfo from './IssueInfo';

function Issue({ issue }) {
  const { number } = issue;
  return (
    <IssueContainer>
      <Link to={`/${number}`}>
        <IssueInfo issue={issue} />
      </Link>
    </IssueContainer>
  );
}

const IssueContainer = styled.li`
  list-style: none;
  padding-bottom: 1rem 0;
  & a {
    color: black;
    text-decoration: none;
  }
`;

export default Issue;
