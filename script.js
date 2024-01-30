const BASE_URL = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies';
const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('button');
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msgg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("Option");
        newOption.innerText = currCode;
        newOption.Value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = 'selected';
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

updateFlag = (element) => {
    let currCode = (element.value);
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

buttonClick = () => {
    btn.addEventListener("click", async(evt) => {
        evt.preventDefault();
        let amount = document.querySelector(".amount input");
        let amtVal = amount.value;
        if (amtVal === "" || amtVal < 1) {
            amtVal == 1;
            amount.value = "1";
        }
        const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
        let response = await fetch(URL);
        console.log(response);
        let data = await response.json();
        let rate = data[toCurr.value.toLowerCase()];
        console.log(rate);
        let product = rate * amtVal;
        console.log(product);
        msgg.innerHTML = `${amtVal} ${fromCurr.value}  =  ${product} ${toCurr.value}`;

    });
}
buttonClick();