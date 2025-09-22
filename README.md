# 📌 PIN  
**예비 개발자들을 위한 사이드 프로젝트 팀빌딩 & 관리 커뮤니티 플랫폼**  

<p align="center">
  <img width="276" height="195" alt="PIN Logo" src="https://github.com/user-attachments/assets/01c4d676-5e82-49e6-91ba-12d31e7727d4" />
</p>  

---

## 📖 프로젝트 개요  
사이드 프로젝트를 하고 싶지만 기존 팀 매칭 커뮤니티의 **높은 난이도와 진입 장벽** 때문에 망설이는 예비 개발자들을 위한 플랫폼입니다.  

> **PIN은 난이도 표시 시스템을 통해**  
> 자신의 개발 숙련도에 맞는 프로젝트를 찾고,  
> 비슷한 수준과 성향의 사람들과 부담 없이 팀을 구성할 수 있도록 돕습니다.  

이를 통해 경험이 적은 사람도 쉽게 참여할 수 있으며,  
함께 성장하며 프로젝트를 완수할 수 있는 환경을 제공합니다.  

- **개발 기간**: 2025.01.05 ~ 2025.02.06 (약 4주)  
- **팀 구성**: Frontend 2명, Backend 2명  

---

## 🛠 기술 스택  
| 분야        | 기술                     |
| --------- | ---------------------- |
| **Language**  | JavaScript             |
| **Framework** | React                  |
| **Styling**   | Styled Components      |
| **Infra**     | AWS S3                 |
| **DevOps**    | GitHub Actions (CI/CD) |

<p align="center">
  <img width="1886" height="211" alt="Group 289406" src="https://github.com/user-attachments/assets/75c6ac22-c56d-4ad1-b060-f6174b96266b" />
</p>  

---

## ✨ 주요 기능  

### 📂 프로젝트 관리  
- 프로젝트 생성, 조회, 수정, 삭제  

### 👥 팀원 모집  
- 포지션(분야)별 팀원 신청 및 관리  

### 💬 리뷰 및 댓글  
- 프로젝트 및 팀원에 대한 리뷰와 댓글 작성  

### 🙋 마이페이지  
- 내 정보 관리  
- 내가 참여한 프로젝트 & 지원한 프로젝트 목록 관리  

---

## 🚀 CI/CD 파이프라인  
- GitHub Actions → `main` 브랜치 merge 시 **자동 빌드 & Amazon S3 배포**  
- **Amazon S3**를 활용한 정적 파일 호스팅  

---

## 📂 폴더 구조  
## 📂 폴더 구조

```bash
src
├── assets                          # 정적 리소스 (이미지, 아이콘 등)
│
├── components                      # 재사용 가능한 컴포넌트
│   ├── CompletedProject.jsx        # 완료된 프로젝트 컴포넌트
│   ├── EditTeamForm.jsx            # 팀 수정 폼
│   ├── Layout.jsx                  # 전체 레이아웃
│   ├── LoginBase.jsx               # 로그인 기본 UI
│   ├── Modal.jsx                   # 모달 컴포넌트
│   ├── MyPosts.jsx                 # 내가 쓴 글
│   ├── Progress.jsx                # 진행 상황 표시
│   ├── Search.jsx                  # 검색 UI
│   ├── SideBar.jsx                 # 사이드바
│   └── SideBarPicture.jsx          # 사이드바 이미지
│
├── pages                           # 라우팅 기준 페이지
│   ├── ApplyForm.jsx               # 지원 폼
│   ├── ApplyStatus.jsx             # 지원 현황
│   ├── CreateTeam.jsx              # 팀 생성 페이지
│   ├── Evaluation.jsx              # 평가 페이지
│   ├── Login.jsx                   # 로그인 페이지
│   ├── Main.jsx                    # 메인 화면
│   ├── MyPage.jsx                  # 마이페이지
│   ├── Notifications.jsx           # 알림 페이지
│   ├── Signup.jsx                  # 회원가입 페이지
│   ├── Team.jsx                    # 팀 메인 페이지
│   ├── TeamDetail.jsx              # 팀 상세 페이지
│   └── TeamFormation.jsx           # 팀 빌딩 페이지
│
├── shared                          # 공유 모듈
│   └── Router.jsx                  # 라우터 설정
│
├── style                           # 전역 스타일 관리
│   ├── GlobalStyle.jsx             # 글로벌 스타일
│   ├── reset.css                   # CSS 리셋
│   └── theme.jsx                   # 테마 정의
│
├── utils                           # 유틸 함수
│   └── App.js                      # 앱 초기화
│
├── index.js                        # 엔트리 포인트
└── App.js                          # 루트 컴포넌트

