## Typescript - CustomDebounce

리액트 Typescript에서 CustomDebounce를 작성하고 있다. 물론 lodash의 debounce 메서드를 통해서 쉽게 구현할 수 있지만, 어렵게 구현할 줄도 알아야 하지 않을까? 

<div id="debounceHnadCoding" align="center"><img src='../img/debounceHnadCoding.jpg' width="100%"></div>

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

이를 이해하기 위한 손코딩의 과정이 [위의 이미지](#debounceHnadCoding)이다. 부질없었다. 