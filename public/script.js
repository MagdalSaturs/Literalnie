$(document).ready(function() {
    const inputs = document.getElementsByTagName('input');
    const inputsCount = inputs.length;
    const pattern =  ['A','a','Ą','ą','B','b','C','c','Ć','ć','D','d','E','e','Ę','ę','F','f','G','g','H','h','I','i','J','j','K','k','L','l','Ł','ł','M','m','N','n','Ń','ń','O','o','Ó','ó','P','p','R','r','S','s','Ś','ś','T','t','U','u','W','w','Y','y','Z','z','Ź','ź','Ż','ż'];
    const chances = [false, false, false, false, false, false];

    var tura = 0;

    const blockLine = (lineId) => {
        const row = document.getElementsByClassName('row')[lineId];

        if (!row) {
            return;
        }

        const inputs = row.children;
        const inputsCount = inputs.length;

        for(let i = 0; i < inputsCount; i++) {
            const input = inputs[i];
            
            input.disabled = true;
            input.style.background = '#787c7e';
        }
    }


    const activateLine = (lineId) => {
        const row = document.getElementsByClassName('row')[lineId];

        if (!row) {
            return;
        }

        const inputs = row.children;
        const input = inputs[0];

        input.focus();
    } 

    const Green = (lineId, green) => {
        const row = document.getElementsByClassName('row')[lineId];
        if (!row) {
            return;
        }

        const inputs = row.children;
        for (let i = 0; i < green.length; i++) {
            inputs[green[i]].style.background = "#03fc13";
            inputs[green[i]].style.color = "black";
        }
    }

    const Red = (lineId, red) => {
        const row = document.getElementsByClassName('row')[lineId];
        if (!row) {
            return;
        }

        const inputs = row.children;

        for (let i = 0; i < red.length; i++) {
            inputs[red[i]].style.background = "red";
            inputs[red[i]].style.color = "black";
        }
    }

    const Yellow = (lineId, yellow) => {
        const row = document.getElementsByClassName('row')[lineId];
        if (!row) {
            return;
        }

        const inputs = row.children;

        for (let i = 0; i < yellow.length; i++) {
            inputs[red[yellow[i]]].style.background = "yellow";
            inputs[red[yellow[i]]].style.color = "black";
        }
    }

    const submitLine = () => {
        let breakLoop = false;

        chances.forEach((chance, index) => {
            if (!breakLoop && !chance) {
                breakLoop = true;

                const row = document.getElementsByClassName('row')[index];
                
                const inputs = row.children;
                const inputsCount = inputs.length;

                let word = '';

                for(let i = 0; i < inputsCount; i++) {
                    const char = inputs[i].value;

                    word += char;
                }

                if (word.length === 5) {
                    chances[index] = true;
                    blockLine(index);
                    activateLine(index+1);

                    const gameSession = window.gameSession
                    
                    const data = { word, gameSession };
                    
                    $.post('/api/check', data)
                    .then(response => {
                        if (response === 'Wygrałeś') {
                            Green(index, "01234");
                            tura += 1;
                            document.getElementById("ruch").innerText = tura;
                            document.getElementById("answer").innerText = "Dobrze!";
                            window.location.href = './Wygrana.html';
                        }else if (response === 'Nie') {
                            Red(index, "01234");
                            // Yellow(index, yellow);
                            tura += 1;
                            document.getElementById("ruch").innerText = tura;
                            document.getElementById("answer").innerText = "Próbuj dalej";
                            if (tura === 6) {
                                window.location.href = './Przegrana.html';
                            }
                        }


                        console.log(response);
                        window.gameSession = response.gameSession;
                    });
                }
            }
        });
    }


    for(let i = 0; i < inputsCount; i++) {
        const input = inputs[i];

        input.addEventListener('keypress', (e) => {
            const key = e.key;

            if (key === 'Enter') {
                submitLine();
                return;
            }
            
            const match = pattern.includes(key);

            if (match) {
                input.value = key;

                if (input.nextElementSibling) {
                    input.nextElementSibling.focus();
                }
            } else {
                input.value = '';
            }

            
        input.addEventListener('keypress', (e) => {
            const key = e.key;

            if (key === 'Backspace') {
                input.value = '';

                if(input.previousElementSibling) {
                    input.previousElementSibling.focus();
                    
                    for (let i = 0; i < inputsCount; i++) {
                        const input = inputs[i];
                        input.style.outline = '3px solid rgb(218, 218, 218)';
                    }
                }
            }
        });
        });
    };
});