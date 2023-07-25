# 다음프로젝트부터 할 기술적인 도약은 프론트에서의 CICD이다. 

### CI : Continuous Integration : 지속적인 통합
### CD : Continuous Deployment : 지속적인 개발

CICD는 개발자의 작업을 자동화하고 코드 변경 사항을 자동으로 빌드, 테스트하고, 배포까지 처리하는 기술이다. (1) CI :  작성한 코드에 대해서 지속적인 통합이 이뤄진다. commit을 통해 변경 사항이 발생되면 자동으로 빌드 및 테스트가 실행된다. 이 과정에서 코드 충돌이나 오류를 발견하고 수정할 수 있는 환경을 제공한다. 

(2) CI의 과정이 성공했다면, 자동으로 배포가 이뤄진다. 이를 위해 GitHub Action이 대표적으로 자동 배포 워크플로우를 설정한다. 배포 대상은 S3와 같은 클라우드 스토리지, 서버, 컨테이너 등이 될 수 있다. 이를 VScode 환경에서의 프론트엔드 CICD는 아래와 같다. 

1. GitHub 저장소를 생성, VScode에서 작업한 내용을 원격 저장소에 업로드 한다. 
2. AWS S3 : AWS Management Console를 통해 S3 버킷을 생성하고, 필요한 권한 및 액세스 키를 구성한다. 
3. CICD 워크플로우 작성 : github > workflows에  YAML 형식의 GitHub Actions 워크플로우 파일을 작성한다. 이를 통해 워크플로우는 저장소에 변경 사항이 푸시도리 때마다 실행된다. 
4. GitHub > Secrets 에서 AWS 액세스 키 및 보안 정보를 설정한다. 이 정보는 보안 상의 이유로 비밀로 유지된다. 
5. 테스트 및 배포 확인을 통해 작성한 코드를 통해 CICD가 동작하는지 확인하면 된다. 

### Cloud Front 

CloudFront는 아마존 웹 서비스(AWS)의 전세계적으로 배포되는 컨텐츠 전송 네트워크(CDN)이다. CDN은 웹 콘텐츠를 전 세계 여러 위치에 배포하여 사용자에게 빠르고 안정적인 서비스를 제공한다.

1. `캐싱과 가속화` : CDN의 캐싱 능력을 활용하면 전 세계 어디에서나 사용자들에게 최적의 성능을 제공
2. `배포 및 확장성` : 강력한 확장성을 제공하여 사용자 요청의 트래픽을 처리하고 전 세계의 서버에 컨텐츠를 배포
3. `보안과 인증` : CloudFront는 HTTPS를 통한 암호화된 통신을 제공하며, AWS 인증 및 보안 기능을 활용

CloudFront는 프론트엔드 CICD에서 필수 사항은 아니지만 많은 경우에 유용하게 사용됩니다. 

### CLI : Command Line Interface : 
CLI는 컴퓨터와 사용자 사이의 상호작용을 위해 텍스트 기반의 인터페이스를 제공하는 방식으로, 사용자가 터미널 또는 명령 프롬프트와 같은 환경에서 명령어를 입력하고 실행하여 컴퓨터의 작업을 수행할 수 있게 해주는 것이다. 위의 내용을 수행하기 위해서는 먼저 S3 버킷을 실행해 놓아야 한다. 해당 부분은 추후에 정리하돌고 하자. 


### Create React App(CRA) >>  Github Action을 통해 CI/CD
다음의 글은 [coding-orca]( Github Action을 통해 CI/CD)를 참고하여 정리해보았다. 사전 작업으로 S3에 프로젝트를 업로드 했다는 것에서 본 포스트는 출발하는 것 같다. 

1. IAM : Identity and Access Management 생성하기 
외부와의 연동을 위해서는 IAM를 설정해야 한다. 사용자추가하기를 선택하고, 권한 설정을 통해 (직접 정책 연결) `AmazonS3FullAccess`를 찾고, `사용자 생성`을 클릭하면 된다. 

2. 보안자격증명 : IAM을 외부에서 사용할 수 있는 액세스 키를 만들어야 한다. 액세스 키 만들기를 통해서 > `서드파티 서비스`를 체크하고 액세스 키를 생성한다. 해당 키는 다운을 하여, email이나 drive에서 관리하여 저장한다. (.csv 파일)

3. github > Settings : 자동 배포할 레포지토리로 이동한다. `Settings` > 왼쪽에서 Security `Actions`를 클릭한다. > `New repository secret`를 클릭하고, 다운받은 `(.csv 파일)`열어, ID와 Secret access key를 기록한다. > `Add secrect` 클릭한다.  

    - Name : 시트의 A1 `AWS_ACCESS_KEY_ID` 를 입력
    - Secret : 시트의 A2의 `내용`을 입력

    다음에는

    - Name : B1 `AWS_SECRET_ACCESS_KEY`를 입력
    - secret : 시트의 B2의 `내용`을 입력

4. Code 줄에 있는 `Actions` 탭으로 이동한다. 파랑색글싸에 해당되는 `set up a workflow yourself`를 클릭한다.  

  ```bash
  # This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
  # For more information see: https://docs.github.com/en/actions/publishing-packages/publishing-nodejs-packages

  name: Node.js Package

  on:
    push:
      branches: ['master'] # push시 배포할 branch명, 보통 main을 많이 쓰던데..

  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest
      steps:
        # git 소스 체크아웃
        - name: git checkout
          uses: actions/checkout@v3
          
        # node 버전 설정
        - name: setup node
          uses: actions/setup-node@v2.5.2
          with:
            node-version: 17.x
        # npm install 진행(모듈 설치)
        - name: npm install
          run: npm install
          
        # 리엑트 프로젝트 빌드
        - name: npm build
          run: npm run build
          env:
            CI: false
        
        # s3에 배포
        - name: deploy s3
          env:
            AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
            AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          run:
            # sync : 변경된 파일만 / --delete : 원본경로에서 삭제시 타깃에서도 삭제
            aws s3 sync --delete --region ap-northeast-2 build s3://coding-orca-test-bucket
  ```

  티스토리에는 중간 npm run build에서 env : CI : false를 설정하는 이유에 대해서 CI는 default가 true인데, 이는 "Warning"이 있으면 build를 해주지 않기 때문으로,부끄럽지만 본인 프로젝트에는 warning이 상당수있기에 false로 설정해 주었다고 한다. 

  작성을 한 후에는 우측 상단에 있는 `Start commit`를 클릭한다. 이때 작성한 워크플로우의 이름을 저장해야 되는데, 티스토리는 `s3-deploy.yml`라고 저장하였다. `Commit new file` 클릭하면, yml파일이 master branch에 commit 되면서 자동으로 s3에 빌드/배포될 것이라고 한다. 