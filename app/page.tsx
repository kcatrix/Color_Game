'use client';

import Image from 'next/image'
import React, { useEffect, useState, EventTarget } from 'react';


export default function Home() {

	const cliqueur_mode = (event) => {
		let mode = document.querySelector(".mode.selected")
		if (event.target.className == "mode")
		{
			event.target.className = "mode selected"
			mode.className = "mode"
			console.log(mode)
			if (event.target.children == "Easy ")
				console.log("easy money !!!!!!!")
		}
	};

	const cliqueur = (event) => {
		event.target.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
	  };

	useEffect(() => {
		let square = document.querySelectorAll(".square");
		square.forEach((square) => {
			square.style.backgroundColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
			square.addEventListener('click', cliqueur);
		}, [])
	}, [])

	useEffect(() => {
		let mode = document.querySelectorAll(".mode");
		mode.forEach((mode) => {
			mode.addEventListener('click', cliqueur_mode);
		}, [])
	}, [])

  return (
	// https://codepen.io/itsmhuang/pen/oxaReK
<div>
	<h1>The Great <span id="color-display">RGB</span> Guessing Game</h1>
	<div id ="stripe">
		<button id="reset">Start</button>
		<span id="message"></span>
		<button className="mode">Easy </button>
		<button className="mode selected">Hard</button>
	</div>
	<div id="container">
		<div className="square"></div>
		<div className="square"></div>
		<div className="square"></div>
		<div className="square"></div>
		<div className="square"></div>
		<div className="square"></div>
	</div>

	<script type="text/javascript" src="script.js"></script>
</div>
  )
}
