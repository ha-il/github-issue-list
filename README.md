# 원티드 프리온보딩 프론트엔드 12기 Week 2 과제 - 특정 깃헙 저장소의 이슈 목록 페이지 구현

## 1. 참가자 프로필

|                                   사진                                    | 정보                                                                                                                                                                                                                                                                                                                                                  |
| :-----------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://avatars.githubusercontent.com/ha-il" width=150px><br /> | - 성명: **김형우** <br /> - 원티드 가입 이메일: **hyeongwookim.dev@gmail.com** <br /> - 이력서: [링크](https://distinct-attraction-cde.notion.site/a5f3299269e045a0bfed0d7af7d869d4?pvs=4) <br /> - 개인 블로그: [링크](https://ha-il.github.io/) <br /> - 개인 프로젝트: [당신의 작업실(깃허브 저장소 링크)](https://github.com/ha-il/project-pixel) |

## 2. 디렉터리 구조

```
 ├ .husky # git hook 설정 자동화를 위한 husky 설정
 ├ src
 │ ├ apis # Octokit을 활용한 API 설정
 │ ├ components
 │ │ ├ common # 프로젝트 전반에 사용되는 컴포넌트
 │ │ ├ issue # 이슈 리스트, 상세 페이지에 사용되는 컴포넌트 폴더
 │ │ └ layout # 헤더 등 레이아웃 관련 컴포넌트 폴더
 │ ├ hooks
 │ │ └ useInfiniteScroll.jsx # 무한 스크롤 로직 분리를 위한 커스텀 훅
 │ ├ pages
 │ │ ├ ErrorPage.jsx # 설정하지 않은 경로 진입 시 렌더링되는 404 페이지
 │ │ ├ HomePage.jsx # 이슈 목록 페이지
 │ │ └ IssueDetailPage.jsx # 이슈 상세 페이지
 │ ├ routers
 │ ├ utils # Date 형식 변환, throttle 등 보조 함수
 │ ├ App.jsx
 │ └ index.jsx
 ├ .eslintrc # 코드 스타일 통일을 위한 esLint 설정
 └ .prettierrc # 코드 포맷팅을 위한 prettier 설정
```

<br/>

## 3. 추가한 라이브러리

| 목적            | 이름                                   | 버전    | 링크                                                                                                                                         |
| --------------- | -------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| HTTP Client     | @octokit/rest                          | ^20.0.1 | [https://www.npmjs.com/package/@octokit/rest](https://www.npmjs.com/package/@octokit/rest)                                                   |
| 라우터 설정     | react-router-dom                       | ^6.14.2 | [https://www.npmjs.com/package/react-router-dom](https://www.npmjs.com/package/react-router-dom)                                             |
| 스타일          | styled-components                      | ^6.0.7  | [https://www.npmjs.com/package/styled-components](https://www.npmjs.com/package/styled-components)                                           |
| 마크다운 렌더링 | react-markdown                         | ^8.0.7  | [https://www.npmjs.com/package/react-markdown](https://www.npmjs.com/package/react-markdown)                                                 |
| 환경 설정       | eslint                                 | ^8.48.0 | [https://www.npmjs.com/package/eslint](https://www.npmjs.com/package/eslint)                                                                 |
| 환경 설정       | prettier                               | ^3.0.2  | [https://www.npmjs.com/package/prettier](https://www.npmjs.com/package/prettier)                                                             |
| 환경 설정       | husky                                  | ^8.0.3  | [https://www.npmjs.com/package/husky](https://www.npmjs.com/package/husky)                                                                   |
| 환경 설정       | lint-staged                            | ^14.0.1 | [https://www.npmjs.com/package/lint-staged](https://www.npmjs.com/package/lint-staged)                                                       |
| 환경 설정       | eslint-plugin-no-relative-import-paths | ^1.5.2  | [https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths](https://www.npmjs.com/package/eslint-plugin-no-relative-import-paths) |

<br/>

## 4. 기능 구현 시 중점을 둔 부분

### 4.1 무한 스크롤 시 일정하지 않은 렌더링 제어

- 스크롤이 바닥에 닿으면 api를 호출하여 이슈 목록을 렌더링하는 것 까지 구현 했으나, 바닥에 닿을 때마다 일정하지 않은 횟수로 api를 요청하는 문제 발생.
- 스크롤이 바닥에 닿았고, isLoading이 false일 때만 api 호출 하도록 코드 변경.
- 아래 참고 자료의 throttle 함수 활용하여 api 요청 일정하도록 수정.
- useInfiniteScroll 커스텀 훅 만들어서, 복잡한 무한 스크롤 코드를 이슈 목록 페이지에서 분리.
- 참고 자료: [실전 Infinite Scroll with React(from.카카오엔터프라이즈 기술블로그)](https://tech.kakaoenterprise.com/149)

### 4.2 컴포넌트 구조와 재사용성 고려

- 페이지 컴포넌트는 각각 무엇을 렌더링하는 지에만 집중할 수 있도록 구현하고, 하위 컴포넌트들고 각자 하나의 역할을 맡을 수 있도록 분리.
- IssueInfo 컴포넌트의 경우 이슈 목록과 이슈 상세 페이지 모두 사용할 수 있도록 구현.
- Message 컴포넌트의 경우 message 프롭만 전달하면 로딩, 에러, 404 어디서든 사용할 수 있도록 구현

## 5. 프로젝트 실행 방법

1. 터미널에서 이 저장소를 git clone 하거나, 이 저장소의 파일을 다운받아 압축을 해제한 뒤 터미널로 열어주세요.
   <br/>
2. 터미널에 아래와 같이 명령어를 입력합니다.

   ```
   # git clone 한 경우
   cd github-issue-list

   # 파일을 다운받은 경우
   cd github-issue-list-main
   ```

3. 터미널에 `npm install`을 입력하여 의존성을 설치합니다.
   <br/>
4. `npm start`를 입력하여 애플리케이션을 실행합니다.

## 6. 데모 영상

### 6.1 이슈 목록 페이지 & 이슈 상세 페이지

|                                                이슈 목록 페이지 & 이슈 상세 페이지                                                 |
| :--------------------------------------------------------------------------------------------------------------------------------: |
| 이슈 클릭 → 이슈 상세 페이지로 이동 → </br>공통 헤더 클릭 → 이슈 목록 페이지로 이동 → </br>광고 이미지 클릭 → 원티드 사이트로 이동 |
|         ![per-issuelist](https://github.com/ha-il/github-issue-list/assets/108077643/85458d3d-75d8-4ff2-a95b-930281bf6b65)         |

### 6.2 무한 스크롤

|                                                   무한 스크롤                                                   |
| :-------------------------------------------------------------------------------------------------------------: |
| ![per-scroll](https://github.com/ha-il/github-issue-list/assets/108077643/2c164a40-52ca-458f-b5a3-4ebdf8b1771a) |
