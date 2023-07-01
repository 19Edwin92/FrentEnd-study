## 리액트

-   컴포넌트 단위로 애플리케이션을 제작하는 라이브러리
-   컴포넌트 분리는 컴포넌트들 사이에 데이터를 주고받을 어떤 기술 : props(단방향, 읽기전용)
-   데이터의 값이 정적인 거죠. state(useState) : 단방향으로 데이터를 읽기전용인 props 전달할 수 있지만, 이를 함수호출까지 가능하게 해서 값을 변경

### 이슈 : propsDrilling

-   부모 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 > 자녀 (여기서 쓸껀데)
-   부모부터 마지막 자녀까지 props >props >props >props >props >props >props >props >props, 오타가 발생되면, 전달이 안되겠죠.
-   useContext : ContexAPI : 부모(Provider = state={state}) 그 결과, props 없이 `부모 > ....... > 자녀` (여기서 쓸껀데)

### 그럼 상하관계가 아니라 형제관계에서는 어떻게 할껀데??

-   최상위 컴포넌트인 App.js 에다가 ContexAPI : 부모(Provider = state={state}) 구성하면 되지 않을까?

    ```jsx
    const App = () => {
      return (
        <>
          <Provider1 state={state}>
            <Provider2 state={state}>
              <Provider3 state={state}>

                  <Components1/>
                  <Components2/>
                  <Components3/>
                  <Components4/>

              </Provider3 state={state}>
            </Provider2 state={state}>
          </Provider1 state={state}>
        </>
      )
    }
    ```

### 전역에서 상태를 관리한다는 것은 어떤걸까?

-   리액트가 나오기 전부터, 다른 언어에서도 많이 사용되던 `리덕스`가 가장 인기있게 도입된 이유가 되었죠.

    ```jsx
    const App = () => {
    	return (
    		<>
    			<Provider1 store={store}>
    				<Components1 />
    				<Components2 />
    				<Components3 />
    				<Components4 />
    			</Provider1>
    		</>
    	);
    };
    ```

### 리덕스는 구축하는 부분에서 조금 복잡합니다.

-   설정해 줄 것이 많아서

1. configStore
2. modules(Reducer)
3. index.jsx || App.jsx > configStore 시스템을 구독시켜줘야 하고요
4. 각 컴포넌트에서 가져다가 쓰면 됩니다.

### 리덕스의 디렉토리

```bash
src
├ redux
|  ├ config
|  |  └ configStor.js # 01 store 생성하기
|  |
|  └ modules
|     ├ Reducer1.js  # 02 modules(Reducer) 생성하기
|     └ Reducer2.js  # 02 modules(Reducer) 생성하기
|
├ index.jsx # 03 Provider 로 store 구독시키기
└ App.jsx # >> 04 각 컴포넌트에서 가져다 사용하기
```

<details>
<summary>첫째, configStore </summary>

1. 컴바인리듀서 : modules 폴더에 있는 모든 리듀서를 하나로 통합해요.
2. createStore(컴바인리듀서) 등록시켜줍니다. >> export default `store`

#### redux-toolkit

1. configStore : reducers:{} >> 기존에 있었던 두가지 작업이 하나로 합쳐진 것 뿐 다를게 없어요.
 </details>

<details>
<summary>둘째, modules(Reducer) </summary>

#### 아마 이 부분이 제일 어려울 것 같아요.

-   이유 : 규칙이 없어서 그래요. 한동안은 그랬죠. `Duck Pattern` 등장하고, 정설이되었어요. 국률이되었다는 이야기죠.
-   모든 리덕스 모듈의 리듀서는 `Duck Pattern`으로 작성을 합니다.

1.  `Duck Pattern`
    -   (1) Action Key : 휴면에러를 방지하기 위해서
    -   (2) Action Create : usedispatch롤 호출할 Reducer의 각각의 case에 대해서 만들어서 내보내줘요.(사용처는 컴포넌트)
    -   (3) initialState : 초기값
    -   (4) Reducer : Action Create에 의해서 호출된 Reducer가 type에 따라서 동작을 수행하게될 로직을 담당해요(반환값이 여기서 만들어지니다.)

#### `redux-toolkit` : 위의 4단계를 2단계로 축소해요.

-   (1) initialState : 초기값
-   (2) Slice :` Action Key+Action Create+Reducer` 작업을 한번에 처리합니다.

</details>

<details>
<summary>셋째, react-redux </summary>

1. yarn add redux : redux는 redux 자체입니다. > 리액트의 전역상태관리를 위한 `서드파티`
2. yarn add react-redux : redux를 React에서 쉽게 쓰라고 만든 라이브러리 > 리액트의 전역상태관리를 위한 `서트바티` redux를 쉽게 쓰기 위한 `서드파티`
    - v6.x.x : connect > 컴포넌트에 props ....
    - v7.x.x. : useSelect(), useDispatch()

</details>
