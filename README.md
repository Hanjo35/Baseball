# ⚾ 야구야놀자 (Baseball 커뮤니티)

야구 팬들을 위한 커뮤니티 웹사이트입니다.  
MLB파크를 참고하여, 글 작성, 댓글, 좋아요, 신고, 관리자 제재 기능까지 구현된 실전형 프로젝트입니다.

---

## 🚀 프로젝트 개요

- **프로젝트명**: 야구야놀자
- **목표**: 야구 팬들이 모여 자유롭게 소통하고 정보를 나눌 수 있는 커뮤니티 구현
- **특징**:
  - 사용자 친화적 인터페이스
  - Supabase 기반 실시간 인증 및 데이터 저장
  - 관리자 전용 기능 탑재 (신고 제재 등)
  - 반응형 UI 적용 (모바일 대응 예정)

---

## 🛠 기술 스택

### Frontend
- **React**: 컴포넌트 기반 UI
- **Vite**: 빠른 개발 환경
- **Tailwind CSS**: 유틸리티 CSS 프레임워크
- **React Router DOM**: SPA 라우팅

### Backend
- **Supabase**
  - PostgreSQL 기반 Database
  - Auth (이메일, OAuth 로그인)
  - Storage (이미지 업로드)
  - RLS (Row-Level Security)

---

## 📌 주요 기능

### ✅ 사용자 기능

- 회원가입 및 로그인 (닉네임 포함)
- 게시글 작성 / 수정 / 삭제 / 좋아요 / 신고
- 댓글 및 대댓글 기능
- 댓글 신고
- 마이페이지 (작성 글/댓글/좋아요한 글 목록)

### 🔐 관리자 기능

- 관리자 전용 페이지 (`RequireAdmin` 라우팅 제어)
- 신고된 게시글 및 댓글 확인
- 신고 상태 확인 및 제재 처리
- 관리자 전용 메뉴 노출 (`is_admin` 필드 기반)

---

## 🗃️ 데이터베이스 구조 (Supabase)

| 테이블         | 주요 필드                                              | 설명              |
|----------------|---------------------------------------------------------|-------------------|
| `profiles`     | `id`(uuid), `nickname`, `is_admin`                     | 사용자 정보        |
| `posts`        | `id`, `title`, `content`, `nickname`, `created_at`    | 게시글            |
| `comments`     | `id`, `post_id`, `content`, `parent_id`, `nickname`   | 댓글/대댓글        |
| `posts_likes`  | `post_id`, `nickname`                                  | 좋아요 정보        |
| `reports`      | `id`, `post_id/comment_id`, `reason`, `nickname`      | 신고 내용          |

- 모든 ID는 `uuid` 형식 (`gen_random_uuid()` 사용)
- `created_at`: 자동 타임스탬프
- RLS 설정: SELECT, INSERT, UPDATE, DELETE 모두 적용

---

## 📁 디렉토리 구조

```
Baseball/
├── api/
│   ├── comment.js
│   └── post.js
├── assets/
│   └── 이미지 파일들
├── components/
│   ├── Board.jsx
│   ├── Header.jsx
│   ├── MainNews.jsx
│   ├── PopularPosts.jsx
│   ├── RightBanner.jsx
│   └── TopBanner.jsx
├── context/
│   ├── PostContext.jsx
│   └── UserContext.jsx
├── pages/
│   ├── BoardPage.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── LoginPage.jsx
│   ├── PostPage.jsx
│   ├── SignUpPage.jsx
│   └── WritePost.jsx
├── App.jsx
├── main.jsx
├── styles.css
├── supabase.js
├── .gitignore
├── eslint.config.js
├── index.html
└── package-lock.json
```

---

## 🧪 실행 방법

1. 프로젝트 클론

```bash
git clone https://github.com/your-id/baseball-community.git
cd baseball-community
```

2. 패키지 설치

```bash
npm install
```

3. 개발 서버 실행

```bash
npm run dev
```

4. 브라우저에서 열기

```bash
http://localhost:5173
```

---

## 🔮 향후 개발 계획

- 마이페이지 기능 완성
- 알림 기능 추가 (댓글/좋아요/신고 등)
- 관리자 페이지 확장 (검색/필터/통계)
- 댓글 정렬 옵션 (최신순/인기순)
- 반응형 UI 개선
- Dark Mode

---

## 🤝 협업 및 버전 관리

- GitHub Issues를 통한 기능별 작업 관리
- 커밋 태그: `[Feature]`, `[Fix]`, `[Refactor]` 등 컨벤션 적용
- Notion으로 작업 문서 관리

---

## 🧑‍💻 제작자

- **이한조** (Frontend / Supabase Integration)

---

## 📝 라이선스

MIT License
