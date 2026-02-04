
/*
    reduce函数的几种用法
 */

// ================================================
// 1. 求和
// ================================================
const numbers = [1, 2, 3, 4, 5];
const sumArray = numbers.reduce((acc, curVal)=>acc+curVal, 0);
console.log(sumArray); // 15

// ================================================
// 2. 数组求积
// ================================================
const numbers2 = [1, 2, 3, 4, 5];
const multiArray = numbers2.reduce((acc, curVal)=>acc*curVal, 1);

console.log(multiArray);

// ================================================
// 3. 数组去重
// ================================================
const arr = [1, 2, 2, 3, 4, 4, 5];
const uniqueArr = arr.reduce((acc, cur)=>{
    if(!acc.includes(cur)) {
        acc.push(cur);
    }
    return acc;
}, []);
console.log(uniqueArr);

// ================================================
// 4. 统计对象数组中的某个字段
// ================================================
const people = [
    { name: "Alice", age: 21 },
    { name: "Bob", age: 25 },
    { name: "Alice", age: 22 },
];
console.log(typeof people); // object

const countByName = people.reduce((acc, cur) => {
    console.log('初始的cur：', cur);
    acc[cur.name] = (acc[cur.name] || 0) + 1;
    // 初始的acc是一个对象，而初始的cur也是一个对象
    return acc;
}, {});
console.log(countByName);

// ================================================
// 5. 进阶用法： 将嵌套数组扁平化
// ================================================
const nestedArr = [[1, 2], [3, 4], [5]];
const flatArr = nestedArr.reduce((acc, cur) => acc.concat(cur), []);

console.log(flatArr);

// ================================================
// 6. 进阶用法： 将数组转对象
// ================================================
const keys = ['a', 'b', 'c'];
const values = [1, 2, 3];

const convert2Obj = keys.reduce((acc, key, i) => {
    console.log('i的值为：', i);
    console.log('key的值为：', key);
    console.log('acc的值为：', acc);
    acc[key] = values[i];
    return acc;
}, {});

console.log(convert2Obj);