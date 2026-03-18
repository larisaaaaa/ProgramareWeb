const element1 = Array.from(document.querySelectorAll("#ordinatedList li"))[0];
const element2 = Array.from(document.querySelectorAll("#ordinatedList li"))[1];
const element3 = Array.from(document.querySelectorAll("#ordinatedList li"))[2];

/// Array cu elementele din lista ordonata
const mergedArray = [element1.textContent, element2.textContent, element3.textContent];
console.log(mergedArray);

/// Prima metoda de filtare a elementelor care contin "2025"
const myFilter = mergedArray.filter(function(x) {
    if(x.includes("2025")) {
        console.log(x); }
})

/// A doua metoda de filtare a elementelor care contin "2025"
const myFilter2 = mergedArray.filter(function(x) {
    if(x.toString().includes("2025")) {
        console.log(x);
    }
})

/// Primul cuvant din fiecare element al listei ordonate
const arr = [];
const firstWords = mergedArray.map(function(x) {
    arr.push(x.split(" ")[0]);
})
console.log(arr);

/// Numarul total de studii
const initialValue = 0;
const sumWithInitial = mergedArray.reduce(function(accumulator, currentValue) {
    int = parseInt(currentValue.split(" ")[currentValue.split(" ").length - 1]);
    if(int > 0 | int < 9)
        return accumulator + int;
}, initialValue);
console.log(sumWithInitial);