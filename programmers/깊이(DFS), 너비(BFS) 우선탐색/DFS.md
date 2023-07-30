## 깊이/너비 우선 탐색(DFS/BFS)

    `깊이 우선 탐색(DFS)`은 트리나 그래프에서 한 방향으로 계속해서 파고들어가면서 탐색을 진행하는 알고리즘입니다. 재귀적인 방식으로 구현할 수 있습니다. 주어진 문제에서는 재귀 함수를 사용하여 각 요소를 선택하고 더하거나 빼면서 타겟 넘버를 만들 수 있는 모든 경우를 탐색하는 것이 DFS의 개념과 유사합니다.

    `너비 우선 탐색(BFS)`은 트리나 그래프에서 가까운 노드부터 탐색을 진행하는 알고리즘입니다. 큐(Queue)를 사용하여 탐색할 노드를 순서대로 유지합니다. 주어진 문제에서는 BFS를 사용하여 숫자 배열의 요소를 순차적으로 탐색하고, 각 요소를 더하거나 빼는 방식으로 모든 경우의 수를 탐색할 수 있습니다.
    
DFS(Depth-First Search)와 BFS(Breadth-First Search)는 그래프 탐색 알고리즘으로, 다양한 문제에 적용되며, 각각의 특성에 따라 다른 요구에 의해 등장하였습니다.

DFS(Depth-First Search):
DFS는 깊이 우선 탐색으로, 더 이상 방문할 노드가 없을 때까지 최대한 깊이 탐색하다가 더 이상 진행할 수 없을 때 이전 단계로 돌아가서 다른 경로를 탐색하는 방법입니다. DFS는 주로 다음과 같은 상황에서 사용됩니다:
백트래킹(backtracking): 문제의 해를 찾는 도중에 해가 될 가능성이 없는 경우, 더 이상 탐색하지 않고 이전 단계로 돌아가는 기법에 많이 사용됩니다.
미로 찾기: 미로 상에서 출발점부터 도착점까지 가는 경로를 찾는데 유용합니다.
그래프 탐색: 그래프의 모든 노드를 탐색해야 할 때 사용됩니다.
DFS는 스택(Stack) 자료구조를 활용하거나 재귀 함수를 이용하여 구현할 수 있습니다.

BFS(Breadth-First Search):
BFS는 너비 우선 탐색으로, 시작 노드에서부터 거리에 따라 단계적으로 모든 노드를 탐색하는 방법입니다. BFS는 주로 다음과 같은 상황에서 사용됩니다:
최단 경로 찾기: 그래프 상에서 두 노드 사이의 최단 경로를 찾는데 유용합니다. 거리가 가까운 노드부터 탐색하므로 최단 경로를 먼저 찾을 수 있습니다.
최소 비용 문제: 그래프의 간선에 가중치가 있는 경우, 최소 비용을 구하는 문제에 사용됩니다.
그래프 탐색: 그래프의 모든 노드를 탐색해야 할 때 사용됩니다.
BFS는 큐(Queue) 자료구조를 활용하여 구현합니다.

DFS와 BFS는 각각 다른 탐색 방법을 가지고 있기 때문에, 문제의 특성에 따라 적합한 탐색 방법을 선택하여 사용합니다. 예를 들어, 최단 경로를 찾는 문제에서는 BFS가 유리하고, 백트래킹이 필요한 경우에는 DFS가 유리할 수 있습니다. 그래프의 구조와 문제의 성격에 따라 적합한 알고리즘을 선택하여 적용하는 것이 중요합니다.




