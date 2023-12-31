## 개발자라면 알고리즘 공부 해야 할까? 
- [니콜라스](https://www.youtube.com/watch?v=9TyyMtlk5i4&list=PL7jH19IHhOLMdHvl3KBfFI70r9P0lkJwL&index=1)

목표 : 성능 최적화를 위한 고민이 생길 때, 더 빠르게 동작하게 하고 싶을 때 데이터구조와 알고리즘을 공부하게 됩니다. 바로 지금 

테이터 구조란 : 테이터를 정리하는 방법이다. 어떤 데이터 구조를 사용하느냐에 따라서 성능은 차별된다. 정렬 데이타, 검색 데이타, 편집 데이타 구조는 각각의 역할들이 있다. 따라서 각 상황에 적합한 데이터 구조를 사용하면 효율적인 코드를 작성할 수 있다. 

1. Array : 가장 기본적인 데이터구조 
먼저 `시간복잡도`에 대해서 이야기 하지 않을 수 없다. 시간복잡도는 데이터 구조의 동작 혹은 알고리즘이 얼마나 빠르고, 느린지 측졍하는 방법으로 대표적으로 빅오(O(n))표기법이 있다. 그러나 실제 초단위를 측정하는 것이 아니라, 얼마나 많은 `단계(steps)`가 있는가로 측정한다. 

배열을 이해할 때 메모리관점(주소값을 가진 RAM)에서 생각할 필요가 있다. 배열에서는 index 값이 바로 주소값에 해당되는데 바로 접근할 수 있다는 점이 바로 그것이다. 배열의 길이에 따라서 해당 메모리의 할당을 받는데 JS, Python을 사용하고 있다면 이들이 length를 통해서 이를 알고 할당 받기 때문에 개발자는 이를 모를 수 있다. 그러나 그 결과는 해당 과정을 직접 핸들링하는 C와 비교해서 느리다는 것은 기억해야 한다. 

- (1) 배열은 Readin을 어떻게 하는가? 
  - 배열은 0부터 데이터를 읽어나간다. 
  - 정확한 위치를 알고 있다면, index 를 명령하면 된다.`arr[2]`와 같이 말이다. 이는 컴퓨터가 배열이 어디서 시작하고 끝나는지를 알고 있기 때문에 빠르게 접근이 가능한 것이다. 

- (2) 배열은 Searching을 어떻게 하는가? 
  - 배열은 읽기와 다르다. 배열은 겁색할 내용이 어디에 있는지 알지 못하기 때문이다. `불행하게도, 하나하나 다 뒤져야` 한다. 그 결과 읽는 것 보다 검책은 오래 걸린다. 만약 찾고자 하는 내용이 마지막에 있다면, 또는 없는 경우라면 처음부터 끝까지 찾아야 한다는 것이다. 처음부터 끝, 이를 `LinaerSearch(선형 검색)`이라고 한다. 

- (3) 배열에 insert는 어떻게 하는가? 
  - 배열을 만들 때에는 메모리 공간을 미리 확보해야 한다. 만약 5개의 메모리 공간을 차지하고 있는 배열에 자료가 4개뿐이라면, 최고의 시나리오는 마지막에 요소를 추가하는 것이다. 보통의 시나리노는 중간 어딘가, 혹은 앞(최악)일 것이다. 공간을 마련해야 한다. 또는 배열이 할당받은 메모리를 다 차지하고 있는데, 요소를 추가하는 상황이다. 어디에 저장할 수 있는가 말이다. 

- (4) 배열은 Detele를 어떻게 하는가? 
  - 동작 원리는 추가하는 것과 비슷하다. 최고의 시나리오는 마지막에 요소를 제거하는 일이다. 보통은 중간 어딘가를 제거하고 뒤에 있는 요소들을 한 칸씩 땡기는 것이다. 
  - 그러나 배열이 수천개라면 속도는 오래걸릴 것이다. 

정리하면, 배열은 읽기는 빠르지만, 나머지는 좀 끄린 접근법이다. 그러나 걱정할 필요가 없다. 이에 최적화된 데이터구조가 있기 때문이다. 

2. `LinaerSearch(선형 검색)`보다 빠른 `Binary Search(이진검색)`
  - 그러나 이진검색 알고리즘은 모든 배열에서 사용할 수 있지는 않다. `정렬된 배열`에서만 사용이 가능하다. 즉 어떤 알고리즘은 특정 자로구조에서만 사용이 가능하다는 점을 기억해야 한다. 
  - 그러나 정렬된 배열은 검색에는 유용하지만, 입력하는 것은 느리다. 이전의 `LinaerSearch(선형 검색)`는 마지막에 내용을 추가하고 싶을 때 제한이 없었다. 그러나 `정렬된 배열`은 다르다. 추가되는 요소라도 마지막에 놓을 수 없기 때문이다. 해당 숫자부터 큰 숫자를 찾고 그 앞에 넣는 것이다. 역시 앞에서 부터 차례대로 살펴가며 자신의 위치를 찾아나간다. 
  - 여기에 이진탐색을 적용해보자. 이진이라는 단어는 반으로 쪼갠다는 의미가 내표되어 있다. 

    ```javascript
      const arr = [1,2,3,4,5,6,7,8,9,10] // 요소를 10개 가진 배열이 있다고 하자. 
    ```

  - 이진검색은 선형검색과 다르다. 즉 처음부터 검색을 실행하지 않는다는 것이다. 이진 검색은 정중앙에서 검색을 시작한다. 

    - 첫째, 이를 수행하기 위해 목표 숫자와 정가운데를 비교한다.
    - 둘째, 작으면 오른쪽만, 크면 왼쪽만 검색하기애 시간복잡도를 반으로 줄일 수 있다.
    - 목표가 9를 찾는다고 할 때, 
      - 선형검색이었다면, 9번의 실행을 통해서 값을 찾게 된다. 
      - 이진검색은 3번만에 값에 도달한다. 
        - 5 와 9를 비교하고, 왼쪽의 1~5를 무시한다. 
        - 8 과 9를 비교하고, 왼쪽읜 6~8를 무시한다. 
        - 단 두개만 남았다. 반을 쪼개서 비교하는데, 원하는 값임으로, 3번만에 목표에 도달한 것이다. 

    - 이번에는 20개의 배열에서 13을 찾아보자. 
      - 10 과 13을 비교하여, 1~10을 무시한다. 
      - 15 와 13을 비교하고, 15~20을 무시한다. 
      - 12 와 13을 비교하고, 11~12를 무시한다.
      - 13을 찾았으므로, 4번만에 목표에 도달하였다.      

여기서 볼 수 있듯이 `이진탐색은 큰 단위의 배열에서 적합`하다. 만약 1만 개의 요소가 있다면 최악의 경우 1만 개의 스텝이 요구된다. 반면에 이진탐색은 최악의 경우에도 14 번의 스텝만 소요된다. Wow! 여기서 볼 수 있듯이 알고지름은 이렇게 중요하다. 14개 스텝과 1만개 스텝의 차이는 어마하기 때문이다. 

그러나! 이진탐색의 전제는 `정렬된 배열`이라는 점에서 트레이 오프가 있다. 

3. 빅오 표기법 
알고리즘의 스피드 표현법에는 여러가지가 있지만, 대표적인 것이 빅오표기법이다. 그러나 초단위의 스피드를 체크하는 것이 아니라 단위별 체크 있다. 즉 완료까지 얼마의 절차가 걸리는지를 측정한다. 

요소의 Size = N 이라면, 선형검색의 스텝은 O(N)이 된다. 즉 N 만큼의 스텝이 요구된다는 것이다. 

2N도 결국에는 N으로 인식하는데 이는 Big O가 러프하기 때문이다. 즉 N 앞에 있는 상수에 대해서는 크게 신경을 쓰지 않는다. 