function solution(numbers, target) {
  let count = 0;

  function calculate(idx, value) {
    if (idx === numbers.length) { // 배열의 모든 요소를 계산한 경우
      if (value === target) { // 타겟 넘버를 만든 경우
        count++;
      }
      return;
    }

    calculate(idx + 1, value + numbers[idx]); // 현재 요소를 더한 경우
    calculate(idx + 1, value - numbers[idx]); // 현재 요소를 뺀 경우
  }

  calculate(0, 0); // 재귀 함수 호출

  return count;
}

console.log(solution([4, 1, 2, 1], 4))

/*
4 1 2 1 : -4 +1 +2 +1 = 0
4 1 2 1 : 4 -1 +2 +1 = 4
4 1 2 1 : 4 -1 -2 +1 = 2
*/