### [타겟 넘버](https://school.programmers.co.kr/learn/courses/30/lessons/43165)
- [코드 돌아가는 로직보기](https://pythontutor.com/render.html#mode=display)

<details>
<summary>01 나의 접근</summary>

```javascript 
function solution(numbers, target) {
    let count = 0;
    numbers.forEach((num, idx)=> {
       let answer = numbers.reduce((pre,cur, idx2) => pre < target 
          ? pre + (idx === idx2 ? -cur : cur) 
          : pre - (idx === idx2 ? cur : -cur), 0)
       answer === target && count++
    })
    return count;
}
```

- [1, 1, 1, 1, 1], 3 return 5 `첫번째` 경우는 정답을 도출했지만, 복잡한 [4, 1, 2, 1], 4 return 2 `두번쨰` 경우에는 실패했다.
- 이는 다음과 같은 문제 때문이라고 한다. 

  1. reduce 함수의 사용 : 배열의 각 요소를 순회하면서 누적값을 계산하지만, 해당 문제는 모든 요소를 독립적으로 선택하여 더하거나 뺄 수 있어야 한다. 그러나 reduce 함수는 문제의 요구사항을 충족하지 못한다. 
  2. forEach와 중첩된 reduce 함수 : 중첩된 루프 구조는 코드의 복잡성을 증가시키고, 예상치 못한 결과를 초래할 수 있다고 한다. 
  3. 타겟 넘버를 비교할 때의 조건문: answer === target : 경우의 수를 세는 것이기 때문에, 단순히 타켓 넘버를 일치하는 것은 부족하다고 한다.
  4. 잘못된 요소 선택 방식: 코드에서는 idx === idx2를 사용하여 현재 선택된 요소를 더하거나 빼고 있는데, 문제에서는 각 요소를 독립적으로 선택하여 더하거나 빼는 방식으로 모든 경우의 수를 고려해야 한다고 한다..
</details>

```javascript 
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

// 또는 
function solution(numbers, target) {
  return dfs(numbers, target, 0, 0);
}

function dfs(numbers, target, index, sum) {
  if(index === numbers.length) {
    return sum === target ? 1 : 0;
  }

  let result = 0;
  result += dfs(numbers, target, index + 1, sum + numbers[index]); // 현재 숫자를 더하는 경우
  result += dfs(numbers, target, index + 1, sum - numbers[index]); // 현재 숫자를 빼는 경우

  return result;
}
```
1. `return`은 재귀함수의 결과로 출력된 값으로, 최종적으로 target을 발견한 경우의 수를 반환한다. 
2. 함수의 시작은 `calculate(0, 0)`에서 시작된다. 처음에 idx와 초기값이 전달된다. 
3. `calculate`함수는 내부에서 동작하면서, 
    - 첫 번째 호출인 calculate(idx + 1, value + numbers[idx])에서는 현재 선택된 요소를 더하는 경우를
    - 두 번째 호출인 calculate(idx + 1, value - numbers[idx])에서는 현재 선택된 요소를 빼는 경우를 독립적으로 계산한다.
4. 재귀 함수를 호출할 때마다 idx에 1을 더하면서 다음 요소를 선택하고, 계산에 활용하게 됩니다. 이렇게 함으로써 모든 요소를 독립적으로 선택하여 타겟 넘버를 만들 수 있는 모든 경우의 수를 계산하는 것이다. 

<details>
<summary>로직의 시각화, 손코딩</summary>

첫번째 사이클

    [‘4’ , 1, 2, 1], 4

    calculate1(1, 0 + numbers[idx]);
    calculate2(1, 0 - numbers[idx]); 

    calculate1 = 0 + 4 = 4
    calculate2 = 0 - 4 = -4

두번째 사이클 (첫번째 재귀함수)

    [4 , ‘1’, 2, 1], 4

    value= 4
    calculate1(2, 4 + numbers[idx+1]);
    calculate2(2, 4 - numbers[idx+1]); 

    value= -4
    calculate1(2, -4 + numbers[idx+1]);
    calculate2(2, -4 - numbers[idx+1]); 

    value= 4
    4+1 = 5
    4-1 = 3

    value= -4
    -4+1 = -3
    -4-1 = -5

세번째 사이클 (두번째 재귀함수)

    [4 , 1, ‘2’, 1], 4

    value= 5
    5 + 2 = 7
    5 - 2 = 3

    value= 3
    3 + 2 = 5
    3 - 2 = 1

    value= -3
    -3 + 2 = -1
    -3 - 2 = -5

    value= -4
    -4 + 2 = -2
    -4 - 2 = -6
 
네번째 사이클 (세번째 재귀함수)

    [4 , 1, 2, ‘1’], 4

    value= 7
    7 + 1 = 8
    7 - 1  = 6

    value= 3
    3 + 1 = 4
    3 - 1 = 2

    value= 5
    5 + 1 = 6
    5 - 1 = 4

    value= 1
    1 + 1 = 2
    1 - 1 = 0

    value= -1
    -1 + 1 = 0
    -1 - 1 = -2

    value= -5
    -5 + 1 = -4
    -5 - 1 = -6

    value= -2
    -2 + 1 = -1
    -2 - 1 = -3

    value= -6
    -6 + 1 = -5
    -6 - 1 = -7

다섯번째 사이클 (마지막 재귀함수)
    if (idx === numbers.length) 조건문에 도달 idx === 배열의 길이가 같아요. 
    if (value === target) 우리의 경우의 수에 target 과 일치하는 것이 있을까? 

    4 =>  count++;
    4 =>  count++;

최종적으로 count = 2 
return count; 반환하면, 2가 나오는거에요. 
</details>
