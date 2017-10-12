console.log("Sanity Check: JS is working!");

var colors = anime({
	targets: '#colors .el',
	translateX: 250,
	color:[
		{value: '#00ff00'},
		{value: '#00ffff'},
		{value: '#8459e0'}
	],
	easing: 'linear',
	direction: 'alternate',
	duration: 2000
});

