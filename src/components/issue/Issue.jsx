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

  & a {
    color: black;
    text-decoration: none;
  }
  &:hover {
    & a div {
      background-color: whitesmoke;
      color: #005b99;
    }
  }
`;

export default Issue;
