2. 둘째, Class를 생성하는 사례 살펴보기 

    ```javascript 
    // 클래스의 기본모델
    class Rectangle {
      constructor (width, height) {
        this.width = width
        this.height = height
      }

      getPerimeter () {
        return (this.width + this.height)*2
      }
      getArea () {
        return this.width*this.height
      }

      static getName (name) {
        console.log(`Hi, ${name}`)
      }
    }

    const rectangle1020 = new Rectangle(10, 20)
    const rectangle20200 = new Rectangle(20, 200)
    console.log(`사각형 둘레 : ${rectangle1020.getPerimeter()}`) // 사각형 둘례 : 60
    console.log(`사각형 둘레 : ${rectangle20200.getArea()}`) // 사각형 넓이 : 4000
    ```

    `class Rectangle`를 통해서 새로운 객체 `const rectangle1020`를 생성하였다. 해당 객체에 대한 동작은 콘솔에서 볼 수 있듯이 `도트(.)`를 통해서 접근했으며, 결과를 콘솔에 출력하였다. 

    <details>
    <summary>학생별 총점 계산기 Class 만들기 예제</summary>

    ```javascript
    class Student {
      constructor (이름, 국어, 영어, 수학) {
        this.이름 = 이름
        this.국어 = 국어
        this.영어 = 영어
        this.수학 = 수학
      }

      getSum () {
        return this.국어 + this.영어 + this.수학
      }

      getAverage () {
        return this.getSum() /4
      }

      toString () {
        return `${this.이름}\t${this.getSum()}점\t${this.getAverage()}점\n`
      }
    }

    const students = [];
    students.push(new Student('구름', 87, 98, 88))
    students.push(new Student('별이', 87, 98, 88))
    students.push(new Student('겨울', 87, 98, 88))
    students.push(new Student('바다', 87, 98, 88))
    console.log(students)
    ```
    콘솔에는 다음과 같이 기록된다.
    ```bash
    [
      Student { '이름': '구름', '국어': 87, '영어': 98, '수학': 88 },
      Student { '이름': '별이', '국어': 87, '영어': 98, '수학': 88 },
      Student { '이름': '겨울', '국어': 87, '영어': 98, '수학': 88 },
      Student { '이름': '바다', '국어': 87, '영어': 98, '수학': 88 }
    ]
    ```

    위의 코드에 아래와 같이 내용을 추가해보자. 
    ```javascript 
    let output = '이름\t총점\t\평균\n';
    for (const student of students) {
      ouput += students.toString()
    }
    console.log(output)
    ```

    콘솔에는 다음과 같이 기록된다. JS에서  이스케이프 시퀀스(escape sequence)에 해당되는 `\t`는 출력시 들여쓰기나 정렬 들에서 사용되는 탭을, `\n`은 개행을,  `\'`은 작은 따옴표를 `\"`은 큰따옴표를 나타낸다. 
    ```bash
    이름    총점    평균
    구름    273점   68.25점
    별이    273점   68.25점
    겨울    273점   68.25점
    바다    273점   68.25점
    ```

    <hr/>
    </details>

3. Class 상속
  
    JS는 `프로토타입` 기반의 언어이다.  `프로토타입`은 객체 지향 프로그래밍에서 중요한 개념 중 하나이다. Self 언어에서 처음 도입된 `프로토타입`이라는 개념은 JavaScript의 창시자인 Brendan Eich가 JS를 설계할 때부터 도입되었다. `프로토타입`은 객체를 생성할 때 정의 한 원형 객체에 대해서 객체 간 상속과 프로퍼티를 공유하는 역할에 대한 명칭이다. 이를 통해 객체는 다른 객체의 속성과 메서드를 상속받을 수 있다. 

    `프로토타입 체인`은 객체가 자신의 프로토타입을 찾을 때 연쇄적으로 상위 프로토타입을 탐색하는 매커니즘을 말한다. 이를 통해서 프로그래밍 언어는 코드 재사용성과 동적인 객체 확장을 가능하게 하였다. 

    ```javascript 
    // 클래스의 기본모델
    class Rectangle {
      constructor (width, height) {
        this.width = width
        this.height = height
      }

      getPerimeter () {
        return (this.width + this.height)*2
      }
      getArea () {
        return this.width*this.height
      }
    }

    // 클래스의 상속
    class Square extends Rectangle {
      constructor (one) {
        super(one, one) // 부모의 생성자 함수를 호출하는 코드 
      }
    }

    const square1020 = new Square(10, 20)
    console.log(`정사각형 둘레 : ${square1020.getPerimeter()}`) // 정사각형 둘레 : 40
    ```

    `class Square`를 보면 extends 키워드를 통해서 `class Rectangle`의 속성과 메서드를 상속받고 있음을 볼 수 있다. 선택자를 통해서 상위 객체의 속성을 상속받는다. 이때 사용되는 키워드가 `super`이다. 여기서 중요하게 볼 것은 생성자의 매개변수가 하나라는 이야기이다. 클래스를 생성할 때, 인자를 2개 넘겨주었지만 생성자가 받는 매개변수는 1개임으로 10은 유효하지만, 20은 사용되지 않는다는 것을 유의하자. 

    콘솔을 보면 `square1020`에는 없는 메서드인 `getPerimeter()`가 선언되었지만, 동작이 되는 것을 볼 수 있다. 이는 프로토타입을 통해서 상속받은 상위 클래스에 메서드에 접근했기 때문이다. 


