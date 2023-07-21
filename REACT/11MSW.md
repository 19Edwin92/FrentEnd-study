## Mocking Server Working : MSW 라이브러리 

1. 라이브러리 설치 및, 정적 파일 생성

    ```bash
    yarn add msw
    yarn msw init public/ — save
    ```

2. `index.jsx`에 msw 등록하기 

    ```jsx
    // Start the mocking conditionally.
    if (process.env.NODE_ENV === 'development') {
        const { worker } = require('./mock/browser')
        worker.start()
    }
    ```

3. msw 디렉토리 

    ```bash
    src
    ├─ mock
    |   ├─ browser.js
    |   └─ handlers.js
    |
    └───
    ```

4. `browser.js` 파일 기록하기

    ```jsx
    import { setupWorker } from "msw";
    import { handlers } from './handlers'
    export const worker = setupWorker(...handlers)
    ```

5. `handlers.js` 파일 기록하기, 실제 API 엔드포인트를 가로챌 코드를 기록할 장소 

    ```jsx
    import { rest } from "msw";

    const initialState = [
      {
        id:1,
        title:'Adwin'
      }
    ]

    export const handlers = [
      rest.get("http://react.com/todos", async(req, res, ctx) => {
        return res(
          ctx.json(initialState)
        )
        }),
      ]   
    ```

    - `req` : 매핑 요청에 대한 정보
    - `res` : 매핑 응답을 생성한는 기능적 유틸리티 
    - `ctx` : 모의 응답의 상태코드, 헤더, 본문 등을 설정하는 데 도움이 되는 함수 그룹이다. 

### 실제로 프로젝트에서 사용하기 

#### POST 로그인 테스트 하기 
1. 
    <details>
    <summary>handlers.js</summary>

        ```javascript 
        // 목데이터를 만들어주고 이를 입력받은 값과 비교했다. 
        export const headers = `Bearer qewrqewrqewrqewaaasdfa.12341234.as1324324`
        export const authinfo = {email : "test12", passward:"test12"}

        export const handlers = [
          // login - 로그인 체크 (성공, 이메일 틀렸을 때, 비밀번호 틀렸을 때)
          rest.post("/api/auth/login", async(req, res, ctx) => {
            const {email, passward} = await req.json()
            if (MockData.authinfo.email === email && MockData.authinfo.passward === passward) {
              return res(
                ctx.status(200),
                ctx.json({
                  success : true,
                  info : "message", // 반환값이 없을 때는 message, 반환값이 올때는 실제 데이터가 담겨진다.
                  error : null
                }),
                ctx.set("authorization", MockData.headers)
              );
            } else if (MockData.authinfo.email !== email) {
              return res(
                ctx.status(400),
                ctx.json({
                  success : false,
                  info : null,
                  error : "존재하지 않는 이메일입니다."
                }),
              );
            } else {
              return res(
                ctx.status(400),
                ctx.json({
                  success : false,
                  info : null,
                  error : "비밀번호가 틀렸습니다."
                }),
              );
            };
          })
        ]
        ```
    </details>

2. 
    <details>
    <summary>컴포넌트에서 사용하기 Header.jsx</summary>    

    ```javascript
    useEffect(()=> {
      async function authLogin () {
          try {
            const res = await axios.post(`/api/auth/login`, authinfo) // 로그인 성공
            // const res = await axios.post(`/api/auth/login`, {...authinfo, email:"asdf"}) // 이메일이 틀렸을 때
            // const res = await axios.post(`/api/auth/login`, {...authinfo, passward:"asdf"}) // 비밀번호가 틀렸을 때
            // document.cookie = `accessToken=${res.headers.authorization} path=/`
            console.log(res.headers.authorization)
          }
          catch (error) {
            console.log(error.response.data.error)
          }
      }
      authLogin()
    },[])
    ```
    </details>

#### GET 목데이터 조회 테스트 하기  

1. 
    <details>
    <summary>handlers.js</summary>    

    ```javascript 
    export const jobDetailMorkData = [
      {
        id : 1234234,
        companyname : '라인',
        title : '라인 새로운 개발자 구합니다',
        location : '서울시 서초구',
        recuritPeriod : 'YYYY.MM.DD',
        salary : 100000000,
        createAt : "XXXX-XX-XXT11:08:57.152015",
        managerName : "홍길동",
        managerEmail : "manager123@naver.com",
        recruitmentPersonNum : 1
      },
   ]

    export const handlers = [
      rest.get("/api/homestories", async(req, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json({
            success : false,
            info : MockData.jobDetailMorkData,
            error : null
          }),
        );
      }),
    ]  
    ```
    </details>


2. 
    <details>
    <summary>컴포넌트에서 사용하기 Home.jsx</summary>    

    ```javascript 
    useEffect(()=>{
      async function getStoriesInfo() {
        try {
          const res = await axios.get(`/api/homestories`)
          console.log(res.data.info)
          setHomeDataStories(res.data.info)
        } catch (error) {
          console.log("데이터를 불러오지 못했습니다")
        }
      }
      getStoriesInfo()
    },[])
    ```
    </details>