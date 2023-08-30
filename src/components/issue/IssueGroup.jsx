import AdImage from '../common/AdImage';

import Issue from './Issue';

function IssueGroup({ slicedIssues }) {
  return (
    <>
      {slicedIssues.map(issue => (
        <Issue issue={issue} key={issue.id} />
      ))}

      <AdImage />
    </>
  );
}

export default IssueGroup;
