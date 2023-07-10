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