## 타입스크립트로 최종프로젝트하기 

### 1. 타입스크립트 TSX 리액트앱을 설치하자. 

```bash
# 타입스크립트로 파일 기본설정하기
yarn create react-app [프로젝트파일명] --template typescript 
```

### 2. JSX 대신 TSX를 사용하는 이유

- 타입스크립트 공식문서에서 볼 수 있듯이, 컴파일 단계에서부터 파일형식을 확인하여, 프로젝트의 에러를 사전에 제어하는 것이 핵심이다.

### 3. 리액트 컴포넌트 타입 `:React.FC`

```tsx
import React from 'react'

const App:React.FC = () =>  {
  return (
    <div>App</div>
  )
}

export default App
```

### 4. tsconfig 설정하기 

```tsx
"compilerOptions": {
  
  
  "strict": true,
  // IE 호환성을 위해서 es5, commonjs
  "target": "es5",
  "module": "commonjs",
  "noImplicitAny": true, //any타입 금지 여부
  "strictNullChecks": true, //null, undefined 타입조작시 에러내기 
  "removeComments": true, //컴파일시 주석제거 
  "strictFunctionTypes": true, //함수파라미터 타입체크 강하게 
  "noUnusedLocals": true, //쓰지않는 지역변수 있으면 에러내기
  "noUnusedParameters": true, //쓰지않는 파라미터 있으면 에러내기
  "noFallthroughCasesInSwitch": true, //switch문 이상하면 에러내기 
}
```

