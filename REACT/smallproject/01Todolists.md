## 또두리스트 

<details>
<summary>이번에 또두리스트</summary>

  ```jsx
  import React from "react";
  import * as Styled from "./styled";
  import { useTodos } from "./hooks/useTodos";
  import Form from "./components/Form";
  import Header from "./components/Header";
  import TodoLists from "./components/TodoLists";

  function App() {
    const {
      inputTitle,
      inputContent,
      todoList,
      onChangeInput,
      onSubmitHandler,
      onDeteleHandler,
      onDoneHandler,
    } = useTodos();

    return (
      <>
        <Styled.Layout>
          <Header/>
          <Form
            titlevalue={inputTitle}
            contentvalue={inputContent}
            onSubmit={onSubmitHandler}
            onChangeInput={onChangeInput}
          />
          <TodoLists
            title="Working..🍟"
            type={false}
            todoList={todoList}
            onDeteleHandler={onDeteleHandler}
            onDoneHandler={onDoneHandler}
          />
          <TodoLists
            title="Done..🥑"
            type={true}
            todoList={todoList}
            onDeteleHandler={onDeteleHandler}
            onDoneHandler={onDoneHandler}
          />
        </Styled.Layout>
      </>
    );
  }

  export default App;
  ```
</details>

어떻게 보면 이것이 `아토믹 디자인의 템플릿`에 해당되지 않을까 싶다. `템플릿`은 하위 컴포넌트들의 배치가 목적인 컴포넌트로 페이지의 구조나 레아이웃 구성을 담당한다. 컴포넌트 블럭들의 위치와 자리배치에 해당되는 개념이다. 

1. `Styled.Layout`는 해당 페이지의 전체적인 레이아웃을 담당하고, 안에 있는 구성요소의 자리배치를 지정한다. 
2. `Header` : 말 그대로, 헤더를 담당한다. 별 내용이 없다. 
3. `Form` : 사용자로부터 input으로 입력받는 부분을 담당하는 컴포넌트이다. 
4. `TodoLists` : TodoList의 상태에 따라 화면에 기록되도록 하는 컴포넌트이다. `type`을 받고 해당 타입에  따라 `filter`를 통해 자료를 구분하고, 그 결과를 `map`메서드를 통해서 화면에 그려주는 컴포넌트이다. 

    <details>
    <summary>TodoLists 코드 살펴보기 </summary>

    - `props`로 받아온 `todoList`에 대해서 `type: false, true`에 따라서, `filter((item) => item.state === type)`를 통해서 한차례 필터처리를 해주고, `map((item) => ()`를 통해서 `태그`들을 내보주었다. <br/><br/>

    ```jsx
    import React from "react";
    import * as Styled from "../styled";

    function TodoLists({title, type, todoList, onDeteleHandler, onDoneHandler }) {
      return (
        <>
          <div>{title}</div>
          <Styled.TodoBoxLayout>
            {todoList
              .filter((item) => item.state === type)
              .map((item) => (
                <Styled.TodoBox key={item.id}>
                  <p>{item.title}</p>
                  <p>{item.content}</p>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <Styled.TodoBtn
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDeteleHandler(item.id)}
                    >
                      삭제하기
                    </Styled.TodoBtn>
                    <Styled.TodoBtn
                      color="teal"
                      onClick={() => onDoneHandler(item.id)}>
                      {item.state ? "취소" : "완료"}
                    </Styled.TodoBtn>
                  </div>
                </Styled.TodoBox>
              ))}
          </Styled.TodoBoxLayout>
          <div children={`나는`}/>
        </>
      );
    }
    export default TodoLists;
    ```
    </details>

전체적으로 해당 컴포넌트는 `컨테이터 컴포넌트`라고 부를 수 있다. 해당 컴포넌트는 자리배치만 할 뿐, 디자인과 관련된 부분은 없다. 단지 정보를 처리하고 해당 정보를 `props`로 전달하는 것 뿐이다. 

5. `useTodos()` : 데이터의 가공과 처리를 전담하는 컴포넌트이다.
    <details>
    <summary>useTodos() 전체코드</summary>

    ```jsx
    import { useState } from "react"
    import { todoLists } from "../js/todo"

    export const useTodos = () => {
      const [inputTitle, setInputTitle] = useState("")
      const [inputContent, setInputContent] = useState("")
      const [todoList, setTodoLists] =  useState(todoLists)

        // CREATE - INPUT
        const onChangeInput = (e, type) => {
          switch (type) {
            case "title":
              setInputTitle(e.target.value);
              break;
            case "content":
              setInputContent(e.target.value);
              break;
            default:
          }
        }

      // CREATE - SUBMIT
      const onSubmitHandler = (e) => {
        e.preventDefault()
        const createTodo = {
          id:Date.now(),
          title:inputTitle,
          content:inputContent,
          state : false
        }

        if(!inputTitle || !inputContent) {
          if(!inputTitle && !inputContent) {
            return alert("제목과 내용 모두 기록해주세요.")
          } else if(!inputTitle) {
            return alert("제목을 기록해주세요.")
          } else if(!inputContent) {
            return alert("내용을 기록해주세요.")
          }
        }

        inputTitle && inputContent && 
        setTodoLists([...todoList, createTodo])
        setInputTitle("")
        setInputContent("")
      }

      // DETELT
      const onDeteleHandler =  (id) => {
        setTodoLists([...todoList.filter(idlist => idlist.id !== id)])
      }

      // UPDATE
      const onDoneHandler = (id) => {
        const updateTodo = todoList.findIndex(item => item.id === id)
        todoList.slice(updateTodo, 1, todoList[updateTodo].state =!todoList[updateTodo].state)
        setTodoLists([...todoList])
      } 
      return {inputTitle, inputContent, todoList, onChangeInput, onSubmitHandler, onDeteleHandler, onDoneHandler}   
    }
    ```
    </details>

  - input에 대한 `useState`를 포함하여 모든 코드를 하나의 useCustomHooks에서 관리하도록 하였다. 
  - API 통신일 경우, 각각의 요청마다 빠로 Hooks를 관리하는 것이 권장되지만, 프로젝트의 단위가 작아 그냥 진행하였다. 
  - useState의 set 함수는 Hooks에서 관리하고, 값과 함수만 return 으로 반환하였다. 


