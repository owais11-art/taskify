export function putUntil<T>(arr: T[], cb: (item:T) => boolean): T[] {
    const newArr: T[] = [];
    for(let el of arr) {
        let putInNewArr = cb(el);
        if(putInNewArr) newArr.push(el);
        else break;
    }
    return newArr;
}