const canvas = document.getElementById("canvas");
const graphics = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const num = document.getElementById("num");
const real = document.getElementById("real");
const complex = document.getElementById("complex");
const click = document.getElementById("click");
const pi = Math.PI

let translatedX = 0;
let translatedY = 0;

let mouseX = 0;
let mouseY = 0;

let scale = 1;
const scalingFactor = width/(6*pi);

canvas.addEventListener("click", function(mouse) {
	if (click.checked) {
		translatedX = 0;
		translatedY = 0;
		scale = 1;

		real.value = (mouse.offsetX-width/2)/(scalingFactor);
		complex.value = (mouse.offsetY-height/2)/(scalingFactor);

		juliaSetDraw((mouse.offsetX-width/2)/(scalingFactor), (mouse.offsetY-height/2)/(scalingFactor), num.value);
	} else {
		mouseX = (mouse.offsetX-width/2)/(scalingFactor);
		mouseY = (mouse.offsetY-height/2)/(scalingFactor);

		translatedX += mouseX/scale;
		translatedY += mouseY/scale;

		scale *= 2;

		juliaSetDraw(parseFloat(real.value), parseFloat(complex.value), parseInt(num.value));
	}
});

function juliaSetDraw(real, imaginary, iterations) {
	graphics.clearRect(0, 0, width, height);

	//multiply by 4 in order to get the scaling right
	for (let i = 0; i <= width; i++) {
		for (let j = 0; j <= height; j++) {
			let x = ((i-width/2)/scalingFactor)/scale + translatedX;
			let y = ((j-height/2)/scalingFactor)/ scale + translatedY;

			let k = 0;

			const re = real;
			const im = imaginary;

			while (Math.abs(y) < 50 && k < iterations) {
				let x_new = re*Math.sin(x)*Math.cosh(y) - im*Math.sinh(y)*Math.cos(x);
				y = re*Math.sinh(y)*Math.cos(x) + im*Math.sin(x)*Math.cosh(y);

				x = x_new;

				k++;
			}

			if (k < iterations) {
				graphics.fillStyle = "hsl(" + iterations/k + "," + k + "%, " + k  + "%)";
				graphics.fillRect(i, j, 1, 1);
			} else {
				graphics.fillStyle = "white";
				graphics.fillRect(i, j, 1, 1);
			}
		}
	}
}

//1 + .3i
juliaSetDraw(parseFloat(real.value), parseFloat(complex.value), parseInt(num.value));