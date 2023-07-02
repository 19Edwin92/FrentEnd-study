## 08상태관리라이브러리(2)ReduxThunk

[벨로퍼트](https://react.vlpt.us/redux-middleware/)에 따르면, `미들웨어`는 리덕스가 지니고 있는 핵심 기능으로, 미들웨어를 사용하면 액션이 디스패치 된 다음, 리듀서에서 해당 액셩을 받아와서 업데이트하기 전에 추가적인 작업을 수행할 수 있도록 한 것이다. 

- 특정 조건에 따라 액션이 무시되게 만들 수 있다. 
- 액션을 콘솔에 출력하거나, 서버쪽으로 로깅 할 수 있다. 
- 액션을 수정해서 리듀서에게 전달할 수 있다. 
- 특정 액션이 발생했을 대, 이를 기반으로 다른 액션이 발생되도록 할 수 있다. 

### 리덕스에서 미들웨어의 사용처
보통 리덕스 미들웨어는 비동기 작업을 처리할 때 사용한다. 이와 관련된 미들웨어 라이브러리에는 다음과 같은 것들이 존재한다. 

- redux-thunk
- redux-saga
- redux-observable
- redux-promise-middleware

redux-saga와 redux-observable의 경우에는 특정 액션을 모니터링 할 수 있으며, 특정 액션이 디스패치되었을 때 원하는 함수를 호출, 또는 라우터를 통해 다른 주소로 이동하는 것도 가능하다. 

### 리덕스 미들웨어 redux-thunk
`redux-thunk`은 리덕스에서 비동기 작업을 처리할 때 가장 많이 사용하는 미들웨어이며, 액션 객체가 아닌 함수를 디스패치 할 수 있도록 한다. 

이를 위해, dispatch 와 getState 를 파라미터로 받아와야 하며, 이 함수를 만들어주는 함수를 `thunk`라고 부른다. 

```bash
yarn add redux-thunk
```

이후, store에 미들웨어를 아래와 같이 추가해 준다. 
```javascript 
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
  composeWithDevTools(applyMiddleware(ReduxThunk))
);
```