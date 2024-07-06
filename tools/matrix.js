const l1 = [1, 31, 5, 7, 9]
const l2 = [3, 7, 4, 2]
const l3 = []
let remainingValue = 0

const matrixLength = Math.max(l1.length, l2.length)


for (let i = 0; i < matrixLength; i++) {
    const val1 = l1[i] !== undefined ? l1[i] : 0
    const val2 = l2[i] !== undefined ? l2[i] : 0

    const sum = val1 + val2 + remainingValue

    const lastDigitValue = sum % 10
    remainingValue = Math.floor(sum / 10)

    l3.push(lastDigitValue)
}

if (remainingValue > 0) {
    l3.push(remainingValue)
}

console.log(l3)





// // my code
// my code

// const l1 = [1, 31, 5, 7, 9];
// // const l1 = [1, 3, 9]
// const l2 = [3, 7, 4, 2];
// let matrix_length = 0;
// const l3 = [];
// const l4 = [];
// let remainingvalue = 0
// if (l1.length > l2.length) {
//     // console.log("yes")
//     matrix_length = l1.length
// } else {
//     // console.log("no")
//     matrix_length = l2.length
// }
// for (let i = 0; i <= matrix_length - 1; i++) {
//     let sum = 0
//     if (l1.length >= l2.length) {
//         if (l2[i] == undefined) {
//             l2[i] = 0
//         }
//         sum += l1[i] + l2[i] + remainingvalue
//         let sumToString = String(sum)
//         if (sumToString.length == 1) {
//             console.log("sumToString value is 1: " + sum)
//             l3.push(sum)
//         } else {
//             let lastDigitvalue = sum % 10
//             remainingvalue = Math.floor(sum / 10)
//             l3.push(lastDigitvalue)
//             console.log('sumToString value: is 2 ' + lastDigitvalue, " remainingvalue " + remainingvalue)
//         }
//     } else {
//         if (l1[i] == undefined) {
//             l1[i] = 0
//         }
//         sum += l1[i] + l2[i]
//         l3.push(sum)
//         sum += l1[i] + l2[i] + remainingvalue
//         let sumToString = String(sum)
//         if (sumToString.length == 1) {
//             console.log('sumToString value is 1: ' + sum)
//             l3.push(sum)
//         } else {
//             let lastDigitvalue = sum % 10
//             remainingvalue = Math.floor(sum / 10)
//             l3.push(lastDigitvalue)
//             console.log(
//                 'sumToString value: is 2 ' + lastDigitvalue,
//                 ' remainingvalue ' + remainingvalue
//             )
//         }
//     }
// }
// if (remainingvalue > 0) {
//     l3.push(remainingvalue)
// } else {

// }
// console.log(l3)