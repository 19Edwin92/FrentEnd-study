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
  console.log(`사각형 둘레 : ${rectangle1020.getPerimeter()}`)
  console.log(`사각형 넓이 : ${rectangle20200.getArea()}`)