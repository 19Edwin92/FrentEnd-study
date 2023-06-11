// let Person = (function () {
//   function Person(name) {
//     this.name = name
//   }

//   Person.prototype.sayHi = function() {
//     console.log(`Hi My name is ${this.name}`)
//   }

//   return Person
// }())

// const me = new Person('Park')
// me.sayHi();

class Person {
  constructor (name) {
    this.name = name
  }

  getSayHi () {
    console.log(`Hi My name is ${this.name}`)
  }
  static getName (name) {
    return `Hi, ${name}`
  }
}

console.log(Person.getName('Park'))
