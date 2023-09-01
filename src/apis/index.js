import { Octokit } from 'octokit';

export const REPO_INFO = {
  organization: 'facebook',
  repository: 'react',
};

const octokit = new Octokit({});
export const getIssues = async page => {
  try {
    const request = await octokit.request(
      `GET /repos/${REPO_INFO.organization}/${REPO_INFO.repository}/issues`,
      {
        state: 'open',
        sort: 'comments',
        page: page,
        per_page: 8,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    return request;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getIssueDetail = async issueNumber => {
  try {
    const request = await octokit.request(
      `GET /repos/${REPO_INFO.organization}/${REPO_INFO.repository}/issues/{issue_number}`,
      {
        issue_number: issueNumber,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );

    return request;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
