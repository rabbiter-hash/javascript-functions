
/*  一：
    获取字符串指定索引的编码
    */
let str = "ABC";
console.log(str.charCodeAt(0)); // 65
console.log(str.charCodeAt(1)); // 66
console.log(str.charCodeAt(2)); // 67

/*  二：
    遍历字符串并获取编码
    */
let str2 = "hello";
for(let i = 0; i < str2.length; i++){
    console.log(str2[i], str2.charCodeAt(i));
    // h 104
    // e 101
    // l 108
    // l 108
    // o 111
}

/*  三：
    判定字母大小写
    */
function isUpperCase(char){
    let code = char.charCodeAt(0);
    // 大写字母是65-90
    return code >= 65 && code <= 90;
}
console.log(isUpperCase("A")); // true
console.log(isUpperCase("a")); // false

/*  四：
    字符转数字
    */
function charToNumber(char){
    return char.charCodeAt(0) - 48;
}
const result = charToNumber("5");
console.log(result); // 5
console.log(typeof "5"); // string
console.log(typeof result); // number
console.log("0".charCodeAt(0)); // 48

/*  五：
    简单的凯撒加密
    */
function caesar(str, shift){
    let result = "";

    for(let i = 0; i < str.length; i++){
        let code = str.charCodeAt(i);
        // console.log(code);
        result += String.fromCharCode(code + shift);
    }
    return result;
}
console.log(caesar("ABC", 1)); // BCD

/*  六：
    判定字符类型
    */
function isDigit(char){
    let code = char.charCodeAt(0);
    return code >= 48 && code <= 57;
}
console.log(isDigit("48")); // true
console.log(isDigit("A")); // false