### [Redux 필수, 파트 7: RTK 쿼리 기본 사항](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics)

웹 애플리케이션은 일반적으로 데이터를 표시하기 위해 서버에서 데이터를 가져와야 한다.
- 또한 해당 데이터를 업데이트하고
- 해당 업데이트를 서버로 보내고
- 클라이언트의 캐시된 데이터를 서버의 데이터와 동기화 상태로 유지해야 한다. 

RTX 쿼리는 강력한 데이터 가져오기 및 캐싱 도구이다. 공식문서에 따르면 리덕스는 이러한 사용 사례를 완전히 해결하는 데 도움이 되는 내장 기능을 포함하지 않는다. `createAsyncThunk` 함께 사용하는 경우에도 `createSlice` 요청을 만들고 로드 상태를 관리하는 데 여전히 상당한 수작업이 필요하다. 

- `extraReducers` 우리는 비동기 썽크를 만들고,
- 실제 요청을 만들고, 응답에서 관련 필드를 가져오고, 로딩 상태 필드를 추가하고, 케이스를 위한 핸들러를 추가하고
- `pending/fulfilled/rejected` 적절한 상태 업데이트 작성해야 한다. 

공식문서는 [React](https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics) 커뮤니티가 `데이터 가져오기 및 캐싱`이 실제로 `상태관리`와는 다른 관심사라는 것을 깨달았다고 한다. `RTK Query`는 `Apollo Client, React Query, Urql 및 SWR`와 같은 데이터 가져오기 솔루션을 개척한 다른 도구에서 영감을 얻었지만, API 디자인에 고유한 접근 방식을 추가한다. 

