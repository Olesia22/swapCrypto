const API_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,notcoin&vs_currencies=usd';
let cryptoRates = {};

fetch(API_URL)
.then(res => res.json())
.then(data => cryptoRates = data);

const amount = document.getElementById('usdtBalance');

amount.addEventListener('input', function() {
	let usdBalance = parseFloat(this.value) || 0;
	document.getElementById('amount').value = usdBalance;
});

function swapCrypto () {
	let amount = parseFloat(document.getElementById('amount').value);
	let fromCurrency = document.getElementById('fromCurrency').value;
	let toCurrency = document.getElementById('toCurrency').value;
	if (!cryptoRates[fromCurrency || !cryptoRates[toCurrency]]) return;
	//Проверка на сущ.курсов для выбранных валют
	let rate = cryptoRates[fromCurrency].usd / cryptoRates[toCurrency].usd;
	//рассчёт курса конвертации между двумя валютами через их курсы в usd
	let convertedAmount = amount * rate;
	//расчёт итоговой суммы после конвертации: сумма * курс
	let res = document.getElementById('result');
	res.textContent = `${convertedAmount.toFixed(6)} ${toCurrency.toUpperCase()}`;
}

const btn = document.querySelector('button');
btn.addEventListener('click', swapCrypto);