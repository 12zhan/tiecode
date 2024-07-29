export const randomString = (count:number = 10)=>{
    let text = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
    //遍历字符串
    return Array.from(Array(count)).map(()=>text[Math.floor(Math.random()*text.length)]).join('');
}