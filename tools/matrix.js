const l1 = [1, 3, 5, 7, 9];
// const l1 = [1, 3, 9]
const l2 = [3, 7, 4, 2];
let matrix_length = 0;
const l3 = [];
const l4 = [];
let bag = 0
let sum = 0
if (l1.length > l2.length) {
    // console.log("yes")
    matrix_length = l1.length
} else {
    // console.log("no")
    matrix_length = l2.length
}
for (let i = 0; i <= matrix_length - 1; i++) {
    let bags = 0
    if (l1.length >= l2.length) {
        if (l2[i] == undefined) {
            l2[i] = 0
        } else {}
        sum += l1[i] + l2[i]
        bags += l1[i] + l2[i]
        console.log(bags)
        l3.push(bags)
    } else {
        if (l1[i] == undefined) {
            l1[i] = 0
        } else {}
        sum += l1[i] + l2[i]
        bags += l1[i] + l2[i]
        console.log(bags)
        l3.push(sum)
    }
}

for (let j = 0; j <= l3.length - 1; j++) {
    // console.log(l3[j + 1] - l3[j])
}

console.log(l3)