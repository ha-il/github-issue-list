import { Octokit } from 'octokit';

// TODO: API 에러 핸들링 추가
export const getIssues = async (page, per_page) => {
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

export const getIssueDetail = async issueNumber => {
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