## 1.2 Class Private 속성 : 객체의 속성을 은닉할 때, 선언 후 변경할 수 없음
위에서 다룬 `class Rectangle`를 볼 때, 매개변수에 양수가 기록되면 코드는 문제없이 원하는 결과를 산출할 것이다. 그런데 `음수`가 전달된다고 하자. 개발자는 미쳐 생각하지 못했을 수 있다. 음수에 대해서 사전에 조치를 취하려면 조건문으로 코드를 제어할 수 있다. 

```javascript 
class Rectangle {
  constructor (width, height) {
    if(width <= 0 || height <= 0) {
      throw '너비와 높이는 모두 0보다 커야 합니다'
    }
    this.width = width
    this.height = height
  }
}  
const rectangle100 = new Rectangle(10,0)
console.log(rectangle100)
```
콘솔에는 아래와 같이 표시된다. 

```bash
너비와 높이는 모두 0보다 커야 합니다
(Use `node --trace-uncaught ...` to show where the exception was thrown)
```

그러나 위의 코드는 문제가 있다. 바로 아래와 같은 상황이다.
```javascript 
class Rectangle {
  constructor (width, height) {
    if(width <= 0 || height <= 0) {
      throw '너비와 높이는 모두 0보다 커야 합니다'
    }
    this.width = width
    this.height = height
  }
}  
const rectangle1010 = new Rectangle(10,10)
console.log("rectangle1010", rectangle1010)
rectangle1010.height = -10
console.log("rectangle1010", rectangle1010)
const rectangle100 = new Rectangle(10,0)
console.log("rectangle100", rectangle100)
```

먼저 결과를 보자. 
```bash
rectangle1010 Rectangle { width: 10, height: 10 }
rectangle1010 Rectangle { width: 10, height: -10 }

/Users/edwin.youngchan.park/Documents/sparta/inocamp/00. 기타내용/nodeTest.js:61
      throw '너비와 높이는 모두 0보다 커야 합니다'
      ^
너비와 높이는 모두 0보다 커야 합니다
(Use `node --trace-uncaught ...` to show where the exception was thrown)
```

`const rectangle1010`를 생성한 다음에 다음 줄에서 `rectangle1010.height = -10`으로 속성을 변경해주었다. 그러나 node는 이를 문제 없이 실행하였다. 즉 조건문에서 걸러지지 않는다는 점이 문제인 것이다. 이는 개발의 의도에서 벗어난 것이다. 이를 위해서 등장한 개념이 Private속성이다. 

Private는 속성을 캡슐화하여 외부에서 접근할 수 없도록 한다. 방법은 간단한다. ES12 이후 등장한 필드(`#`) 선언을 통해서 이를 간단하게 구현할 수 있게 되었다. 다만 필드 선언에 있어서 주의할 점은 생성자 밖에서 필드가 선언되어야 한다는 것이다. 

```javascript 
class Rectangle {
  #width
  #height
  constructor (width, height) {
    if(width <= 0 || height <= 0) {
      throw '너비와 높이는 모두 0보다 커야 합니다'
    }
    this.#width = width
    this.#height = height
  }

  getObject () {
    return `너비는 ${this.#width}, 높이는 ${this.#height}`
  }
}  
const rectangle1010 = new Rectangle(10,10)
console.log("rectangle1010", rectangle1010)
console.log("rectangle1010", rectangle1010.getObject())
rectangle1010.height = -100
console.log("rectangle1010", rectangle1010.getObject())
```

콘솔의 결과를 살펴보자. 

```bash
rectangle1010 Rectangle {}
rectangle1010 너비는 10, 높이는 10
rectangle1010 너비는 10, 높이는 10
```
첫번째 콘솔은 생성된 객체의 내부 속성을 살펴보는 내용인데, 빈객체가 출력된다. 객체 자체가 은닉되었기에 접근할 수 없는 것이다. 두번째 콘솔은 메서드에 접근하는 건인데 값에 도달할 수 있다. 즉 객체의 속성은 선언을 했어도 접근할 수 없지만, 동작에 대한 출력값은 호출하여 볼 수 있다는 내용이다. 세번재 콘솔은 보면 `height`를 통한 접근은 `#height`에 도달하지 못함으로 유효하지 않은 선언이 된다. 즉 결과에 반영하지 못한다. 

