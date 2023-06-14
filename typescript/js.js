const customDebounce = (callback, delay)  => {
  let timeId = null;
  return (arg) => {
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => callback(arg), delay) 
  }
} 

const customDebounceUseCallback = customDebounce((text) => { 
    console.log(text)
  }, 
  2000 
)  
  

  // customDebounceUseCallback를 보면 아래 함수가 반환된 값을 받기에 
  let timeId = null;
  const customDebounceUseCallback2 = (arg) => {
    const closer = (callback, delay) => {
      return (arg) => {
        if (timeId) clearTimeout(timeId);
        timeId = setTimeout(() => callback(arg), delay);
      };
    };
    const customDebounceCallback = closer((text) => {
      console.log(text);
    }, 2000);
    customDebounceCallback(arg);
  };
  
  customDebounceUseCallback2("문자열");
  


////////////////////////////////////////////////////////////////////////////
// 함수의 인수와 매개변수
function getElement (parameter) { // 02 인수를 매개변수로 받음
  console.log(parameter) // 03 매개변수를 출력
}
// getElement("문자열") // 01 인수를 전달