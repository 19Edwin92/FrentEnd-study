// // // class Person {
// // //   constructor(firstName, lastName) {
// // //     this.firstName = firstName;
// // //     this.lastName = lastName;
// // //   }

// // //   get fullName () {
// // //     return `${this.firstName} ${this.lastName}`;
// // //   }

// // //   set fullName(name) {
// // //     [this.firstName, this.lastName] = name.split(' ')
// // //   }
// // // }

// // // const me = new Person('Ungmo', 'Lee')
// // // console.log("1 me - ", me)
// // // console.log("1 me.fullName - ", me.fullName, "\n ------------------------------------------------ ")
// // // me.fullName = 'Heegun Lee'
// // // console.log("2 me - ", me)
// // // console.log("2 me.fullName - ", me.fullName)

// // class Person {
// //   constructor(firstName, lastName) {
// //     this.fullName = `${firstName} ${lastName}`;
// //   }

// //   get fullName() {
// //     return `${this.firstName} ${this.lastName}`;
// //   }

// //   set fullName(name) {
// //     [this.firstName, this.lastName] = name.split(' ');
// //   }
// // }

// // const me2 = new Person('Heegun', 'Lee');
// // me2.fullName = "Edwin Park"
// // console.log(me2);


// // class Person2 {
// //   constructor(firstName, lastName) {
// //     this.firstName = firstName;
// //     this.lastName = lastName;
// //   }

// //   get fullName () {
// //     return `${this.firstName} ${this.lastName}`;
// //   }

// //   set fullName(name) {
// //     [this.firstName, this.lastName] = name.split(' ')
// //   }
// // }

// // const me = new Person('Ungmo', 'Lee')
// // console.log("1 me - ", me)
// // console.log("1 me.fullName - ", me.fullName, "\n ------------------------------------------------ ")
// // me.fullName = 'Heegun Lee'
// // console.log("2 me - ", me)
// // console.log("2 me.fullName - ", me.fullName)

// // class Rectangle {
// //   constructor(widthValidity, heightValidity) {
// //     this.width = widthValidity;
// //     this.height = heightValidity;
// //   }

// // set widthValidity(value) {
// //   if (value <= 0) {
// //     throw new Error('너비는 0보다 커야 합니다.');
// //   }
// //   this.width = value;
// // }

// // set heightValidity(value) {
// //   if (value <= 0) {
// //     throw new Error('높이는 0보다 커야 합니다.');
// //   }
// //   this.height = value;
// // }
// // }

// // const rectangle = new Rectangle(-1, 10);
// // console.log(rectangle)

// class Rectangle {
//   constructor(width, height) {
//     this.widthValidity = width;
//     this.heightValidity = height;
//   }

//   set widthValidity(value) {
//     if (value <= 0) {
//       throw new Error('Width must be greater than 0');
//     }
//     this.width = value;
//   }

//   set heightValidity(value) {
//     if (value <= 0) {
//       throw new Error('Height must be greater than 0');
//     }
//     this.height = value;
//   }
// }

// const rectangle = new Rectangle(1, 10);
// console.log("rectangle - ", rectangle)
// rectangle.widthValidity = 100;
// console.log("rectangle - ", rectangle)

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

console.log(new Rectangle(10, 20).getPerimeter()) // 60
console.log(new Rectangle(10, 20).area) // 200 