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

  toString() {
    return `width = ${this.width}, height = ${this.height}`
  }
}

// 클래스의 상속
class ColorRectangle extends Rectangle {
  constructor (width, height, color) {
    super(width, height);
    this.color = color;
  }

  toString() {
    return super.toString() + `, color - ${this.color}`
  }
}

const redRectangle = new ColorRectangle(10, 20, "red")
// console.log("redRectangle - ", redRectangle)
// console.log("redRectangle.getArea() - ", redRectangle.getArea())
// console.log("redRectangle.toString() - ", redRectangle.toString())

const uniq = array => array.filter((v, i, self) => self.indexOf(v) === i); 
// console.log(uniq([2,1,2,3,4,5,6]))

// Set.prototype.difference = (set) => {
//   const result = new Set([...this])
//   for (const value of set) {
//     result.delete(value)
//   }
//   return result 
// }
const set = (array) => {
  return new Set([...array])
}

Set.prototype.difference = function (set) {
  return new Set([...this].filter(v => !set.has(v)))
}
console.log(set([2,1,2,3,4,5,6]).difference(set([2,1,2,3,4,5])))