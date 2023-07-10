## 우아하게 비동기 통신하기 

1. 왜 비동기 통신을 할까? 
    
        데이터를 로컬 메모리에 저장하는 것이 아니라, 서버 DB에 저장하고, 이를 가져다가 사용하겠다는 것이 핵심이에요. 
        서버에서 데이터를 보관하기 때문에, 애플리케이션의 용량이 작아집니다. 
        

2. 왜 데이터 관리에서 전역상태관리라던지, 네트워트 상태관리를 하는 것일까요? 

        리액트를 기준으로 했을 때, 컴포넌트 단위로 페이지를 구성하게 되는데, 컴포넌트 간의 데이터를 공유하기 위해서

        로컬의 메인메모리를 활용합니다. 
        (1) useState() -> 단순한 데이터에 대한 변경이 가능한 메소드를 포함한 Hook
        (2) props -> propsDrilling 발생합니다. (읽기 전용)
        (3) useContext() -> ContextAPI -> 최상단 컴포넌트에, 구독시켜서 하위 컴포넌트들이 상태를 공유하도록 만들었습니다. 
            중앙저정소가 아니기에, 각각의 useContext 필요, 예를들어 5개의 저장소가 있으면, <Provider> 5개 만들어었어야 했죠. 
        (4) Redux : `중앙상태관리소`에 대한 아이디어를 해결하기 위해 여러가지 라이브러리가 생겨났고, 
            그 가운데 오래전부터 사용되던 Redux가 자연스럽게 우위를 점하게 되었다.  

      <br/>

        서버의 확장, 개발, DB의 확장성(API 서버와 통신한다는 말)
        굳이 로컬의 메인메모리에 데이터를 저장해야 할까? DB를 만들고, DB에 저장하고, 이를 불러와서 사용하면 되지 않을까?

        MBTI 따지면, "INTP" 인트피송합니다
        (1) 리액트 쿼리 : DB에서 불러온 데이터를 캐시에 저장합니다. 접근성에서 메인메모리를 참조하는 것보다 캐시를 참조하는 게 빠릅니다. 
            캐시(SRAM)를 사용한다는 것은 동일한 값에 대해서 중복요청을 하지 않고, 그냥 가져와서 사용할 수 있는 획기적인 데이터 관리가 가능해지도록 했습니다.
            - 비동기 통신 전용 상태관리 라이브러리 입니다. 
            - 즉 메인메모리(DRAM)에 데이터를 저장하지 않아요. store를 생성할 필요가 없어요. 캐시저장하고 불러오죠.  

            [단점] : 모든 데이터를 모두, 네트워트를 통해서 받아야 할까요? 단순한 데이터도 있을 거잖아요. 
            [단점] : 산만합니다. 파일 흩어져 있어요. 
                    각각의 통신에 대한 CustomHook 속에 들어가 있거나... 등등의 이유료 간편한데 유지보수가 나이스하지 못함
            + Recoil 을 통해서 부족한 부분을 더했습니다. 
            - 비동기 통신 : React-query
            - 전역상태 : Recoil  

        MBTI 따지면, "ESTJ" 이런 느낌? 
        (2) 리덕스의 대응 : 서버에 데이터를 가져와요. Redux는 아직까지 캐시에 저장하는 것을 도입하지 못했죠. 서버에서 데이터를 가져오고, 
            기존에 있었던 메인메모리에 직접 서버의 데이터를 동기화 시켜주는 방법으로 이를 해결하고자 했습니다. 
            기존의 Redux 는 기본적으로 함수처리가 지원이 되지 않았어요. 단순하게 dispatch => 객체(action)를 전달하는 용도로 개발되었습니다. 
            dispatch => action => actionCreate => {type:"ADD_TODO", payload} 객체를 보냈단 말이에요. 
            비동기통신은 비동기통신하는 외부 로직에 전권 위임하고, 
            성공과 실패시의 상황을 가정해서 async await 와 try {} catch() 문으로 제어를 해야헸어요. 
            이게 기존의 Redux에서는 가능하지 않았기 때문에, 등장한 개념이 미들웨어 입니다. 

            dispatch => action => reducer 이를
            dispatch => action => ⭐️  미들웨어 ⭐️ => reducer 
            대표적인 미들웨어 : createAsyncThunk, redux-saga ... 등등이 있습니다. 

            [장점] : 하나의 상태는 하나의 Slice 또는 ReducerModule 안에 기록되기에 찾기가 쉽고, 
            유지보수가 간결해집니다. "디렉토리가 구성되니까"

        (3) 리덕스의 발전 : RTK-query 2021년 개념이 등장, 2022년 폭발적으로 인기를 얻고 있습니다. 생활코딩 6개월 강의를 했어요. 와! 채신기술!
            리덕스의 중앙화된 잘 정돈된 시스템에 + 비동기 통신을 가져다가 놓음으로 최강이 된 것 같아요. 
            - 메인메모리를 쓰지 않습니다. 
            - 캐시를 씁니다. 
            - 리덕스의 store 없이 '단독사용'도 가능합니다. 
            - 비동기동기 통신은 RTK-query 전담하고요, 전역상태관리는 Slice 관장을 해서, 하나의 라이브러리로 다해먹습니다. 

