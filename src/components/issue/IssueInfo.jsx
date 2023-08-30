import { styled } from 'styled-components';

import { formatDate } from '../../utils';

function IssueInfo({ issue }) {
  const {
    number,
    title,
    updated_at,
    comments,
    user: { login },
  } = issue;

  return (
    <IssueInfoStyle>
      <div className='meta'>
        <h2>
          #{number} {title}
        </h2>
        <span>
          작성자: {login}, 작성일: {formatDate(updated_at)}
        </span>
      </div>
      <div className='comments'>코멘트: {comments}</div>
    </IssueInfoStyle>
  );
}

const IssueInfoStyle = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
  padding-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .meta {
    width: 85%;
  }
`;

export default IssueInfo;
