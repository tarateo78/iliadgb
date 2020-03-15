let cheerio = require('cheerio');
let request = require('request');


let arealogout = {
	uri: 'https://www.iliad.it/account/?logout=user',
	method: "POST",
	followAllRedirects: true,
	jar: true
};


const url = 'https://www.iliad.it/account/';

let iliad = {}

let areariservata = {
	uri: url,
	method: "POST",
	followAllRedirects: true,
	jar: true,
	form: {
		"login-ident": 'user',
		"login-pwd": 'pass'
	}
};

exports.getIliad = function (user, pass, callback) {

	areariservata.form["login-ident"] = '79587721' //user;
	areariservata.form["login-pwd"] = 'BocTB-iH=S' //pass;

	let consumo;
	let credito;
	let endOfferta;
	let giorniPassati;
	let giorniOfferta;



	request.post(areariservata, (error, response, body) => {
		// console.log(areariservata);
		// console.log( body.substr(0,150) );
		// console.log( body)
		// console.log( response.headers);
		let $ = null;
		$ = cheerio.load(body);

		// LogOut per perdere Autologin
		request.post(arealogout, () => {
			// console.log("LogOut");
		});

		//-- Set Credito Residuo
		let creditoTmp = $('h2 > b').html();
		try {
			creditoTmp = creditoTmp.split("&");
		} catch (error) {
			callback("NOLOG");
			return;
		}
		iliad.credito = parseFloat(creditoTmp[0]);


		// Set Consumo IT e EU
		$('.conso__text').each(function (i, item) {
			if (i == 2) {
				// console.log(i, $(item).text());
				let consumoIt = $(item).text().replace(" ", "").replace(" / ", "").replace(",", ".").split("GB")
				iliad.consumoIt = parseFloat(consumoIt[0].replace("\n", ""))
				iliad.totaleIt = parseFloat(consumoIt[1])
			}
			if (i == 6) {
				// console.log(i, $(item).text());
				let consumoEu = $(item).text().replace(" ", "").replace(" / ", "").replace(",", ".").split("b")
				iliad.consumoEu = parseFloat(consumoEu[0].replace("\n", ""))
				iliad.totaleEu = parseFloat(consumoEu[1])
			}
		});

		
		
		//-- Set consumo
		// $('.conso__text > .red').each(function (i, item) {
		// 	if (i == 4) consumo = $(item).text().split("G")[0];
		// });
		// consumo = consumo.replace(",", ".");
		

		//-- Set giorni offerta
		endOfferta = $('.end_offerta').text().substring(59, 69);
		let miaData = endOfferta.split("/");
		let dE = new Date(miaData[2] + "/" + miaData[1] + "/" + miaData[0]);
		// console.log(dE.toLocaleDateString());
		let dI = new Date(miaData[2] + "/" + miaData[1] + "/" + miaData[0]);
		dI.setMonth(dE.getMonth() - 1);
		// console.log(dI.toLocaleDateString());

		// To calculate the time difference of two dates 
		let Difference_In_Time = dE.getTime() - dI.getTime();

		// To calculate the no. of days between two dates 
		let giorniOfferta = Difference_In_Time / (1000 * 3600 * 24);


		let oggi = new Date();
		let diffInTime = oggi.getTime() - dI.getTime();
		giorniPassati = Math.trunc(diffInTime / (1000 * 3600 * 24));

		iliad.endOfferta = endOfferta
		iliad.giorniOfferta = giorniOfferta
		iliad.giorniPassati =  giorniPassati

		callback(iliad);

		// callback('{"consumo":' + consumo + ', "credito":' + credito + ', "endOfferta":"' + endOfferta + '", "giorniPassati":' + giorniPassati + ', "giorniOfferta":' + giorniOfferta + '}');

	});


}