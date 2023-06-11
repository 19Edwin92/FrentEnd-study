# Class

클래스를 이해하기 위해서는 객체지향 프로그램에 대한 이해가 필수이다. 
객체지향이란 말그대로 프로그래밍에서 `객체를 우선적으로 생각`하는 프로그램이다. 
여기서 `객체를 우선적으로 생각`한다는 것은 

    객체가 가진 `추상화`를 인지하고 이를 지향하며 코드를 작성하는 것을 말한다. 

`추상화`에 대한 나의 용어는 `대상에 대한 요소화`이다. 프로그램에 대상이 부여되었을 때 모든 요소를 기록하게 만드는 것은 불필요한 일이다. 반면에 `대상에 대한 요소화`란 부여된 대상에서 프로그램에서 필요하는 요소만 특정하여 `추상화`한 객체를 가진다는 것을 의미한다. 나아가 `대상의 추상화`는 동일하게 사용해야 되는 부분에서 코드의 재사용성을 가능하게 하고, 유지보수성을 향상시킨다. JS에서는 이러한 객체지향 프로그래밍을 위해서 `class`가 등장하여 이를 더욱 용이하게 하였다. 


# Class 객체를 생성하기 위한 템플릿 
클래스는 문법적으로 `객체를 효울적이고 안전하게 만들어`내는 하나의 붕어빵 틀(템플릿)이다. 클래스는 `속성`과 `메서드`로 구성되어 있다. 속성이란 클래스에서 사용할 변수의 모음이고, 메서드란 해당 변수를 사용하여 동작할 기능을 말한다. 클래스를 통해서 생성된 객체는 클래스에서 정의한 속성과 메서드를 활용할 수 있으며, 이러한 동작은 속성과 메서드를 캠슐화하여, 객체의 데이터와 동작을 하나의 단위로 관리한다. 

 
## 첫째, Class 생성
```javascript 
class className {
  // setter 부분
  constructor (매개변수1, 매개변수2) {}

  // getter 부분
  methods1 () {}
  methods2 () {}
}

// 새로운 객체 생성, new 키워드
const newobj = new className(인자1, 인자2)
```

클래스의 선언은 class를 통해서 선언된다. (소괄호) 없이 {중괄호}를 통해서 선언이 이뤄지며, 해당 부분에서 `속성`에 대해서는 생성자를 통해서 받아올 인수에 대한 constructor 선언을 통해 클래스의 속성을 초기화할 수 있으며, 생성자의 매개변수는 클래스의 인스턴스를 생성할 때 new 키워드와 함께 전달된다. 

이렇게 선언된 constructor의 속성들은 getter에 해당되는 메서드들을 통해서 가공을 할 수 있으며, class를 통해서 생성된 인스턴스는 해당 메서드를 호출하여 클래스의 동작을 수행한다. 

  - 예를들어 살펴보면 
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

  const rectangle1020 = new Rectangle(10, 20)
  const rectangle20200 = new Rectangle(20, 200)
  console.log(`사각형 둘레 : ${rectangle1020.getPerimeter()}`) // 사각형 둘례 : 60
  console.log(`사각형 둘레 : ${rectangle20200.getArea()}`) // 사각형 넓이 : 4000
  ```



















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

const rectangle = new Rectangle(10, 20)
console.log(`사각형 둘레 : ${rectangle.getPerimeter()}`)

// 클래스의 상속
class Square extends Rectangle {
  constructor (one) {
    if(one <= 0) {
      throw '길이는 0보다 커야 합니다.'
    }
    super(one, one)
  }
}

const square = new Square(-1, 20)
console.log(`정사각형 둘레 : ${square.getPerimeter()}`)
```