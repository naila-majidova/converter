let inputL = document.querySelector('#amountL');
let inputR = document.querySelector('#amountR');
let btnsL = document.querySelector('.btns-left');
let btnsR = document.querySelector('.btns-right');
let btnL = document.querySelectorAll('.btns-left .btn');
let btnR = document.querySelectorAll('.btns-right .btn');
let currentL = document.querySelector('.current-currency-left');
let currentR = document.querySelector('.current-currency-right');
let leftSelectedBtn = document.querySelector('.current-currency-right');
const api = 'https://v6.exchangerate-api.com/v6/8d4a8ca4bdd55fdfd38594fd/latest/';
let lastChangeInput;
let otherChangeInput;

fetch('https://v6.exchangerate-api.com/v6/8d4a8ca4bdd55fdfd38594fd/latest/RUB')
    .then(res => res.json())
    .then(data => {
        baseCurrency = document.querySelector('.btns-left .selected').innerText;
        toCurrency = document.querySelector('.btns-right .selected').innerText;
        currentL.innerText = "1  " + baseCurrency + "  = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
        currentR.innerText = "1 " + toCurrency + " = " + ((1 / data.conversion_rates[toCurrency])).toFixed(4) + " " + baseCurrency;
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });


btnL.forEach(otherBtn => {
    otherBtn.addEventListener('click', (e) => {
        const clickedBtn = e.target;
        btnsL.querySelectorAll('.btn').forEach(otherBtn => {
            otherBtn.classList.remove('selected');
        });
        clickedBtn.classList.add('selected');
        baseCurrency = document.querySelector('.btns-left .selected').innerText;
        toCurrency = document.querySelector('.btns-right .selected').innerText;
        url = api + baseCurrency;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentL.innerText = "1  " + baseCurrency + "  = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
                currentR.innerText = "1 " + toCurrency + " = " + ((1 / data.conversion_rates[toCurrency])).toFixed(4) + " " + baseCurrency;
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        if (inputL.value !== "" & inputR.value !== "") {
            console.log(baseCurrency + "-den " + toCurrency + "-a cevrilir");
            if (baseCurrency !== toCurrency) {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        inputR.value = (inputL.value * data.conversion_rates[toCurrency]).toFixed(4);
                        console.log("btn");
                    })
                    .catch(error => {
                        console.error("Fetch error:", error);
                    });
                currentL.innerText = "1 " + baseCurrency + " =  1 " + toCurrency;
                currentR.innerText = "1 " + toCurrency + " = 1 " + baseCurrency;
            } else {
                inputR.value = inputL.value;
                console.log("sorgu gonderilmedi");
                currentL.innerText = "1 " + baseCurrency + " =  1 " + toCurrency;
                currentR.innerText = "1 " + toCurrency + " = 1 " + baseCurrency;
            }
        }
    });
});
btnR.forEach(otherBtn => {
    otherBtn.addEventListener('click', (e) => {
        const clickedBtn = e.target;
        btnsR.querySelectorAll('.btn').forEach(otherBtn => {
            otherBtn.classList.remove('selected');
        });
        clickedBtn.classList.add('selected');

        baseCurrency = document.querySelector('.btns-right .selected').innerText;
        toCurrency = document.querySelector('.btns-left .selected').innerText;
        url = api + baseCurrency;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentL.innerText = "1 " + toCurrency + " = " + ((1 / data.conversion_rates[toCurrency])).toFixed(4) + " " + baseCurrency;
                currentR.innerText = "1  " + baseCurrency + "  = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
        if (inputL.value !== "" & inputR.value !== "") {
            url = api + baseCurrency;
            console.log(baseCurrency + "-den " + toCurrency + "-a cevrilir");

            if (baseCurrency !== toCurrency) {
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        inputL.value = (inputR.value * data.conversion_rates[toCurrency]).toFixed(4);
                        console.log("btn");
                    })
                    .catch(error => {
                        console.error("Fetch error:", error);
                    });
            } else {
                inputL.value = inputR.value;
                console.log("sorgu gonderilmedi");
                currentL.innerText = "1 " + toCurrency + " = 1 " + baseCurrency;
                currentR.innerText = "1 " + baseCurrency + " =  1 " + toCurrency;
            }
        }
    });
});

inputL.addEventListener('input', () => {
    let baseCurrency = document.querySelector('.btns-left .selected').innerText;
    let toCurrency = document.querySelector('.btns-right .selected').innerText;
    let url = api + baseCurrency;

    console.log(baseCurrency + "-den " + toCurrency + "-a cevrilir");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            currentL.innerText = "1  " + baseCurrency + "  = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
            currentR.innerText = "1 " + toCurrency + " = " + ((1 / data.conversion_rates[toCurrency])).toFixed(4) + " " + baseCurrency;
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    if (baseCurrency !== toCurrency) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentL.innerText = "1 " + baseCurrency + " = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
                currentR.innerText = "1 " + toCurrency + " = " + (1 / data.conversion_rates[toCurrency]).toFixed(4) + " " + baseCurrency;

                inputR.value = (inputL.value * data.conversion_rates[toCurrency]).toFixed(4);
                console.log("input");
            })
            .catch(error => {
                console.error("Fetch error:", error);
            });
    } else {
        inputR.value = inputL.value;
        console.log("sorgu gonderilmedi");
    };
    const enteredValue = parseFloat(inputL.value);
    if (enteredValue < 0) {
        alert("Enter a positive value");
        inputL.value = '';
        inputR.value = '';
    }
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d\-+eE.]/g, "");
    event.target.value = inputValue;
    checkConnection();
});  

inputR.addEventListener('input', () => {
    let baseCurrency = document.querySelector('.btns-right .selected').innerText;
    let toCurrency = document.querySelector('.btns-left .selected').innerText;
    let url = api + baseCurrency;
    
    console.log(baseCurrency + "-den " + toCurrency + "-a cevrilir");
    fetch(url)
        .then(res => res.json())
        .then(data => {
            currentL.innerText = "1  " + baseCurrency + "  = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
            currentR.innerText = "1 " + toCurrency + " = " + (1 / data.conversion_rates[toCurrency]).toFixed(4) + " " + baseCurrency;
        })
        .catch(error => {
            console.error("Fetch error:", error);
        });
    if (baseCurrency !== toCurrency) {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                currentL.innerText = "1 " + baseCurrency + " = " + data.conversion_rates[toCurrency].toFixed(4) + " " + toCurrency;
                currentR.innerText = "1 " + toCurrency + " = " + (1 / data.conversion_rates[toCurrency]).toFixed(4) + " " + baseCurrency;

                inputL.value = (inputR.value * data.conversion_rates[toCurrency]).toFixed(4);

                console.log("input");
            });
    } else {
        inputL.value = inputR.value;
        console.log("sorgu gonderilmedi");
    };
    const enteredValue = parseFloat(inputR.value);
    if (enteredValue < 0) {
        alert("Enter a positive value");
        inputR.value = '';
        inputL.value = '';
    }
    let inputValue = event.target.value;
    inputValue = inputValue.replace(/[^\d\-+eE.]/g, "");
    event.target.value = inputValue;
    checkConnection();
});

function checkConnection() {
    if (!navigator.onLine) {
      alert("No internet connection!");
      inputL.value = '';
      inputR.value = '';
    }
  }