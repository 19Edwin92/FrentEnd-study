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