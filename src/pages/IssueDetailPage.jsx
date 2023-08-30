import { useEffect, useState } from 'react';

import { Octokit } from 'octokit';
import { useParams } from 'react-router-dom';

import IssueDetail from '../components/issue/IssueDetail';

// TODO: API 분리하기
const getIssueDetail = async issueNumber => {
  const octokit = new Octokit({});

  const request = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: 'facebook',
    repo: 'react',
    issue_number: issueNumber,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  return request;
};

function IssueDetailPage() {
  const [issue, setIssue] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const { issueNumber } = useParams();

  useEffect(() => {
    setisLoading(true);
    getIssueDetail(issueNumber).then(res => {
      setIssue(res.data);
      setisLoading(false);
    });
  }, []);

  return <>{isLoading ? <p>로딩중</p> : <IssueDetail issue={issue} />}</>;
}

export default IssueDetailPage;
