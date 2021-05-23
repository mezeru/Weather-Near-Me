window.addEventListener("load",() => {
	let longitude;
	let latitude;
	let tempDes = document.querySelector('.desp-text');
	let tempDegree = document.querySelector('.temp-degree');
	let timeZone = document.querySelector('.location-timezone');
	let degreeSec = document.querySelector('.degree-sec span');
	let humi = document.querySelector('.Humid');
	let Visi = document.querySelector('.Visibility');
	let atempDegree = document.querySelector('.atemp-degree');
	let achange = document.querySelector('.adegree-sec span');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position =>{
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;
			console.log(longitude,latitude);
			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${latitude},${longitude}`;

			fetch(api)
				.then(response => {
					let resp = response.json();
					return resp;
				})
				.then(data => {
					console.log(data);
					const {temperature,summary,windSpeed,humidity,icon,visibility,apparentTemperature} = data.currently;

					tempDes.textContent = summary;
					tempDegree.textContent = temperature;
					timeZone.textContent = data.timezone;
					humi.textContent = humidity*100 + " %";
					Visi.textContent = visibility*1.6 + " Km";
					atempDegree.textContent = apparentTemperature;
					setIcons(icon,document.querySelector('.icon'));

					degreeSec.addEventListener('click',() => {

						if(degreeSec.textContent == 'F'){
							degreeSec.textContent = 'C';
							cDegree = (temperature - 32)*5/9;
							tempDegree.textContent = cDegree.toFixed(2);
							aDegree = (apparentTemperature - 32)*5/9;
							atempDegree.textContent = aDegree.toFixed(2);
							achange.textContent = 'C';

						}
						else if(degreeSec.textContent == 'C'){
							degreeSec.textContent = 'F';
							tempDegree.textContent = temperature;
							atempDegree.textContent = apparentTemperature;
							achange.textContent = 'F';
						}
					});

				});
		});
	}

	function setIcons(icon,iconId){
		const skycons =  new Skycons({color:"#737373"});
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconId, Skycons[currentIcon]);	
	}

});

