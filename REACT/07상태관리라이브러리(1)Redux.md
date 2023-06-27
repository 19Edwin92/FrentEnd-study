## 오늘부터 Redux
리덕스가 제어하는 중앙데이터관리소는 State를 공유하고자 할때 부-모 관계가 아니여도 되고, 중간에 의미없이 컴포넌트를 거치지 않아도 되며, 자식 컴포넌트에서 만든 State를 부모 컴포넌트에서도 사용할 수 있는 환경을 설정할 수 있다. 

- 일관적으로 동작하고, 중앙화된 상패를 제공하며, 디버깅이 쉬우며(Redux DevTools), 유연하기 때문에 사용한다. 
- 중앙 state 관리소를 사용할 수 있도록 도와주는 서드파티 라이브러리

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
    |   |   └─ counter.js // 새로운 state 생성
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

5. 리덕스 state 가져다사용하기, 리덕스 Hooks : `useSelector()`

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

5. 리덕스 state 변경하기, 리덕스 Hooks : `dispatch`    

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