export function absolute1(){
    const number = -10;
    const s = number.toString();
    console.log(parseFloat(s.replace('-', '')));
}

export function absolute2(){
    const number = -10;
    console.log(number < 0 ? -number : number);
}

export function absolute3() {
    const number = -10;
    console.log(Math.sqrt(number * number));
}

export unction absolute4(){
    const number = -10;
    return Math.max(number, -number);
}