function shuffleArray(array) {
    var a = array;
    for (var i = a.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));

        var temp = a[i];
        a[i] = a[j];
        a[j] = temp;
    }

    return a;
}

export default shuffleArray;