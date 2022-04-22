const arr = [1,2,3,4]

const hackedUnshift = (data, array) => {
    let shifted = null
    let inserted = data; 
    for (let i = 0; i < array.length; i++) { 
        shifted = array[i]
        array[i] = inserted
        inserted = shifted
    }
    array.push(inserted)
    return array
}

const hackedShift = array => {
    for (let i = 0; i < array.length - 1; i++) { 
        [array[i], array[i+1]] = [array[i+1], array[i]]
    };
    return array.pop()
}



console.log(hackedUnshift(0, arr))
console.log(hackedUnshift(-1, arr))

console.log(arr)