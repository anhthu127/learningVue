// optional and non null
var add = function (a, b) { return (b ? a + b : a); };
console.log(add(1, 2));
console.log(add(1));
var addNonNull = function (a, b) { return a + b; };
console.log(addNonNull(3, 4));
console.log(addNonNull(3));
