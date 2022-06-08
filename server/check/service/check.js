const check = (req) => {
    Math.random();
    const word = req.body.word;
    const passwords = ['temat', 'komin', 'atlas', 'torba', 'rower', 'wojna', 'kabel', 'oliwa', 'melon', 'arbuz'];
    const index = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 120 / 24);
    const password = passwords[index(new Date()) % passwords.length]
    console.log(password);

    if (word === password) {
        return'Wygrałeś';
        
    } 
    
    if (word != password) {
        // yellow = ""
        // for (var i = 0; i < 5; i++) {
        //     if(password.indexOf(word.toLowerCase()[i]) != -1) {
        //         yellow += i
        //     }
        // }
        // console.log(yellow)
        return 'Nie';
    }

}

module.exports = {
	check: check
};