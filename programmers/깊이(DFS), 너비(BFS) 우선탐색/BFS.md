## BFS 너비 우선탐색
1. [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844)

먼저 BFS란 그래프의 모든 정점을 너비 우선 순서로 탐색하는 데 사용되는 그래프 순회 알고리즘이다. 풀어야 하는 코드의 맥락에서 BFS는 maps 배열로 표시되는 그리드에서 시작점(0,0)과 목표점(goalY, goalX) 사이의 최단 거리를 찾는다. 

- 먼저 그리드의 크기가 계산되어야 한다. 조건에 `n과 m은 서로 같을 수도, 다를 수도 있지`라고 되어 있기 때문이다. 
  ```javascript 
  const maps = [[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,1,1,0,1],[0,0,0,0,1]]
  solution(maps)
  // 위의 배열이 주어진다면, 함수 내에서 먼저, n과 m을 추출한다. 
  const XLen = maps[0].length;
  const YLen = maps.length;
  ```

- 다음으로 목표지점이 설정되어야 한다. 문제는 5,5로 그 지점을 표시해두었다. 
  ```javascript 
  // 문제의 풀이는 오른쪽 하단의 `인덱스`에 접근해야 하기에, 각각 -1을 해주었다. 
  const goalX = XLen-1
  const goalY = YLen-1
  ```

- 다음으로, 현재 위치에서 이동 가능한 부분을 표현하는 배열을 생성한다. 
  ```javascript 
  const directions = [
    [0, -1], // left
    [0, 1],  // right
    [-1, 0], // up
    [1, 0]   // down
  ];
  ```
  
  이해 못하겠음... 