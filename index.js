document.addEventListener("DOMContentLoaded", () => {
    const convertBtn = document.getElementById("convert-btn");
    const fromCurrency = document.getElementById("from");
    const toCurrency = document.getElementById("to");

    function populateSelectOptions(selectElement) {
        currencyCodes.forEach((currencyCode) => {
            const option = document.createElement("option");
            option.value = currencyCode;
            option.text = currencyCode;
            selectElement.add(option);
        });
    }

    populateSelectOptions(fromCurrency);
    populateSelectOptions(toCurrency);

    convertBtn.addEventListener("click", async () => {
        const amount = parseFloat(document.getElementById("amount").value);
        const apiKey = 'ef5209e78a1b0ed8978eca02';

        const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency.value}/${toCurrency.value}/${amount}`;
        
        try {
            const response = await fetch(apiURL);
            const data = await response.json();
            console.log(data)
            if (data.result) {
                const convertedAmount = data.conversion_result;
                const resultElement = document.getElementById("result");
                resultElement.textContent = `Converted amount: ${amount} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
            } else {
                console.error("Error fetching exchange rates:", data.message);
                alert("Error fetching exchange rates. Please try again later.");
            }
        } catch (error) {
            console.error("Error fetching exchange rates:", error);
            alert("Error fetching exchange rates. Please try again later.");
        }
    });
});
