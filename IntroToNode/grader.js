function average(arr){
    var total = 0
    arr.forEach(num => total += num)
    var avg = total/arr.length
    console.log(Math.round(avg))
    return Math.round(avg)
}

var scores = [90, 98, 89, 100, 100, 86, 94]
average(scores)