```javascript
rectangle1010.#height = -100
```
만약 위와 같이 필드를 선언하여 접근하면 어떻게 될까? `SyntaxError: Private field '#height' must be declared in an enclosing class`와 같은 에러메시지를 볼 수 있다. 필드는 반드시 클래스 안에서만 선언할 수 있다. 

## 1.3 Class setter와 getter
1. 먼저 `setter`를 살펴보자 

    간단하게 말해서 `setter`는  `constructor`가 속성에 대한 생성과 초기화에 집중하도록한다. `constructor` 내에서 조건을 통하여 매개변수에 대한 유효성검증을 실행할 수 있지만, `setter`는 이를 분리하여 코드의 명료성을 높인다. 

    ```javascript 
      class Rectangle {
        constructor (width, height) {
          if(width <= 0 || height <= 0) {
            throw '너비와 높이는 모두 0보다 커야 합니다'
          }
          this.width = width
          this.height = height
        }
      } 
      const rectangle = new Rectangle(20,10)
    ``` 

    이를 setter를 통해서 코드를 분리시켜보자. 

    ```javascript  
    class Rectangle {
      constructor(widthValidity, heightValidity) {
        this.width = widthValidity;
        this.height = heightValidity;
      }

    set widthValidity(value) {
      if (value <= 0) {
        throw new Error('너비는 0보다 커야 합니다.');
      }
      this.width = value;
    }

    set heightValidity(value) {
      if (value <= 0) {
        throw new Error('높이는 0보다 커야 합니다.');
      }
      this.height = value;
    }
    }

    const rectangle = new Rectangle(20, 10);
    console.log(rectangle)
    ```

2. Private와 setter

    `Private`는 Class의 속성을 은닉하여 외부에서 접근하지 못하도록 하는 기능이었다. 그러나 필요에 의해서 은닉된 정보에 접근할 때가 발생되는데, `setter`는 외부에서도 은닉된 속성에 접근할 수 있는 기능을 허용한다. set을 통하여 들어온 매개변수를 통해서 클래서 내부에서 해당 속성에 접근하기 때문이다. 

    ```javascript  
    class Rectangle {
      #width
      #height
      constructor(widthValidity, heightValidity) {
        this.#width = widthValidity;
        this.#height = heightValidity;
      }

    set widthValidity(value) {
      if (value <= 0) {
        throw new Error('너비는 0보다 커야 합니다.');
      }
      this.#width = value;
    }

    set heightValidity(value) {
      if (value <= 0) {
        throw new Error('높이는 0보다 커야 합니다.');
      }
      this.#height = value;
    }

    getreturnwidth () {
      return this.#width
    }
    get returnwidth () {
      return this.#width
    }
    }

    const rectangle = new Rectangle(20, 10);
    console.log("this.#width : ", rectangle.getreturnwidth(), "rectangle - ", rectangle)
    rectangle.widthValidity = 30
    console.log("this.#width : ", rectangle.returnwidth, "rectangle - ", rectangle)
    ```

    위 코드에 대한 콘솔을 살펴보자. 
    ```bash
    this.#width :  20 rectangle -  Rectangle {}
    this.#width :  30 rectangle -  Rectangle {}
    ```

    `this.#width`는 은닉되었기에 외부에서 속성의 내부 값을 살펴볼 수 없다. 그러나 getter를 통해서 속성의 값을 출력할 수 있는데, 위와 같다. 


3. 다음으로는 `getter`에 대해서 살펴보자. 
  
    메서드와 `getter`의 가장 큰 차이는 호출에 있다. 메서드는 호출을 위해서 (소괄호)를 동반해야 한다. 즉 메서드임을 규정해주어야 하는 것이다. 반면에 `getter`는 (소괄호) 없이 함수를 호출한다. 즉 클래스의 속성과 같이 함수를 호출한다는 점에 차이가 있다. 메서드와 `getter`는 미묘한 차이가 있는데 둘다 동작을 수행하지만, 메서드는 결과의 반환을 수행하고, `getter`는 동작의 결과로 생성된 속성의 값을 반환한다. 

    ```javascript
    class Rectangle {
      constructor (width, height) {
        this.width = width
        this.height = height
      }

      getPerimeter () {
        return (this.width + this.height)*2
      }
      get area () {
        return this.width*this.height
      }
    }

    const rectangle1020 = new Rectangle(10, 20)
    console.log(rectangle1020.getPerimeter()) // 60
    console.log(rectangle1020.area) // 200 
    ```

## 참고자료
- "혼자공부하는 자바스크립트", 한빛미디어
- "모던 자바스크립트 딥 다이브", 위키북스











