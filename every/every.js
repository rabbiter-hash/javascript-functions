/*  一：
    判定一个数组中的所有元素是否大于0
    */
const arr = [1, 2, 3, 4, 5];
const result = arr.every(item => item > 0);
console.log(result);  // true

/*  二：
    校验数组
    */
const users = [
    {name: "Tom", age: 20},
    {name: "jack", age: 30},
]
const isValid = users.every( user => user.age >= 18);
console.log(isValid); // true

/*  三：
    校验数组类型是否符合某一特定类型
    */
const example = [1, 2, 3];
const allNumbers = example.every(item => typeof item === "number");
console.log(allNumbers); // true

/*  四：
    空数组调用every永远返回true
    */
const emptyArr = [];
console.log(emptyArr.every( item => item > 0)); // true
console.log(emptyArr.every( item => typeof item === "number")); // true

/*  五：
    结合includes判定子集
    */
const arr1 = [1, 2];
const arr2 = [1, 2, 3, 4];
const isSubSet = arr1.every(item => arr2.includes(item));
console.log(isSubSet); // true

/*  五：
    配合正则做字符串校验
    */
const chars = ["a", "b", "c"];
const isLowerCase = chars.every( ch => /[a-z]/.test(ch));
console.log(isLowerCase); // true