### 5. 라이브러리 (1) RTK, RTK-query
[공식문서](https://ko.redux.js.org/tutorials/typescript-quick-start)를 따라가면 아래와 같다. 
[참고자료, 퍼렁꽁치](https://velog.io/@ckm960411/Next-TypeScript-%EC%97%90-%EB%A6%AC%EB%8D%95%EC%8A%A4%ED%88%B4%ED%82%B7-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0)

```bash
yarn add react-redux @types/react-redux @reduxjs/toolkit
```

1. configureStore 생성하고, index.tsx 설정해주기 

    ```tsx
    // Config/configureStore.ts
    import { configureStore } from "@reduxjs/toolkit";

    const store = configureStore({
      reducer : {}
    }) 

    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch


    // Config/hooks.ts
    import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
    import { AppDispatch, RootState } from "./configStore";

    export const useAppDispatch = () => useDispatch<AppDispatch>()
    export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
    ```

    - `RootState` : 이 행은 RootState 유형을 store.getState() 함수의 반환 유형으로 설정합니다. 
    - `AppDispatch` :  디스패치 함수의 유형을 얻습니다.
    - 기존에 사용하던 useDispatch는 `useAppDispatch`로 사용이 가능하고
    - 기존에 사용하던 useSelector는 `useAppSelector`로 사용이 가능해진다.<br/><br/>

2. 컴포넌트에서 react-redux Hooks 사용하기 

    ```tsx
    import { useAppDispatch, useAppSelector } from 'store/hooks'

    const App: React.FC = () => {
      const dispatch = useAppDispatch()
      const myInfo = useAppSelector(selectData)
  
      return ()
    }
    ```

3. RTK-query 타입설정하기 
[공식문서](https://junsangyu.gitbook.io/rtk-query/undefined)
[공식문서](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries)

    <details>
    <summary>RTK-query 통신성공 이미지 먼저 확인하기</summary>

    <img src="../img/RTK-qu(2).png">
    <img src="../img/RTK-qu(1).png">
    </details>

  - 본격적으로 RTK-query 를 살펴보기 전에 `AXIOS` 먼저 살펴보고 이어나가보자. 

### 6. 라이브러리(2) Axios
<details>
<summary>첫째, 라이브러리 설치 및 타입</summary>

```bash
yarn add axios @types/axios
```
</details>

<details>
<summary>둘째, tsconfing.json 설정헤주기 </summary>

```bash
 "types": ["node", "axios"],
```
</details>

<details>
<summary>셋째, 이번에 작업했던 instance 마이그레이션 </summary>

```tsx
import axios, { AxiosInstance, AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse } from "axios";

// axios 인스턴스 생성
const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_KEY, 
});

// headers에 설정을하기 위해서는 아래와 같이 AxiosRequestConfig를 커스텀해야 한다. 
// 이때 headers에 대한 타입 정의는 AxiosRequestHeaders를 지정해 준다. 
interface CustomRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config:CustomRequestConfig) => {
    const accessToken =
      document.cookie &&
      document.cookie
        .split(";")
        .filter((cookies) => cookies.includes("accessToken"))[0]
        ?.split("=")[1];
    const refreshToken =
      document.cookie &&
      document.cookie
        .split(";")
        .filter((cookies) => cookies.includes("refreshToken"))[0]
        ?.split("=")[1];
    if (accessToken) config.headers.authorization = accessToken;
    if (!accessToken && refreshToken) config.headers.refreshtoken = refreshToken;
    return config 
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.headers.authorization) {
      console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setMinutes(expiresTime.getMinutes() + 30);
      document.cookie = `accessToken=${response.headers.authorization}; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    if (response.headers.refreshtoken) {
      console.log("config", response.headers.authorization);
      const expiresTime = new Date();
      expiresTime.setDate(expiresTime.getDate() + 3);
      document.cookie = `refreshtoken=${response.headers.refreshtoken}; expires=${expiresTime.toUTCString()}; path=/;`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance; 
```
</details>


### 7. 라이브러리(3) RTK-query
<img src="../img/RTK-qu(3).gif">
<br/><br/>

<details>
<summary>첫째, RTK-query-axiosBaseQuery</summary>

  - 기존에 있던 `fetchBaseQuery`를 활용해도 되지만, 나는 AXIOS가 지원하는 인스턴스 생성과 인터셉터를 RTK-query에 더해주고 싶었다. 이를 위해서  커스텀BaseQuery인 `axiosBaseQuery`를 생성하고 이를 활용하였다. 
  - 타입스크립트 기반이기에, `axiosBaseQuery`에 대한 타입이 정의되어야 한다. 먼저 커스텀BaseQuery이지만, RTK가 제공하는 `BaseQueryFn` 타입을 기반으로 사용자가 사용할 타입을 `<제네릭>` 타입으로 지정해주면된다. 
    - 여기서 [제네릭](https://joshua1988.github.io/ts/guide/generics.html#%EC%A0%9C%EB%84%A4%EB%A6%AD-generics-%EC%9D%98-%EC%82%AC%EC%A0%84%EC%A0%81-%EC%A0%95%EC%9D%98)이란 마치 함수의 파라미터처럼 타입을 인자로 넘겨주는 방식을 말한다. 
    - 커스텀하여 사용해줄 내용은 객체이기 때문에 아래와 같이 설정해줄 수 있다. 
      - `method`는 그 타입이 `AxiosRequestConfig`에 의해 지정되어 있음으로 이를 활용하면 된다. 
      - `data`도 마찬가지이다. 
      - `url`과 `types`은 내가 지정해 줄 내용임으로 들어올 타입을 먼저 지정해준다. 
      - 이때 `types`는 항상 들어오는 타입이 아니기에, 옵셔널체이닝으로 지정해 주었다. <br/><br/>
    - 타입을 정의했다면, 아래의 내용은 기존의 JSX와 동일하다. 
    - 나아가 `error`에 대한 타입도 정의해야 하는데, 이때는 타입정의를 사용하였다. 
    - 이는 에러로 들어올 타입이 무엇인지 개발자가 확실하게 알고 있다는 것을 토대로 한다.   
    - 아레의 사례에서는 `AxiosError`를 타입으로 지정해주었다. 

    ```tsx
    import type { BaseQueryFn } from '@reduxjs/toolkit/query'
    import { AxiosError, AxiosRequestConfig } from 'axios'

    const axiosBaseQuery = (): BaseQueryFn<
        {
          url: string
          method: AxiosRequestConfig['method']
          data?: AxiosRequestConfig['data']
          types?: string
        }
      > =>
      async ({ url, method, data, types }) => {
        try {
          switch (types) {
            case "login":
              const auth = await instance({ url, method, data })
              console.log("auth", auth);
              return { data: auth.data }
            default:
            const res = await instance({ url, method })
            return { data: res.data } 
          }
        } catch (axiosError) {
          let err = axiosError as AxiosError // 타입단언 
          return {
            error: {
              status: err.response?.status, 
              data: err.response?.data || err.message,
            },
          }
        }
      }
      ```

</details>

<details>
<summary>둘째, RTK-query-createApi</summary>

  - RTKquery의 생성은 `createApi`를 통해서 가능하다. 
  
    ```tsx
    export const testApi = createApi({
      baseQuery: axiosBaseQuery(),
      tagTypes: ["STORIES"],
      endpoints(build) {
        return {
          postLogin: build.mutation({
            query: (data) => ({ url: `/api/auth/login`, method: 'post', data, types:'login' }),
          }),
          getStoriesRTK: build.query({
            query: () => ({
              url: `api/stories?page=1&size=20`, 
              method: "get",
            }),
            providesTags: ["STORIES"],
          }),
        }
      },
    })

    export const {
      usePostLoginMutation,
      useGetStoriesRTKQuery,
    } = testApi
    ```

  - `baseQuery: axiosBaseQuery()` : 위에서 생성한 BaseQuery를 createApi의 비동기처리 로직으로 넣어준다. 
  - `tagTypes: [],` : 배열은 캐시무효화를 실행해줄 QueryKey를 담아놓을 배열이다. 
    <details>
    <summary>providesTags 와 invalidatesTags</summary>
    ```tsx
    // STORIES - GET
    getStoriesRTK: builder.query({
      query: (pageNum) => ({
        url: `api/stories?page=${pageNum}&size=20`, //
        method: "get",
      }),
      providesTags: ["STORIES"],
    }),
    // STORIES - POST
    postStoriesRTK: builder.mutation({
      query: (payload) => ({
        url: "/api/stories/newstory",
        data: payload,
        method: "post",
      }),
      invalidatesTags: ["STORIES"], // 캐시를 무효화시켜, 다시 패칭을 실행시키는 메서드는 `invalidatesTags`이다. 
    }),
    // STORIES - DELETE
    deleteStoriesRTK: builder.mutation({
      query: (id) => ({
        url: `/api/stories/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["COMMENTS", "STORIES"],
    }),
    ```
    </details><br/>
</details>

<details>
<summary>셋째, RTK-query-ConfigureStore, Provider 그리고 ApiProvider</summary>

  - 먼저, `createApi`를 단독해서 사용하는 경우에는 ConfigureStore, Provider를 생성할 필요가 없다. ApiProvider만으로도 가능하다. 
  - 그러나 `전역상태관리를 위한 Redux-Module`과 함께 사용하는 경우에는 ConfigureStore, Provider를 구성해야 한다. 
  - (1) 등록은 `[testApi.reducerPath] : testApi.reducer`이렇게 해주고
  - (2) 미들웨어에서 제공하는 추가 기능을 위해서 `middleware: (getDefaultMiddleware) => {...}`을 생성해준다. 
    - 이를 통해 미들웨어 스택에 추가하여 RTK 쿼리가 파견된 작업을 가로채고 API 요청을 처리하고 그에 따라 캐시를 업데이트할 수 있게한다. 
  - (3) setupListeners 함수를 통해서 폴링을 생성하는데, 이는 RTK 쿼리가 액션을 수동으로 디스패치할 필요 없이 지정된 간격으로 자동으로 데이터를 다시 가져올 수 있도록 해누다. 폴딩을 통해서 데이터가 서버의 최신 상태로 유지되도록 하는 것을 돕는다. 

      ```tsx
      import { configureStore } from "@reduxjs/toolkit";
      import { testApi } from "../api/RTKquery";
      import { setupListeners } from "@reduxjs/toolkit/dist/query";

      export const store = configureStore({
        reducer : {
          [testApi.reducerPath] : testApi.reducer // (1)
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(testApi.middleware) // // (2)
      })

      setupListeners(store.dispatch) // (3)

      export type RootState = ReturnType<typeof store.getState>
      export type AppDispatch = typeof store.dispatch
      ```

   - index.tsx 에서 Provider를 생성해주는 것은 동일하며, createApi 단독사용일 경우 ApiProvider를 통해서 간략하게 구현할 수 있다. <br/>

</details>

<details>
<summary>넷째, react-redux의 Hook을 사용하기 위한 타입정의</summary>

  - useSelector와 useEispatch는 tsㅌ에서 타입을 정의해야 사용이 가능하며,
  - 아래와 같이 각각 `useAppDispatch`와 `useAppSelector`의 이름으로 사용된다. 

      ```tsx
      import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
      import { AppDispatch, RootState } from "./configStore";

      export const useAppDispatch = () => useDispatch<AppDispatch>()
      export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
      ```
</details>

### 8. 라이브러리(4) RTK-query 와 Redux 병행하기, Token과 Decode

<img src="../img/RTK-qu(4).png">

<details>
<summary>첫째, DecodeSlice 생성하고, ConfigureStore에 등록하기</summary>

  - Slice의 TS는 `action: PayloadAction<DecodeToken>`에 대한 타입정의와
  - `selectDecode = (state: any) => state.decodeToken` Store에서 가져올 타입에 대한 정의이다. 

      ```tsx
      import { PayloadAction, createSlice } from "@reduxjs/toolkit";
      import { DecodeToken } from "../reduxType";

      const decodeTokenSlice = createSlice({
        name:"decodeToken",
        initialState: {} as DecodeToken,
        reducers : {
          setDecodeToken : (_, action: PayloadAction<DecodeToken>) => {
            return {...action.payload}
          },
          deleteDecodeToken : () => {
            return {} as DecodeToken
          }
        }
      })

      export const decodeTokenReducer = decodeTokenSlice.reducer
      export const selectDecode = (state) => state.decodeToken
      export const {setDecodeToken, deleteDecodeToken} = decodeTokenSlice.actions

      ```
</details>

<details>
<summary>둘째, App.ts에서 사용하기 </summary>

  - 코드 간결화를 위한 상대경로 설정 `import * as Redux from './redux'`

      ```tsx
      import React, { useEffect } from 'react'
      import jwtDecode from 'jwt-decode'
      import * as Redux from './redux'

      const App:React.FC = () =>  {
        // RTKquery를 통해 비동기 함수 실행하기
        const data = Redux.useGetStoriesRTKQuery({})
        const [postLoginRTK] = Redux.usePostLoginMutation()
        data && console.log("useGetStoriesRTKQuery", data);

        // 리덕스 Store에서 데이터 가져오기 
        const decodeToken = Redux.useAppSelector(Redux.selectDecode)
        decodeToken && console.log("decodeToken", decodeToken);

        // 리덕스 Modules의 actions 사용하기 
        const dispatch = Redux.useAppDispatch()
        
        useEffect(() => {
          const refreshToken = document.cookie?.split(';').filter(cookie => cookie.includes("refresh"))[0]?.split('=')[1];

          if (refreshToken) {
            const decode = jwtDecode(refreshToken) as Redux.DecodeToken; // 디코드된 대상의 타입을 지정하기 
            console.log(decode);
            dispatch(Redux.setDecodeToken(decode));
          }
        }, [dispatch]);
          
        return (
          <div>
            <h1>RTK-Query, Redux</h1>
            <button onClick={()=>postLoginRTK({email:"test5@g.commm", password:"qwer1234!"})}>로그인하기</button>
          </div>
        )
      }

      export default App
      ```
</details>