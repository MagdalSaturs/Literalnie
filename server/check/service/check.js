const { links } = require("express/lib/response");

const check = (req) => {
    Math.random();
    const word = req.body.word;
    passwords = ['temat', 'komin', 'atlas', 'torba', 'rower', 'wojna', 'kabel', 'oliwa', 'melon', 'arbuz'];
    
    const index = date => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 120 / 24);
    const password = passwords[index(new Date()) % passwords.length]
    
    console.log(password);

    if (word === password) {
        return "Wygrałeś";
    } 
    
    if (word != password) {
        return "Nie";
    } 
}

module.exports = {
	check: check
};