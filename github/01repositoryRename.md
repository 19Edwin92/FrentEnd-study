## 레포지토리 이름변경

정리의 내용이 많아지다보니, 기존 JS-study에서 Frentend-study로 이름을 변경해야 할 것 같았다. github의 이름을 변경하는 부분은 쉽다. 문제는 로컬에 이를 반영하는 일이다. 

```bash
# 로컬의 연결된 레포지토리를 확인
git remote -v

# 변경된 레포지토리 등록하기
git remote set-url <새로운 리모트 저장소 URL>

# 로컬 브랜치 이름도 변경
git branch -m <이전 브랜치 이름> <새로운 브랜치 이름>

# 리모트 저장소의 최신 변경 사항을 가져온다. 
git fetch 
