
# ⚾ Baseball 커뮤니티 프로젝트

## 📌 프로젝트 개요

- **목표**: MLB파크 스타일의 커뮤니티 웹사이트 구현
- **기능**: 게시글, 댓글, 좋아요, 신고, 관리자 페이지 등
- **기술 스택**:
  - **Frontend**: React (Vite), CSS
  - **Backend**: Supabase (Auth, DB, Storage)
  - **인증**: Supabase Auth 기반 로그인/회원가입

---

## 📁 디렉토리 구조

```
src/
├── api/                 ← Supabase 쿼리 함수
│   ├── post.js
│   ├── comment.js
├── components/          ← 재사용 컴포넌트
│   ├── Header.jsx
│   ├── RequireAdmin.jsx
├── context/             ← Context API 관리
│   ├── UserContext.jsx
│   ├── PostContext.jsx
├── pages/               ← 각 페이지 구성
│   ├── AdminPage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── WritePost.jsx
├── App.jsx              ← 라우팅 설정
├── main.jsx             ← 진입점
├── supabase.js          ← Supabase 클라이언트
```

---

## ✅ 구현 기능

### 일반 사용자
- 회원가입/로그인 (nickname 설정 포함)
- 글 작성, 수정, 삭제
- 댓글 및 대댓글 기능
- 좋아요 기능
- 신고 기능

### 관리자 기능
- 관리자 전용 페이지 (RequireAdmin.jsx 활용)
- 신고된 글/댓글 확인
- 관리자에게만 보이는 메뉴 표시
- 향후 제재 기능 추가 예정

---

## 🗂️ 데이터베이스 설계 (Supabase)

| 테이블명 | 주요 필드 | 설명 |
|----------|-----------|------|
| posts | id (uuid), title, content, nickname | 게시글 |
| comments | id (uuid), content, parent_id, nickname | 댓글 및 대댓글 |
| profiles | id (uuid), nickname, is_admin | 사용자 정보 |
| posts_likes | post_id, nickname | 게시글 좋아요 |
| reports | post_id or comment_id, reason, nickname | 신고 테이블 |

> 모든 `id`는 `gen_random_uuid()` 사용  
> RLS 설정 완료 (SELECT, INSERT, UPDATE, DELETE 허용)

---

## 📝 향후 계획

- [ ] 마이페이지 (내 글/댓글 확인)
- [ ] 신고 처리 기능 개선
- [ ] 사용자 제재 기능 (ex. 일정 횟수 이상 신고 시 제재)
- [ ] 알림 기능
- [ ] 관리자 페이지에서 필터, 검색 기능

---

## 🛠️ 실행 방법

```bash
npm install
npm run dev
```

---

## 🙋‍♂️ 기여 및 이슈 관리

- GitHub Issue 탭에서 기능 제안/버그 리포트 가능
- 개발 작업은 분기별로 `feature/`, `fix/` 브랜치에서 진행 권장

