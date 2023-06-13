# programmers (lv.2)

## [최댓값과 최솟값](https://school.programmers.co.kr/learn/courses/30/lessons/12939)

<details>
<summary>문제 설명 및 나의 접근(문제 풀이  5분)</summary>

문제 설명

문자열 s에는 공백으로 구분된 숫자들이 저장되어 있습니다. str에 나타나는 숫자 중 최소값과 최대값을 찾아 이를 "(최소값) (최대값)"형태의 문자열을 반환하는 함수, solution을 완성하세요. 예를들어 s가 "1 2 3 4"라면 "1 4"를 리턴하고, "-1 -2 -3 -4"라면 "-4 -1"을 리턴하면 됩니다.

```javascript 
 function solution(s) {
     let arr = s.split(" ").map(el => Number(el)).sort((a,b) => a - b)
     return `${Math.min(...arr)} ${Math.max(...arr)}`
 }
```

1. 문제를 보고 5분 만에 푼 코드이다. 
2. 다른 사람의 코드를 보았을 때, 사실 배열의 최소값과 최대값을 구하는 매서드라면, sort를 할 필요도 없었다. 
3. sort를 사용한 이유는 0번째와 마지막 index의 값을 구하려고 하다가, max, min 메서드가 기덕나서 그냥 둔 코드였다. 
4. 그리고 해당 메서드는 문자열도 비교가 가능하다는 점이 있다. 이것이 가능한 이유는 문자열의 경우에는 유니코드로 비교하기 때문이다. 
- 즉 아래와 같이 리펙토링이 가능하다. 
</details>

```javascript 
function solution(s) {
    let arr = s.split(" ")
    return `${Math.min(...arr)} ${Math.max(...arr)}`
}
```

## [JadenCase 문자열 만들기](https://school.programmers.co.kr/learn/courses/30/lessons/12951)

<details>
<summary>문제 설명 및 나의 접근(문제 풀이  1시간)</summary>

- 코드 자체는 5분이었다. 
- 오랜 시간이 발생된 이유는 예외를 제와하는 부분이었다. `el &&` 조건문이라는 간단한 인지부족에.. 한심했다. 

문자열의 인덱스에 접근하는 방법은 여러가지 방식이 있다. 
1. [] 대괄호를 통한 접근
2. charAt() 메서드를 통한 접근

문제풀이 과정에서 등장한 방법들이다. 문제는 문제의 제한사항에서 단어사이의 공백이 여러개 들어가 있을 수 있다는 조건이다. 즉 "&nbsp;&nbsp;&nbsp;&nbsp;"와 같이 띄어쓰기가 여러 번 등장할 때 말이다. 대괄호를 통한 접근은 해당 문자열에서 값을 찾을 수 없으면 undefined를 반환한다. 그 결과 런타임에서 타입에러가 발생하여 코드가 중단된다. 

```javascript
function solution(s) {
    return s.toLowerCase().split(" ")
            .map(el => el[0].toUpperCase()+el.slice(1))
            .join(" ")
}
```

이를 해결하는 방법은 세가지 이며, 아래와 같다. 

</details>

```javascript 
// 두번째 시도 및 수정
function solutionCorrect(s) {
    console.log(s.toLowerCase().split(" "))
    return s.toLowerCase().split(" ")
            .map(el => el && el[0].toUpperCase()+el.slice(1))
            .join(" ")
}

// 세번째 다른 메서드를 사용하기, charAt()
function solutionCharAt(s) {
    console.log(s.toLowerCase().split(" "))
    return s.toLowerCase().split(" ")
            .map((v) => v.charAt(0).toUpperCase() + v.substring(1)) // or + el.slice(1))
            .join(" ")
}

// 네번째 정규식활용하기
function solutionRegExp(s) {
  return s.toLowerCase().replace(/(^|\s)\S/g, (match) => match.toUpperCase());
}
```
