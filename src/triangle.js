const a = {b: 4}



class A {
	what (a) {
		return a + 2
	}
}

class B extends A {
	when (b) {
		return super.what(b) + 3
	}
}

class C extends B {
	where (c) {
		// return super.super.what(c) - 3
	}
}

const l = new C()
console.log(l.when(1))
console.log(l.what(1))
// console.log(l.where(1))

console.log('---')

let fibonacci = {
    [Symbol.iterator]() {
        let pre = 0, cur = 1
        return {
           next () {
               [ pre, cur ] = [ cur, pre + cur ]
               return { done: false, value: cur }
           }
        }
    }
}

for (let n of fibonacci) {
    if (n > 1000)
        break
    console.log(n)
}

console.log('--------')

const obj = {
	a (a, b) {
		return a + b
	},
	*b (a, b) {
		yield a
		yield b
	}
}


console.log(obj.a(1, 2))

function* idMaker() {
  var index = 0;
  while (index < 3)
    yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2


export {a}

export default class Test {
	constructor (a) {
		this.b = a
	}

	get a () {
		return this.b * 3
	}
}