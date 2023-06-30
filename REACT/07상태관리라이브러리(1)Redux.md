## 오늘부터 Redux
리덕스가 제어하는 중앙데이터관리소는 State를 공유하고자 할때 부-모 관계가 아니여도 되고, 중간에 의미없이 컴포넌트를 거치지 않아도 되며, 자식 컴포넌트에서 만든 State를 부모 컴포넌트에서도 사용할 수 있는 환경을 설정할 수 있다. 

[벨로퍼트](https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e)에 따르면 리덕스를 사용할 때 3가지의 규칙이 있다. 

하나, 하나의 애플리케이션 안에는 하나의 스토어만 존재해야 한다. 
- 여러 개의 스토어를 사용하는 것은 가능하나 권장되지 않는다. 
- 기술상으로 가능하나, 그렇게 되면 개발 도구를 충분히 활용하지 못하게 된다는 점이 있다. 

둘째, 상태는 읽기전용이다. 
- 리액트의 상태변경은, 새로운 배열을 또는 객체를 생성하며, 불변성을 유지시켜야 합니다. 객체는 `Object.assign` 또는 `스프레드 연산자`를 통해서 업데이를 했었다. 
- 여기서 등장하는 개념이 [`Immutable`](https://velopert.com/3486)이다. `yarn add immutable`패키지는 이를 도와준다. 객체는 Map 메소드를, 배열은 List 메서드를 통해서 불변객체를 생성한다. 

셋째, 변화를 일으키는 함수, 리듀서는 순수한 함수여야 한다. 

<hr/>

1. 리액트 프로그램에 리덕스를 설치해봅시다. 
    ```bash
    yarn add redux react-redux
    ```
    - redux 는 리덕스 자체
    - react-redux 는 리액트에서 리덕스를 사용할 수 있도록 도와주는 라이브러리
<br/><br/>    

2. 리덕스의 폴더구조

    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js
    |   └─ modules
    ```

    - redux : 리덕스 관련 코드의 폴더
      - (1) config : 리덕스 설정 관련 폴더
        - configStore : 중앙 state 관리소, 설정코드
      - (2) modules : state들을 담을 폴더 : counter.js / todos.js
<br/><br/>  

3. 리덕스 : `configStore.js`

    <details>
    <summary>상세내용</summary>

      ```jsx
      import { createStore } from "redux";
      import { combineReducers } from "redux";
      // modules : state들을 담을 폴더 : counter.js / todos.js

      const rootReducer = combineReducers({counter, todos}); 
      const store = createStore(rootReducer); 

      export default store; 
      ```
      - createStore()

          리덕스의 가장 핵심이 되는 스토어를 만드는 메소드(함수) 입니다. 
          리덕스는 단일 스토어로 모든 상태 트리를 관리한다고 설명해 드렸죠? 
          리덕스를 사용할 시 creatorStore를 호출할 일은 한 번밖에 없을 거예요.

      - combineReducers()

          리덕스는 action —> dispatch —> reducer 순으로 동작한다고 말씀드렸죠? 
          이때 애플리케이션이 복잡해지게 되면 reducer 부분을 여러 개로 나눠야 하는 경우가 발생합니다. 
          combineReducers은 여러 개의 독립적인 reducer의 반환 값을 하나의 상태 객체로 만들어줍니다.
    </details><br/>


4. 리덕스 : `index.js`

    <details>
    <summary>상세내용</summary>

    ```jsx
    import React from "react";
    import ReactDOM from "react-dom/client";
    import App from "./App";
    import reportWebVitals from "./reportWebVitals";

    // 우리가 추가할 코드
    import { Provider } from "react-redux";
    import store from "./redux/config/configStore";

    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(

      <Provider store={store}> 
        <App />
      </Provider>
    );
    ```

    - `configStore.js`

        `configStore.js`에서 생성한 `store`를 가져와서 전역으로 공유하겠다는 선언이 `<Provider store={store}>`의 의미입니다. 

    </details><br/>    

5. 리덕스 모듈만들기 : `modules` : useState로 만들었던 지역상태를, 전역상태로 확장시키기

    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js
    |   └─ modules
    |       └─ counter.js // 새로운 state 생성
    ```        

    <details>
    <summary>상세내용</summary>

    - counter.js

      ```jsx
      // 초기 상태값
      const initialState = {
        number: 0,
      };

      // 리듀서 // 매개변수1(초기값;상태), 매개변수2(동작;액션)
      const counter = (state = initialState, action) => {
        switch (action.type) {
          default:
            return state;
        }
      };

      // 모듈파일에서는 리듀서를 export default 한다.
      export default counter;
      ```

    - Store에 생성한 state(modules) 넣어주기

      ```bash
      src
      ├─ redux
      |   ├─ config 
      |   |   └─ configStore.js // 여기로 이동
      |   └─ modules
      |   |   └─ counter.js
      ```     

      ```jsx
      import { createStore } from "redux";
      import { combineReducers } from "redux";
      import counter from '../modules.counter'

      const rootReducer = combineReducers({counter, todos}); 
      const store = createStore(rootReducer); 

      export default store; 
      ```

    </details><br/>  

6. 리덕스 state 가져다사용하기, 리덕스 Hooks : `useSelector()`

    `useSelector()`는 리덕스를 쉽게 사용하게 하기위해서 설치한 `react-redux`에서 제공하는 Hooks 입니다. 

    <details>
    <summary>상세내용</summary>

    ```jsx
    // src/App.js
    import React from "react";
    import { useSelector } from "react-redux"; 

    const App = () => {
      const counterStore = useSelector((state) => state.counter);
      const number = counterStore.number

      return <div>{number}</div>;
    }

    export default App;
    ```
    </details>

7. 리덕스 state 변경하기, 리덕스 Hooks : `dispatch`    

    - 출처 : [/@annahyr](https://velog.io/@annahyr/리덕스-흐름-이해하기)

      <div align="center">
      <img src="https://file.notion.so/f/s/45e1d2ac-632a-4b6b-a46a-4a337c6e234e/images_annahyr_post_8ee92e54-dbab-4a74-8af1-f8680e8848e3_models_redux_animation.gif?id=83922d5e-b98c-400d-a87e-b12a70d34fff&table=block&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&expirationTimestamp=1687919205136&signature=JtkXjc482mXTjHiq-fTJmFfGMp0jxnRyLFN6uxfLf04" width="100%">
      </div><br/>

    <details>
    <summary>(1) dispatch를 활용하여, 동작을 발생하기:액션객체</summary>      

    - `dispatch`는 'state'에 대한 동작(action)을 수행해달라고 요청하는 메서드
    - `action obj` : {type, payload}를 가지고 있기에, 액션 객체라고 부른다.  

    Redux Store에 있는 state(Modules)에 대한 변경은 `react-redux`의 Hooks인 `useDispatch()`가 수행한다. 

    ```jsx
    import { useSelector, useDispatch } from "react-redux";
    const App = () => {
      const counterStore = useSelector((state) => state.counter);
      const number = counterStore.number
      const dispatch = useDispatch(); 
      return (
        <div>
        <p>{number}</p>
        <button onClick={()=>dispatch({ type: "PLUS_ONE" })}>더하기</button>
        <button onClick={()=>dispatch({ type: "MINUS_ONE" })}>더하기</button>
        </div>
      )
    }  
    ```
    </details>
    <details>
    <summary>(2) dispatch에 활용된, 액션객체란? {type: "PLUS_ONE"}</summary>

      ```bash
      src
      ├─ redux
      |   ├─ config 
      |   |   └─ configStore.js 
      |   └─ modules
      |   |   └─ counter.js // 여기로 이동
      ``` 


      ```jsx
      const initialState = {
        number: 0,
      };

      const counter = (state = initialState, action) => {
        switch (action.type) {
          case "PLUS_ONE":
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number + 1,
            };
          case "MINUS_ONE":
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number - 1,
            };  
          default:
            return state;
        }
      };

      export default counter;
      ```
    </details><br/>   

8. 리덕스 코드 컨벤션 : Redux Ducks Patten 을 위한 준비 
  - ActionType
  - Action Create : dispatch에 선언될 액션객체를 생성하기, Action value를 반환
  - Action value
  - Initial State
  - Reducer
  - export default reducer

    <hr/>

    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js 
    |   └─ modules
    |       └─ counter.js // 여기로 이동
    ``` 

    <details>
    <summary>ActionType : 상수로 선언하여 관리하기 </summary>

      ```jsx
      export const PLUS_ONE = "PLUS_ONE"
      export const MINUS_ONE = "MINUS_ONE"

      const initialState = {
        number: 0,
      };

      const counter = (state = initialState, action) => {
        switch (action.type) {
          case PLUS_ONE:
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number + 1,
            };
          case MINUS_ONE:
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number - 1,
            };  
          default:
            return state;
        }
      };

      export default counter;
      ```
    </details><br/>   

    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js 
    |   └─ modules
    |       └─ counter.js
    |
    └─ App.js // 여기로 이동
    ``` 

    <details>
    <summary>ActionType : 상수로 선언하여 관리하기, dispatch에서도 활용하기(휴먼에러 방지) </summary>

    ```jsx
    import { useSelector, useDispatch } from "react-redux";
    import { PLUS_ONE,MINUS_ONE } from './redux/modules/counter'

    const App = () => {
      const counterStore = useSelector((state) => state.counter);
      const number = counterStore.number
      const dispatch = useDispatch(); 
      return (
        <div>
        <p>{number}</p>
        <button onClick={()=>dispatch({ type: PLUS_ONE })}>더하기</button>
        <button onClick={()=>dispatch({ type: MINUS_ONE })}>더하기</button>
        </div>
      )
    }  
    ```

    추후의 유지보수는 `counter.js`에서 한 번 수정함으로, 해당 상수가 사용된 프로젝트 전체 내에서의 유지보수가 개선되는 것을 볼 수 있다. 
    </details><br/>

    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js 
    |   └─ modules
    |       └─ counter.js // 여기로 이동
    ``` 

    <details>
    <summary>Action Create : 액션객체 생성하기 </summary>

      ```jsx
      // 01 ActionType 선언
      export const PLUS_ONE = "PLUS_ONE"
      export const MINUS_ONE = "MINUS_ONE"

      // 02 ActionCreate 생성 : 액션객체 생성
      export const plusNumber = () => {
        return {
          type : PLUS_ONE
        }
      }

      const initialState = {
        number: 0,
      };

      const counter = (state = initialState, action) => {
        switch (action.type) {
          case PLUS_ONE:
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number + 1,
            };
          case MINUS_ONE:
            return {
              // 기존 state에 있던 number에 +1을 더한다.
              number: state.number - 1,
            };  
          default:
            return state;
        }
      };

      export default counter;


      // App.js 로 이동
      import { useSelector, useDispatch } from "react-redux";
      import { PLUS_ONE,MINUS_ONE, plusNumber } from './redux/modules/counter'

      const App = () => {
        const counterStore = useSelector((state) => state.counter);
        const number = counterStore.number
        const dispatch = useDispatch(); 
        return (
          <div>
          <p>{number}</p>
          {/* 이전과 동일하게 구성되는 것을 볼 수 있습니다 */}
          <button onClick={()=>dispatch(plusNumber())}>더하기</button>
          <button onClick={()=>dispatch({ type: MINUS_ONE })}>더하기</button>
          </div>
        )
      }  
      ```
    </details>

    <details>
    <summary>Action Create : 액션객체 생성하기(payload) </summary>   

    ```jsx
    // 02 ActionCreate 생성 : 액션객체 생성
    export const plusNumber = (payload) => {
      return {
        type : PLUS_ONE,
        payload
      }
    }
    // Initial State
    const initialState = {
        number: 0,
      };
    // Reducer
    const counter = (state = initialState, action) => {
      switch (action.type) {
        case PLUS_ONE:
          return {
            // 기존 state에 있던 number에 +1을 더한다.
            number: state.number + action.payload,
          };
        case MINUS_ONE:
          return {
            // 기존 state에 있던 number에 +1을 더한다.
            number: state.number - 1,
          };  
        default:
          return state;
      }
    };  

    // App.js
    const App = () => {
        const counterStore = useSelector((state) => state.counter);
        const number = counterStore.number
        const dispatch = useDispatch(); 
        return (
          <div>
          <p>{number}</p>
          <button onClick={()=>dispatch(plusNumber(1))}>더하기</button>
          </div>
        )
      }  

    ```
    </details><br/>

9. 리덕스 코드 컨벤션 : Redux Ducks Patten

    `Erik Rasmussn` 라는 개발자가 이것을 패턴화하여 작성하는 것을 제안했는데, 그것이 바로 Ducks패턴이다. 

    - Reducer 함수를 `export default` 한다.
    - Action creator 함수들을 `export` 한다.
    - Action type은 `app/reducer/ACTION_TYPE` 형태로 작성한다.
    - 즉, 모듈 파일 1개에 Action Type, Action Creator, Reducer 가 모두 존재하는 작성방식

10. 리덕스 legacy_createStore(기존의 `CreateStore`)     

    리덕스 현재 [v4.2.1](https://npmtrends.com/redux)으로 제공되고 있다.v4.2가 되면서 그 이전에 store를 생성하던 `CreateStore`가 이제는 사용하지 않을 것을 리액트팀에서는 권장하고 있다. 그 결과 리액트App에서 `CreateStore`를 임포트 하면, import { ~~createStore~~ } from "redux" 이와 같이 취소선이 그어져 있는 것을 확인할 수 있다.  

    물론 사용할 수 있는 방법은 있다. `legacy_createStore` 변경된 이름을 사용하고, as를 통해 별칭을 지정해주어 사용하는 것이다. 

    ```jsx
    import { legacy_createStore as createStore } from "redux";
    import { combineReducers } from "redux";

    const rootReducer = combineReducers({}); 
    const store = createStore(rootReducer); 

    export default store; 
    ```

    권장하지 않는다는 것은 새로운 것이 권장된다는 이야기이다. 바로 `@reduxjs/toolkit`을 사용하라는 것이다. 

    ```bash
    yarn add @reduxjs/toolkit -D
    ```

    그 후에는 createStore 대신 `configureStore`를 사용하는 것이다. 
    ```jsx
    import { configureStore } from '@reduxjs/toolkit'
    const store = configureStore({
      reducer: {},
    })
    ```
    보면 하나의 configureStore 안에 기존의 코드에서 `createStore(combineReducers({}))`를 통해서 기록했던 내용이 하나로 축약된 것을 볼 수 있다. 

    ```jsx
    import { createStore } from "redux";
    import { combineReducers } from "redux";
    import counter from '../modules.counter'

    const rootReducer = combineReducers({counter, todos}); 
    const store = createStore(rootReducer); 
    ```

    `@reduxjs/toolkit`를 사용한다는 것이 가지는 의미는 더 있다. 바로 비동기 프로그래밍을 위한 유틸리티를 제공한다는 것이다. 기존의 dispatch의 payload는 객체를 전달할 뿐 함수의 동작이 가능하지 않았기 때문이다. 반면에 확장된 `@reduxjs/toolkit`은 dispatch의 payload에 비동기 프로그래밍을 가능하게 한다. 

    - createAsyncThunk
    - createSlice

    `@reduxjs/toolkit`으로 코드를 전환했을 때, 문제가 발생되었다. 

    ```jsx
    // toolkit으로 전환하기 전의 코드 
    case (UPDATE_TODO):
      const findIndex = state.findIndex(item => item.id === actions.payload)
      const newTodos = [...state]
      newTodos[findIndex].state = !newTodos[findIndex].state
      return state = [...newTodos]
      
    // toolkit으로 전환한 후의 코드
    case (UPDATE_TODO):
      return state.map(todo => {
        if (todo.id === actions.payload) {
          return { ...todo, state: !todo.state };
        }
        return todo;
      }); 
    ```

    문제가 된 에러 메시지는 아래와 같다. 

    ```bash
    Invariant failed: A state mutation was detected inside a dispatch, in the path: todoList.0.state. Take a look at the reducer(s) handling the action {"type":"UPDATE_TODO","payload":1}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)
    ```

    해당 문제는 Redux 스토어에서 상태를 변경하는 동안에 발생한 불변성 위반에 대한 에러이다. Redux는 상태 변경을 추적하기 위헤 불변성을 강조한다. 즉 스토어의 상태를 직접적으로 수정하는 것이 지양된다는 점이다. 새로운 상태 객체를 반환해야 한다. 문제는 `todoList.0.state`를 직접 변경하고자했기 때문이다. 

    이를 인정하기에, 아래와 같이, 깊은복사를 활용하여 접근하고자 하였다. 그러나 에러가 발생되었다. GPT에게 물어보니, 깊은복사를 했더라도, 여전히 본래의 `state`를 직접 수정하려 하기에 문제가 발생되었다고 한다. 

    ```jsx
    const newTodos = [...state]
    newTodos[findIndex].state = !newTodos[findIndex].state
    ```

    기존의 Redux에 문제가 없었지만, `@reduxjs/toolkit`으로 코드를 수정하며 문제가 발생되었다. `@reduxjs/toolkit`는 `createSlice`와 `createReducer`와 같은 함수를 사용하여 상태 업데이트 진행하며, 내부적으로  `immer`라는 라이브러리를 사용하여 불변성을 유지를 감지한다고 한다. `@reduxjs/toolkit`에서는 불변성 위반 문제를 이 과정에서 감지를 했기에, 에러가 발생된 것이다. 






<br/><br/>

11. Redux 데브툴 관련 설정 
    ```bash
    yarn add redux-devtools-extension
    ```

    [벨로퍼트](https://online.spartacodingclub.kr/enrolleds/6494fcab02a9e5315f8e622d/edetails/6494fcac02a9e5315f8e6242?course_id=63e20738118ac7ca3cb6bee0)의 강의안에 따라 해당 내용을 정리해보고자 한다. 

    <div align="center">
      <img src="https://i.imgur.com/bw9MfbA.png" width="100%">
    </div>

    `리덕스 개발자 도구`는 현재 스토어의 상태를 개발자 도구를 통해 조회할 수 있도록 도와준다. 이를 위해서는 크롬 웹 스토어에서도 확장 프로그램을 설치해줘야 한다. 


    ```bash
    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js 
    |   └─ modules
    |       └─ counter.js 
    └─ index.js // 여기로 이동
    ``` 

    
    