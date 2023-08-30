# 원티드 프리온보딩 2주차 과제: 깃헙 레파지토리의 이슈 리스트

## 간략 데모

![demo](https://github.com/ha-il/github-issue-list/assets/108077643/b59c3f57-c2e5-4ebe-ad9b-77d709683c33)

## 컴포넌트 간략 설명

- IssueList: 홈페이지에 렌더링될 이슈 리스트
- IssueGroup: 4개당 이미지 하나를 넣어야 하기 때문에, 이슈를 4개씩 묶은 컴포넌트
- Issue: 단일 이슈 컴포넌트
- IssueInfo: Issue 정보를 렌더링하는 컴포넌트(홈페이지, 상세페이지 모두 쓰임)

대략 이런 형태

```jsx
<HomePage>
  <IssueList>
    <IssueGroup>
      <Issue>
        <IssueInfo />
      </Issue>
      <Issue>
        <IssueInfo />
      </Issue>
      <Issue>
        <IssueInfo />
      </Issue>
      <Issue>
        <IssueInfo />
      </Issue>
      <광고이미지 />
    </IssueGroup>
    /* 아래부터는 IssueGroup 반복*/
    <IssueGroup></IssueGroup>
  </IssueList>
</HomePage>
```

IssueDetailPage는 복잡하지 않아서 설명 생략.

## 각 기능별 구현 상황

1. 이슈 목록 화면

- [✅] 이슈 목록 가져오기 API 활용
- [✅] open 상태의 이슈 중 코멘트가 많은 순으로 정렬
- [✅] 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
- [✅] 다섯번째 셀마다 광고 이미지 출력
  - [✅] 광고 이미지 클릭 시 https://www.wanted.co.kr/ 로 이동
- [➡️] 화면을 아래로 스크롤 할 시 이슈 목록 추가 로딩(인피니티 스크롤)
  - 구현은 했으나 로딩 관련 렌더링을 추가해야 함
- [고민] 전반적인 기능은 구현했으나 렌더링에서 조금 문제가 있어서 더 수정해야 함
  - 로딩화면 -> 이슈리스트 순서대로 렌더링이 되어야 하는데, 로딩화면 -> 빈화면 -> 이슈리스트 순서대로 렌더링 중. 고쳐야함

2. 이슈 상세 화면

- [✅] 이슈의 상세 내용 표시
- [✅] ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
- [추가] 상세 내용 로딩 과정을 스켈레톤 렌더링으로 구현해봄

3. 공통 헤더

- [✅] 두 페이지는 공통 헤더를 공유합니다.
- [✅] 헤더에는 Organization Name / Repository Name이 표시됩니다.
- [추가] 헤더 클릭하면 홈페이지로 이동하도록 추가

4. API 관련

- octokit을 활용하는게 좋을 것 같아서 axios대신 octokit 사용
- API관련 에러 핸들링 추가하여 했으나 에러가 apis/index.js 파일에서 발생하여 런타임 에러로 여기까지 에러 전파가 안됨. octokit 자체에서 에러를 내는 건지 봐야할 것 같음

## 전달 사항

- 라이브러리를 추가함
  - "react-markdown": "^8.0.7", 마크다운 변환 관련
  - "octokit": "^3.1.0", github api 관련
- 절대 경로를 없애주는 eslint 설정이 현재 프로젝트에서 에러가 발생해서 임시로 지움.
- 타입스크립트 관련 eslint 설정을 지움
