//SUPERATO


const cheerio = require('cheerio');
const request = require( 'request' );

function getIliad(user, pass)
	{


		const url = 'https://www.iliad.it/account/';
		const ident = user;
		const pwd = pass;

		var areariservata = {
			uri: url,
			method: "POST",
			followAllRedirects: true,
			jar: true,
			form: {
				"login-ident": ident,
				"login-pwd": pwd
			}
		};

		var consumo;
		var credito;
		var endOfferta;
		var giorniPassati;
		var giorniOfferta;


		request.post(areariservata, function (error, response, body) {
			//console.log(body);
			const $ = cheerio.load(body);

			this.dati = body;

			//-- Set Credito Residuo
			var creditoTmp = $('h2 > b').html();
			creditoTmp = creditoTmp.split("&");
			credito = creditoTmp[0];

			//-- Set consumo
			$('.conso__text > .red').each(function (i, item) {
				if (i == 4) consumo = $(item).text().split("G")[0];
			});
			consumo = consumo.replace(",", ".");


			//-- Set giorni offerta
			endOfferta = $('.end_offerta').text().substring(59, 69);
			var miaData = endOfferta.split("/");
			var dE = new Date(miaData[2] + "/" + miaData[1] + "/" + miaData[0]);
			// console.log(dE.toLocaleDateString());
			var dI = new Date(miaData[2] + "/" + miaData[1] + "/" + miaData[0]);
			dI.setMonth(dE.getMonth() - 1);
			// console.log(dI.toLocaleDateString());

			// To calculate the time difference of two dates 
			var Difference_In_Time = dE.getTime() - dI.getTime();

			// To calculate the no. of days between two dates 
			var giorniOfferta = Difference_In_Time / (1000 * 3600 * 24);


			var oggi = new Date();
			var diffInTime = oggi.getTime() - dI.getTime();
			giorniPassati = Math.trunc(diffInTime / (1000 * 3600 * 24));

			console.log(consumo);
			console.log(credito);
			console.log(endOfferta);
			console.log(giorniPassati);
			console.log(giorniOfferta);

			this.dati = ("{'consumo':" + consumo + ", 'credito':" + credito + ", 'endOfferta':'" + endOfferta + "', 'giorniPassati':" + giorniPassati + ", 'giorniOfferta':" + giorniOfferta + "}");

		});
	

}


module.exports = getIliad;