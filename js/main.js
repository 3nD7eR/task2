'use strict'
// 	рисуем страницу
getDrawingPage();
// 	отслеживаем события
document.querySelector('button').addEventListener('click', function() {
	let elementDiv;
	let inputNumber1, inputNumber2, inputNumber3;
	let riverLevel, liftingPercentage, criticalLevel;
	let liftingLevel = [];
	let i;

// 	очистка страницы
	elementDiv = document.querySelector('.block1');
	if (elementDiv != null) {
		elementDiv.remove();
	}
	elementDiv = document.querySelector('.block2');
	if (elementDiv != null) {
		elementDiv.remove();
	}
	elementDiv = document.querySelector('.block3');
	if (elementDiv != null) {
		elementDiv.remove();
	}
	elementDiv = document.querySelector('.river_chart');
	if (elementDiv != null) {
		elementDiv.remove();
	}

// 	ввод и проверка данных
	inputNumber1 = document.getElementById('numberIn1').value;
	inputNumber1 = Number(inputNumber1);
	if (isNaN(inputNumber1) === true && typeof inputNumber1 != 'number') {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	if (inputNumber1 <= 0 || inputNumber1 > 10) {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	if (Number.isInteger(inputNumber1) === false) {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	inputNumber2 = document.getElementById('numberIn2').value;
	inputNumber2 = Number(inputNumber2);
	if (isNaN(inputNumber2) === true && typeof inputNumber2 != 'number') {
		alert('введите: 10,20,30,40,50,60,70,80,90,100');
		return;
	}
	if (inputNumber2 <= 0 || inputNumber2 > 100) {
		alert('введите: 10,20,30,40,50,60,70,80,90,100');
		return;
	}
	if (inputNumber2 !== 10 && inputNumber2 !== 20 && inputNumber2 !== 30 && inputNumber2 !== 40 && inputNumber2 !== 50 && inputNumber2 !== 60 && inputNumber2 !== 70 && inputNumber2 !== 80 && inputNumber2 !== 90 && inputNumber2 !== 100) {
		alert('введите: 10,20,30,40,50,60,70,80,90,100');
		return;
	}
	if (Number.isInteger(inputNumber2) === false) {
		alert('введите: 1 - 100');
		return;
	}
	inputNumber3 = document.getElementById('numberIn3').value;
	inputNumber3 = Number(inputNumber3);
	if (isNaN(inputNumber3) === true && typeof inputNumber3 != 'number') {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	if (inputNumber3 <= 0 || inputNumber3 > 10) {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	if (Number.isInteger(inputNumber3) === false) {
		alert('введите: 1,2,3,4,5,6,7,8,9,10');
		return;
	}
	if (inputNumber3 <= inputNumber1) {
		alert('критический уровень должен быть больше начального уровня');
		return;
	}
// 	расчет уровней
	riverLevel = inputNumber1;
	liftingPercentage = inputNumber2;
	criticalLevel = inputNumber3;
	liftingLevel [0] = riverLevel;

	for (i = 1;; i = i + 1) {
		liftingLevel [i] = liftingLevel [i - 1] + liftingLevel [i - 1] * liftingPercentage / 100;
		if (liftingLevel [i] >= criticalLevel) break;
	}

//	выводим результат чертим график
	getDrawingResults (liftingLevel, criticalLevel);
	getDrawingChart(liftingLevel, criticalLevel);
});

function getDrawingPage() {
	document.querySelector('body').insertAdjacentHTML('beforeend',
		'<header>' +
		'<h1>НАВОДНЕНИЕ</h1>' + '<h2>Введите параметры</h2>' +
		'<h3>(1,2,3,4,5,6,7,8,9,10;           уровень реки м)</h3>' +
		'<h3>(10,20,30,40,50,60,70,80,90,100; процент поднятия уровня реки от прошлого уровня за один час %)</h3>' +
		'<h3>(1,2,3,4,5,6,7,8,9,10;           критический уровень реки м)</h3>' +
		'<div class="input">' +
		'<input id="numberIn1" type="text" autocomplete="off" placeholder="уровень реки"' +
		' value=""/>' +
		'<input id="numberIn2" type="text" autocomplete="off" placeholder="процент поднятия"' +
		' value=""/>' +
		'<input id="numberIn3" type="text" autocomplete="off" placeholder="критический уровень"' +
		' value=""/>' +
		'<button type="submit">▲</button>' +
		'</div>' +
		'</header>' +
		'<main class="block"></main>' +
		'<footer>© Created by Erik Dubenko erikod0202@gmail.com</footer>');
}

function getDrawingResults(liftingLevel, criticalLevel) {
	let lastLevel, index, criticalTimeMin;
	let levelDynamics = [];

	lastLevel = (liftingLevel [liftingLevel.length - 1] - criticalLevel).toFixed(2);
	for (index = 0; index < liftingLevel.length; index = index + 1) {
		levelDynamics [index] = liftingLevel [index].toFixed(2);

	}
	criticalTimeMin = (criticalLevel - liftingLevel [liftingLevel.length - 2]) / ((liftingLevel [liftingLevel.length - 1] - liftingLevel [liftingLevel.length - 2]) / 60);
	criticalTimeMin = criticalTimeMin.toFixed(0);

	document.querySelector('main').insertAdjacentHTML('beforeend',
		`<p class="block1">Динамика роста уровня реки ${levelDynamics}</p>\<p class="block2">Через
		 ${liftingLevel.length - 2} ч ${criticalTimeMin} мин уровень реки достигнит критического уровня
		  ${criticalLevel} м &#9888</p>\<p class="block3">Через ${liftingLevel.length - 1} ч уровень реки превысит критический уровень ${criticalLevel} м на ${lastLevel} м, если не прорвет дамбу &#128526</p>`);
}

function getDrawingChart(liftingLevel, criticalLevel) {
	let ctx;
	let lineChart;
	let labels = [];
	let drawingCriticalLevel = [];
	let drawingLiftingLevel = [];

	for (let i = 0; i <= liftingLevel.length - 1; i = i + 1) {
		labels[i] = i.toString();
		drawingCriticalLevel [i] = criticalLevel;
		drawingLiftingLevel [i] = Math.round( liftingLevel [i] * 100 + Number.EPSILON ) / 100;
	}

	document.querySelector('main').insertAdjacentHTML('afterend','<div class = "river_chart"><canvas id="chart"></canvas></div>');
	ctx = document.getElementById('chart').getContext('2d');
	lineChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [{
				label: 'динамика роста уровня реки',
				backgroundColor: 'rgba(0, 255, 255, 0.9)',
				data: drawingLiftingLevel
			}, {
				label: 'критический уровень',
				borderColor: 'rgba(249, 128, 53, 0.9)',
				pointRadius: 0,
				data: drawingCriticalLevel
			}]

		}
	});
}