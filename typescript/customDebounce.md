## Typescript - CustomDebounce

리액트 Typescript에서 CustomDebounce를 작성하고 있다. 물론 lodash의 debounce 메서드를 통해서 쉽게 구현할 수 있지만, 어렵게 구현할 줄도 알아야 하지 않을까? 

<div id="debounceHnadCoding" align="center"><img src='../img/debounceHnadCoding.jpg' width="70%"></div>

<details>
<summary>[토글] 코드 자체는 구현했다. 다음은 먼저 GPT의 도움과 각종 레퍼런스를 통해서 구현한 코드이다</summary>

```tsx
const Debounce: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [printInput3, setPrintInput3] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    customDebounceUseCallback(e.target.value)
  };

  const customDebounce = 
    (callback:(text:string)=>void, delay:number)  => {
      let timeId:NodeJS.Timeout | null = null;
      return (...args:[string]) => {
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(...args), delay) 
      }
    }

    // eslint-disable-next-line
    const customDebounceUseCallback = useCallback(
      customDebounce((text) => {
        setPrintInput3(text)
      }, 
      2000)
      ,[]
    )

     return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <div>Debounce(Custom): {printInput3}</div>
    </div>
  );
```
</details><br/>

코드는 작성했지만 이해되지 않는 부분이 있었다. 처음 접근은 나머지 매개변수(...args)나 클로저에 대한 이해의 부족으로 여겼다. 그러나 문제는 허무하게 Type설정에 대한 부분이었다. 

```tsx
  const customDebounce = 
    (callback:(text:string)=>void, delay:number)  => {
      let timeId:NodeJS.Timeout | null = null;
      return (...args:[string]) => {
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(...args), delay) 
      }
    }
```

`return (...args:[string])`에 갑자기 등장한 아이는 누구인가. 또한 timeId를 동록하는 곳에 등장하는 `timeId = setTimeout(() => callback(...args), delay)`에서 (...args)는 누구인가라는 것이다. 

이를 이해하기 위한 손코딩의 과정이 [위의 이미지](#debounceHnadCoding)이다. 그래도 도전은 응원한다. 다음 번에는 더 다양하게 생각하고 접근해 보자. 

코드를 이해하고자 했다. 

<details>
<summary>1. handleInputChange() 함수가 호출될 때</summary>

```tsx
customDebounceUseCallback(e.target.value)  // "문자열"
```

customDebounceUseCallback() 함수에 아마도 "문자열"이 인자로 담겨서 전달될 것이다. 
</details>

<details>
<summary>2. e.target.value의 할당 (1) customDebounceUseCallback함수의 실행 </summary>

`customDebounceUseCallback()`는 호출되어 동작하며 `customDebounce()`를 다시 호출시킨다. 이때 메모이제이션을 통해 컴포넌트가 리랜더링 되더라고 함수가 새로 생성되어 새로운 참조값을 가지지 않도록 함으로 내부에서 동작할 timeId의 등록과 초기화가 개발의도에 따라 동작할 준비를 하였다. 

호출된 `customDebounce()`는 아래의 두 개의 인수를 매개변수로 가져간다. 
- callback() : `(text) => {setPrintInput3(text)}`
- delay : `2000`

```tsx
    // eslint-disable-next-line
    const customDebounceUseCallback = useCallback(
      customDebounce((text) => {
        setPrintInput3(text)
      }, 
      2000)
      ,[]
    )
```
</details>

<details>
<summary>3. e.target.value의 할당 (1) customDebounce의 실행 </summary>
아래 코드에서 볼 때, 중요하게 볼 부분은 return 이다. 일단 코드를 해석하기 전에 결과를 살펴보자. 

```tsx
    const customDebounce = 
    (callback:(text:string)=>void, delay:number)  => {
      let timeId:NodeJS.Timeout | null = null;
      return (...args:[string]) => {
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(...args), delay) 
      }
    }
```
위의 코드의 결과 `customDebounce()`은 아래와 같은 익명함수가 되는 것과 마찬가지이다. 

```tsx
    const customDebounceUseCallback = useCallback(
      (...args:[string]) => {
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(...args), delay) 
      }
    )
```
결과의 코드만 봤을 때, `customDebounceUseCallback(e.target.value)`은  `(...args:[string])`에 할당되고, 그 결과 `timeId = setTimeout(() => callback(...args), delay)`를 실행하는 것이다. 다소 복잡하지만 (...args)는 나머지 매개변수로 얼마의 인자가 들어올지 모를 때 선언하는 부분이다. ES6에서 도입되었다. 그러나 인자와 매겨변수의 관계를 바로 알면 `text`와 같이 단순하게 하나의 인수만 받아도 될 것이고, 그렇다면 타입 설정을 `string`으로 해도 될 것이다. 어제부터 오늘까지  `(...args:[string])`가 무엇인가에 대해서 고민하느라 시간을 소비했지만, 함수에 대해서 조금 더 알게 된 것 같다.

위에서는 단순하게 넘어갔지만, `customDebounce()`는 클로저인데 생성 당시의 timeId 변수의 값을 참조하고 이를 계속 추적하도록 만들어 놓은 것이다. 위의 코드를 이해하고자 한 내용을 아래와 같이 정리해보았다.  

```bash
01 customDebounceUseCallback 호출 > 인수 : "문자열"
02 customDebounceUseCallback 함수 > 인수 : "문자열" 받는 매개변수를 설정 안했는데, 어떻게 동작하지
03 customDebounceUseCallback > customDebounce 호출 (callback, delay)
04 customDebounce > customDebounce (callback, delay) return (arg)??????????????? 

⬇︎⬇︎⬇︎⬇︎ 함수실행의 결과로 만들어진, 
const customDebounceUseCallback = (text) => {
   if (timeId) clearTimeout(timeId)
   timeId = setTimeout(() => callback(text), delay) 
}
```
</details>

이제 Typescript에 대한 부분이다. 왜 `(...args:[string])`가 되었는가? 몇개의 인수로 몇개를 받을 지 전제되지 않은 상황일 때를 가정했기에 강의나, 구글링은 이를 나머지 매개변수로 설정한 것이었다. 내가 들었던 강의는 JSX 였기에 TSX에서의 해당 부분이 더 이해가 되지 않았다. 그러나 위의 결과를 통해서 어떠한 결과에 따라서 해당 부분에 대한 타입이 선언되는지 고찰하였다. 

```tsx
  const customDebounce = 
    (callback:(text:string)=>void, delay:number)  => {
      let timeId:NodeJS.Timeout | null = null;
      return (...args:[string]) => {
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(...args), delay) 
      }
    }
```

그렇다면 아래와 같이 코드를 수정해도 될 것이다. 

```tsx
const customDebounce = 
    (callback:(text:string)=>void, delay:number)  => {
      // console.log("DebounceCustom 동작")
      let timeId:NodeJS.Timeout | null = null;
      // 클로저의 특성으로 외부 변수(timeId)를 참조합니다. 
      return (text:string) => { // 왜 [] 빈배열로 들어오는가 
        if(timeId) clearTimeout(timeId)
        timeId = setTimeout(() => callback(text), delay) 
      }
    }
```
받아올 인수가 하나이고, 해당 인수에 대한 타입을 알고 있기 때문이다. 그렇다면 (...나머지매개변수)를 통한 배열 생성이 아닌, `string`을 직접 지정할 수 있는 것이다. 