3. 정리해보겠습니다. 

        저희는 지금 데이터 관리에 이야기를 하고 있습니다. 
        데이터를 어떻게 전달할지에 대해서 이야기를 하고 있습니다. 
        - 데이터를 어디에 저장을 해야 효율적으로 사용할 수 있는지에 대해서 이야기를 하고 있습니다. 
        - 손에손으로 : props
        - 도라에몽 뱃속(1) : Redux (메인메모리)
        - 도라에몽 뱃속(2) : React-query, RTK-query (캐시메모리)

4. 우리의 공부의 방향

      - (1) 메인메모리에 저장을 해봅시다 : Redux (configStore)
      - (2) 메인메모리를 사용할 건데, 비동기 통신을 해봅시다 : Redux-Thunk
      - (3) 더 빠르고 강력한 캐시메모리를 사용해서, 비동기 통신을 우아하게 해봅시다 : React-query, " RTK-query "

<br/>      

5. 비동기통신을 한다는 것은 서버-클라이언트가 대화, 이를 통신이라고 부릅니다. 

      - 통신을 위해서는 통신을 도구가 필요합니다. 
      - 리액트 자체적으로 있는 fetch 가 있었죠
        더 강력하고 더 확장성이 좋은 도구가 Axios (인스턴스, 인터셉터를 지원하는 프로미스 기반의 통신 라이브러리)          
      - 서버가 개발되기 전에 클라이언트 쪽에서 가짜서버(MockingServer)를 구축해서 테스트할 수 있는 라이브러리가 json-server 에요.
      <br/><br/>

6. Redux-Thunk 

    ```bash
    # @reduxjs/toolkit 을 전제로 합니다. 
    # store 생성은 configStore
    # Modules 생성은 createSlice 

    src
    ├─ redux
    |   ├─ config 
    |   |   └─ configStore.js # configStore
    |   └─ modules
    |       ├─ itemSlice1.js # counter.js ===> createAsyncThunk(비동기 통신을 위한 actionCreate) & Slice.extraReducer: {} 
    |       ├─ itemSlice2.js # todos.js
    |       └─ itemSlice2.js # student.js 
    |
    ```

      1. createAsyncThunk(비동기 통신을 위한 actionCreate)
      2. Slice.extraReducer: {} 
      3. initialState를 확장시켜야 합니다
      <br/><br/>

    ```javascript 
    // 기존의 전역상태관리의 state
    const initialState = { todos: [] }

    // 비동기 통신의 상태관리의 state
    const initialState = {
      todos : {}, // 통신이 완료되면, 서버에 있는 state가 여기에 담겨질 겁니다.
      isLoading : false, // pending 상태를 표현해주기 위해서 : 통신이 진행 중이다. 
      isError: false // 통신이 거절당했음을 표현해주기 위해서 
      error : null // 통신 자체에 결함, 장애가 발생되었음 표현해주기 위해서, error.message 서버에서 보내줄거예요. 어떤 에러인지를 담을 수 있는 곳 
    }

    // 컴포넌트에서 데이터, isLoading, isError 에 따른 제어가 가능하죠 
    // 조건부 렌더링으로 isLoading(true) "로딩 중", isError(true) "서버에 문제가 발생했습니다.", 데이터가 오면 화면에 그려주면 주면 되죠. 
    const {date:todos, isLoading, isError} = useSelect(state => state.itemSlice1)
    ```