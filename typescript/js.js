const customDebounce = (callback, delay)  => {
  let timeId = null;
  return (arg) => {   // arg???? 
    if (timeId) clearTimeout(timeId)
    timeId = setTimeout(() => callback(arg), delay) 
  }
} 

const customDebounceUseCallback = customDebounce(
  (text) => { console.log(text)}, 5000 
)  

customDebounceUseCallback("문자열");


// 01 customDebounceUseCallback 호출 > 인수 : "문자열"
// 02 customDebounceUseCallback 함수 > 인수 : "문자열" 받는 매개변수를 설정 안했는데, 어떻게 동작하지? ?? "문자열??"
// 03 customDebounceUseCallback > customDebounce 호출 (callback, delay)
// 04 customDebounce > customDebounce (callback, delay) return (arg)??????????????? 


// ⬇︎⬇︎⬇︎⬇︎ 함수실행의 결과로 만들어진, 
// const customDebounceUseCallback = (text) => {   // customDebounceUseCallback("문자열") >> (arg)
//   if (timeId) clearTimeout(timeId)
//   timeId = setTimeout(() => callback(text), delay) 
// }

  

  // customDebounceUseCallback를 보면 아래 함수가 반환된 값을 받기에 
  // let timeId = null;
  // const customDebounceUseCallback2 = (arg) => {
  //   const closer = (callback, delay) => {
  //     return (arg) => {
  //       if (timeId) clearTimeout(timeId);
  //       timeId = setTimeout(() => callback(arg), delay);
  //     };
  //   };
  //   const customDebounceCallback = closer((text) => {
  //     console.log(text);
  //   }, 2000);
  //   customDebounceCallback(arg);
  // };
  
  // customDebounceUseCallback2("문자열");
  


////////////////////////////////////////////////////////////////////////////
// 함수의 인수와 매개변수
// function getElement (parameter) { // 02 인수를 매개변수로 받음
//   console.log(parameter) // 03 매개변수를 출력
// }
// getElement("문자열") // 01 인수를 전달