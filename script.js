const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("form button");
const inputBox = document.querySelector(".amount input");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
const message = document.querySelector(".message");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }
        else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
    }
    select.addEventListener("change", (event) => {
        updateFlagImage(event.target);
    })
}

const updateFlagImage = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let flagImage = element.parentElement.querySelector("img");
    flagImage.src = newSrc;
}

const updateMessage = (inputNumber,fromCode,convertedAmount,toCode) => {
    message.innerText = `${inputNumber} ${fromCode.toUpperCase()} = ${convertedAmount} ${toCode.toUpperCase()}`;
}

button.addEventListener("click", async(event) => {

    event.preventDefault();

    let inputNumber = parseFloat(inputBox.value);

    if (inputNumber < 1 || isNaN(inputNumber) ) {
        inputBox.value = 1;
        inputNumber = 1;
    }

    let fromCode = fromCurr.value.toLowerCase();
    let toCode = toCurr.value.toLowerCase();

    try {

        const URL = `${BASE_URL}/${fromCode}.json`;
        let response = await fetch(URL);
        let data = await response.json();
        
        let rate = data [fromCode][toCode];
        
        let convertedAmount = parseFloat((inputNumber * rate).toFixed(3));
        
        updateMessage(inputNumber,fromCode,convertedAmount,toCode);
    }

    catch (error){
        message.innerText = "Error fetching the exchange rate, Please Try Again Later..";
        console.log(error)
    }
})