여기서 등장하는 것이 [createApi](https://redux-toolkit.js.org/rtk-query/api/createApi)이다. [isp1106](https://velog.io/@dlstjr1106/RTK-QUERY)의 설명에 따르면, RTK의 `createAsyncThunk`는 비동기처리를 할 때, `createSlice`를 활용해서 관리해야 했으며, 그 결과 코드가 늘어날 수밖에 었었다. 

반면에 `RTK Query`는 Redux Toolkit 의 createSlice 와 createAsyncThunk의 기능을 동시에 사용하면서, react-query 와 유사하게 서버에서 넘어온 데이터를 관리할 수 있는 기능을 추가시켰다. 캐싱을 지원하기 떄문에, 불필요한 요청을 줄일 수 있다. 나아가 post 하자마자 자동으로 get하는 기능까지도 구현할 수 있으며, 프론트 데이터와 서버 데이터를 분리하여 관리할 수도 있다. 

- 서버데이터 : RTK Query 
- 전역데이터 : createSlice


1. 기본 구성은 다음과 같다. 
```javascript 
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
export const api이름 = createApi({
  reducerPath: '리듀서이름',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
  }),
  endpoints: (builder) => ({
    요청이름: builder.query({
      query: (주소에 넘길 값) => 'api 주소값/(주소에 넘길 값)',
    }),
  }),
});
 
export const {
  use요청이름Query
} = postApi;
```

[공식문서](https://junsangyu.gitbook.io/rtk-query/tutorial)에 따르면, RTK Query는 전체 API를 보통 한 곳에 정의한다. 이 점이 다른(react-query) 같은 라이브러리와 다른 점이다. 리덕스 팀은 한 곳에 위치시켜 요청, 캐시 무효화, 공통 앱 설정을 둠으로 관리하기가 더욱 쉽다고 생각하였기 때문이다. 

[공신문서의 팁](https://junsangyu.gitbook.io/rtk-query/tutorial)은 베이스 URL당 하나의 API 슬라이스를 가져야 한다고 말한다. 예를 들어 

- api/posts
- api/todos

두 개의 경로가 있다면, 하나의 API 슬라이스를 만들고, post와 user로 엔드포인트를 나누어야 한다. 이렇게 설정함으로, endpoints와의 관계를 tag로 정의해서 자동 데이처 리패칭 기능을 효과적으로 활용할 수 있다. 

  - `createApi()` RTK query 기능의 코어이다. 데이터를 패치하고 변환하는 설정을 포함해서 엔드포인트들에서 어떻게 데이터를 패치하는지 정의할 수 있다. 케이스는 베이스 URL당 하나의 API 슬라이스를 사용해야 한다. 
  - `fetchBaseQuery()` 간단한 요청을 위한 `fetch`의 래퍼이다.

  - `Axios`를 사용하기 위해서는 아래와 같이 설정할 수 있다. 
  ```javascript 
  import { createApi } from '@reduxjs/toolkit/query'
  import axios from 'axios'

  const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axios({ url: baseUrl + url, method, data, params })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

  const api = createApi({
    baseQuery: axiosBaseQuery({
      baseUrl: 'https://example.com',
    }),
    endpoints(build) {
      return {
        query: build.query({ query: () => ({ url: '/query', method: 'get' }) }),
        mutation: build.mutation({
          query: () => ({ url: '/mutation', method: 'post' }),
        }),
      }
    },
  })
  ```

2. 스토어에 서비스 추가하기 

```javascript 
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { pokemonApi } from './services/pokemon'

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
}) // 미들웨어에 `pokemonApi`을 추가함으로 캐싱, 무효화 등의 작업를 활성화 시킬 수 있다. 

setupListeners(store.dispatch) //refetchOnFocus/refetchOnReconnect 기능을 위해 필요함
```

- `setupListeners()` refetchOnMount와 refetchOnReconnect기능을 위해 사용되는 유틸리이다. 

3. 컴포넌트에서 사용하기

```javascript 
import * as React from 'react'
import { useGetPokemonByNameQuery } from './services/pokemon'

export default function App() {
  // 자동으로 데이터를 패치하고 쿼리 값을 가져오는 쿼리 hook을 사용
  const { data, error, isLoading } = useGetPokemonByNameQuery('bulbasaur')
  // 각각의 hooks은 생성된 엔드포인트에서도 접근 가능함
  // 데이터와 로딩 상태에 따라 UI를 렌더링
}
```

4. 그렇다면 RTK Query 언제 사용해야 하나?
- 이미 Redux 어플리케이션을 가지고 있고, 작성된 데이터 패칭 로직을 단순화시키기 위해서 
- Redux DevTools를 이용해서 상태의 히스토리 변화를 보고 싶어서
- Redux 생태계에 RTK Query 기능을 통합시키고싶어서


5. RTK Query의 뮤테이션, 캐시 무효화 식별 및, 캐시 항목 추가 및 제거 , `tagTypes: ['정의']`

```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query'

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getPost: build.query({
      // note: an optional `queryFn` may be used in place of `query`
      query: (id) => ({ url: `post/${id}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response) => response.data,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
    }),
  }),
})
```

뮤테이션 엔드포인트는 createApi의 endpoints에서 객체를 반환하고 builder.mutation()메소드를 사용해서 정의한다. 뮤테이션 엔드포인트는 결과가 캐시되기 전에 응답 내용을 수정하고 캐시 무효화를 식별하기 위한 "tags"를 정의하며 캐시 항목이 추가 및 제거될 때 추가 로직을 위한 캐시 수명주기 콜백을 제공한다. 


6. RTK Query의 Hooks

```javascript 
export const PostDetail = ({ id }: { id: string }) => {
  const { data: post, isFetching, isLoading } = useGetPostQuery(id, {
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  })

  if (isLoading) return <div>Loading...</div>
  if (!post) return <div>Missing post!</div>

  return (
    <div>
      {post.name} {isFetching ? '...refetching' : ''}
    </div>
  )
}
```

- skip : 해당 렌더에 대해 실행 중인 쿼리를 '스킵'할 수 있습니다. 기본값은 false입니다. 
- pollingInterval : 지정한 간격(ms)에 따라 자동으로 쿼리를 리패치할 수 있습니다. 기본값은 0(비활성화)입니다. 
- selectFromResult : 훅에서 반환되는 결과값을 변경하고, 변경된 결과값을 렌더에 최적화할 수 있습니다. 
- refetchOnMountOrArgChange : 마운트시 항상 쿼리를 강제로 리패치할 수 있습니다(true인 경우). 동일한 캐시에 대한 마지막 쿼리 이후 충분한 시간이 경과한 경우 쿼리를 강제로 리패치할 수 있습니다(number인 경우). 기본값은 false입니다. 
- refetchOnFocus : 브라우저 창에 포커스를 다시 가질때 쿼리를 강제로 리패치할 수 있습니다. 기본값은 false입니다. 
= refetchOnReconnect : 네트워크가 다시 연결되었을때 쿼리를 강제로 리패치할 수 있습니다. 기본값은 false입니다. 

반환되는 값으로는 다음과 같다.
- data - 반환된 결과값입니다. 
- error - 에러 결과값입니다. 
- isUninitialized - true일때 쿼리가 아직 시작하지 않았음을 나타냅니다. 
- isLoading - true일때 쿼리가 처음 로딩중이고 아직 데이터가 없다는걸 나타냅니다. 이는 처음 요청에만 해당하며 이후 요청에는 해당되지 않습니다. 
- isFetching - true일때 쿼리가 현재 패칭중이지만 이전 요청의 데이터가 있을 수 있음을 나타냅니다. 이는 처음 요청과 이후 요청 모두에 해당합니다. 
- isSuccess - true일때 쿼리의 요청이 성공했고 데이터가 있음을 나타냅니다. 
- isError - true일때 쿼리의 error 상태임을 나타냅니다. 
- refetch - 쿼리를 강제 리패치 시키는 함수입니다. 
- 대부분의 상황에서 UI를 렌더링하기위해 data와 isLoading 또는 isFetching이면 충분할 것 입니다. 