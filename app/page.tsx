'use client';

import { promises } from 'dns';
import { Vollkorn } from 'next/font/google';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';



export default function Home() {

	let mode_de_jeux = 'no game'
	let mode_enable = 'Hard'
	let number_of_victory = 0
	let enable = false
	const [lvl, setLvl] = useState(1);


	function looser(event){
		event.target.style.boxShadow = "0 0 5px 2px red";
		setTimeout(async () => {
			event.target.style.boxShadow = "none";
		}, 1000);
	}

	function winner(square) {
		square.forEach((square) => {
			square.style.boxShadow = "0 0 5px 2px green";
		});
		setTimeout(async () => {
			square.forEach((square) => {
				square.style.boxShadow = "none";
			});
		}, 1000);
	}

	function winnersolo(square) {
		square.style.boxShadow = "0 0 5px 2px green";
		setTimeout(async () => {
			square.style.boxShadow = "none";
		}, 1000);
	}
	

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	async function boucle(number_of_victory, square, solution, i) {
		return new Promise(async (resolve) => {
			console.log("on tient le bon bout ", number_of_victory);
			setTimeout(async () => {
				solution.push(getRandomInt(5));
				square[solution[i]].animate(
					[
						{ transform: 'scale(1)' },
						{ transform: 'scale(1.3)' }
					],
					{
						duration: 1000,
					}
				);
				console.log("Delayed for 1 second.");
				if (number_of_victory !== 0) {
					await boucle(number_of_victory - 1, square, solution, i + 1);
				}
				resolve(); // Resolve the promise when the timeout is done
			}, 1000);
		});
	}

	const waitOneSecond = () => {
		return new Promise((resolve) => {
			setTimeout(resolve, 1000);
		});
	}

	

	const cliqueur_start = async (event) => {
		if (mode_de_jeux == 'in game')
			return
		mode_de_jeux = 'in game'
		let square = document.querySelectorAll(".square");
		let solution = []
		if (mode_enable == 'Hard') {
			console.log("allo la france")
			await boucle(number_of_victory + 3, square, solution, 0);
			await waitOneSecond();
			localStorage.setItem("solution", solution);
			enable = true
		}
	}

	const cliqueur_mode = (event) => {
		if (event.target.className == "mode" && mode_de_jeux == 'no game') {
			let mode = document.querySelector(".mode.selected")
			event.target.className = "mode selected"
			mode.className = "mode"
			if (event.target.firstChild.textContent == "Easy ") {
				let square = document.querySelectorAll(".square");
				let val = square.length / 2
				for (let i = square.length - 1; i != val - 1; i--)
					square[i].style.visibility = 'hidden'
				mode_enable = 'Easy'
			}
			else {
				let square = document.querySelectorAll(".square");
				let val = square.length
				let clone = square[0]
				for (let i = 3; i != val; i++)
					square[i].style.visibility = 'visible'
				mode_enable = 'Hard'
			}
		}
	};

	const cliqueur = (event) => {
		if (mode_de_jeux == 'no game')
			event.target.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
	};

	const verif = (event) => {
		let solution = localStorage.getItem("solution")
		let words = []
		if (!solution)
			return
		if (event.target.id == solution[0])
		{
			if (solution?.length != 1)
			{
				winnersolo(event.target)
				words = solution.split(',');
				words.shift();
				localStorage.setItem("solution", words)
				console.log(words?.length)
			}
			else if (words?.length == 0)
			{
				let square = document.querySelectorAll(".square");
				winner(square)
				setLvl(lvl + 1);
				console.log(lvl)
				number_of_victory++
				mode_de_jeux = 'no game'
				localStorage.clear();
			}
			
		}
		else
		{
			looser(event)
			number_of_victory = 0
			setLvl((bougie) => bougie = 1)
			// alert("Perdu")
			mode_de_jeux = 'no game'
			localStorage.clear();
			console.log("eat my bool")
		}


	};
	useEffect(() => {
		let square = document.querySelectorAll(".square");
		square.forEach((square) => {
			square.style.backgroundColor = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
			square.addEventListener('click', cliqueur);
		}, [])
	}, [])

	useEffect(() => {
		let mode = document.querySelectorAll(".mode");
		mode.forEach((mode) => {
			mode.addEventListener('click', cliqueur_mode);
		}, [])
	}, [])

	useEffect(() => {
		let start = document.querySelector("#start")
		start?.addEventListener('click', cliqueur_start);
	}, [])

	useEffect(() => {
		let square = document.querySelectorAll(".square");
		square.forEach((square) => {
			square.addEventListener('click', verif);
		}, [])
	}, [enable])
	return (
		// https://codepen.io/itsmhuang/pen/oxaReK
		<div>
			<h1>The Great <span id="color-display">RGB</span> Guessing Game</h1>
			<div id="stripe">
				<button id="start">Start</button>
				<span id="message">LVL {lvl}</span>
				<button className="mode">Easy </button>
				<button className="mode selected">Hard</button>
			</div>
			<div id="container">
				<div id="0" className="square"></div>
				<div id="1" className="square"></div>
				<div id="2" className="square"></div>
				<div id="3" className="square"></div>
				<div id="4" className="square"></div>
				<div id="5" className="square"></div>
			</div>

			<script type="text/javascript" src="script.js"></script>
		</div>
	)
}
