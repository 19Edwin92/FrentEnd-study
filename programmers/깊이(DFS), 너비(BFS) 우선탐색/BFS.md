## BFS 너비 우선탐색
1. [게임 맵 최단거리](https://school.programmers.co.kr/learn/courses/30/lessons/1844)

먼저 BFS란 그래프의 모든 정점을 너비 우선 순서로 탐색하는 데 사용되는 그래프 순회 알고리즘이다. 풀어야 하는 코드의 맥락에서 BFS는 maps 배열로 표시되는 그리드에서 시작점(0,0)과 목표점(goalY, goalX) 사이의 최단 거리를 찾는다. 

DFS(Depth-First Search)와 BFS(Breadth-First Search)는 그래프 탐색 알고리즘으로, 다양한 문제에 적용되며, 각각의 특성에 따라 다른 요구에 의해 등장하였습니다.

BFS(Breadth-First Search):
BFS는 너비 우선 탐색으로, 시작 노드에서부터 거리에 따라 단계적으로 모든 노드를 탐색하는 방법입니다. BFS는 주로 다음과 같은 상황에서 사용됩니다:
최단 경로 찾기: 그래프 상에서 두 노드 사이의 최단 경로를 찾는데 유용합니다. 거리가 가까운 노드부터 탐색하므로 최단 경로를 먼저 찾을 수 있습니다.
최소 비용 문제: 그래프의 간선에 가중치가 있는 경우, 최소 비용을 구하는 문제에 사용됩니다.
그래프 탐색: 그래프의 모든 노드를 탐색해야 할 때 사용됩니다.
BFS는 큐(Queue) 자료구조를 활용하여 구현합니다.

DFS와 BFS는 각각 다른 탐색 방법을 가지고 있기 때문에, 문제의 특성에 따라 적합한 탐색 방법을 선택하여 사용합니다. 예를 들어, 최단 경로를 찾는 문제에서는 BFS가 유리하고, 백트래킹이 필요한 경우에는 DFS가 유리할 수 있습니다. 그래프의 구조와 문제의 성격에 따라 적합한 알고리즘을 선택하여 적용하는 것이 중요합니다.

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