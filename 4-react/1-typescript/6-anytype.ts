// any타입
// 보통 권장하지 않음. 동적타입이 필요할 때만 사용
// rorcp
const obj: any = {};
obj.name = "hong";
obj["phone"] = "01012345678";
delete obj.name;

console.log(obj);

// 배열
const arr: any[] = [];
arr.push({name: "hong", phone:"01012345678"});
console.log(arr);

let var1: any;
var1 = "hong";
var1 = 123;
