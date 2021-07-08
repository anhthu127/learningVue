// function

// param with type number
const square = (side: number) => {
    return side * side;
}

//param with type any
const otherSquare = (side) => side * side;

console.log(square(3));
console.log(otherSquare(5));

/* assign type for anything using : operator */
//    ex :
        // name: <string> 'aaaa'
        // funcA : Function


let getName : Function

getName = () => console.log("i'm anhthu");

// const ageCaculation = (current, bornYear ) => bornYear - current
const ageCaculation = (current:number, bornYear:number ) => bornYear - current


const printAge = (current:number, bornYear:number, name?:number | string ) =>{
// const printAge = (current:number, bornYear:number, name:number | string = 10 ) =>{
//   wrong: console.log(bornYear - current + name);
console.log(bornYear - current);
console.log(name);
}
const printAgeWithDefaultValue= (current:number, bornYear:number, name:number | string = 10 ) =>{
    console.log(bornYear - current);
    console.log(name);
    }
printAge(2021, 1998, "anhthu");
printAge(2021, 1998, 127);
printAgeWithDefaultValue(2021, 1998);