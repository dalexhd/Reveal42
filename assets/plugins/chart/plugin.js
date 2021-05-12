/**
 * Reveal Plugin
 * https://revealjs.com/creating-plugins/
 */
import Chart from "chart.js";

const initChart = function (Reveal) {
	// check if chart option is given or not
	const chartConfig = Reveal.getConfig().chart || {};

	// set global chart options
	let config = chartConfig.defaults;

	function mergeRecursive(obj1, obj2) {
		for (const p in obj2) {
			try {
				// Property in destination object set; update its value.
				if (obj1[p].constructor === Object && obj2[p].constructor === Object) {
					obj1[p] = mergeRecursive(obj1[p], obj2[p]);
				} else {
					obj1[p] = obj2[p];
				}
			} catch (e) {
				// Property in destination object not set; create it and set its value.
				obj1[p] = obj2[p];
			}
		}

		return obj1;
	}

	if (config) {
		mergeRecursive(Chart.defaults, config);
	}

	function createChart(canvas, CSV, comments) {
		canvas.chart = null;
		const ctx = canvas.getContext("2d");
		const chartOptions = { responsive: true };
		const chartData = { labels: null, datasets: [] };
		if (comments !== null)
			for (let j = 0; j < comments.length; j++) {
				comments[j] = comments[j].replace(/<!--/, "");
				comments[j] = comments[j].replace(/-->/, "");
				// eslint-disable-next-line no-eval
				config = eval(`(function() {${comments[j]}}())`);
				if (config) {
					if (config.data) {
						mergeRecursive(chartData, config.data);
					}
					if (config.options) {
						mergeRecursive(chartOptions, config.options);
					}
				}
			}

		const lines = CSV.split("\n").filter(function (v) {
			return v !== "";
		});
		// if labels are not defined, get them from first line
		if (chartData.labels === null && lines.length > 0) {
			chartData.labels = lines[0].split(",");
			chartData.labels.shift();
			lines.shift();
		}
		// get data values
		for (let j = 0; j < lines.length; j++) {
			if (chartData.datasets.length <= j) chartData.datasets[j] = {};
			chartData.datasets[j].data = lines[j].split(","); // .filter(function(v){return v!==''});
			chartData.datasets[j].label = chartData.datasets[j].data[0];
			chartData.datasets[j].data.shift();
			for (let k = 0; k < chartData.datasets[j].data.length; k++) {
				chartData.datasets[j].data[k] = Number(chartData.datasets[j].data[k]);
			}
		}

		// add chart options
		config = chartConfig[canvas.getAttribute("data-chart")];
		if (config) {
			for (let j = 0; j < chartData.datasets.length; j++) {
				for (const attrname in config) {
					if (!chartData.datasets[j][attrname]) {
						chartData.datasets[j][attrname] =
							config[attrname][j % config[attrname].length];
					}
				}
			}
		}

		canvas.chart = new Chart(ctx, {
			type: canvas.getAttribute("data-chart"),
			data: chartData,
			options: chartOptions
		});
	}

	const initializeCharts = function () {
		// Get all canvases
		const canvases = document.querySelectorAll("canvas");
		for (let i = 0; i < canvases.length; i++) {
			// check if canvas has data-chart attribute
			if (canvases[i].hasAttribute("data-chart")) {
				let CSV = canvases[i].innerHTML.trim();
				const comments = CSV.match(/<!--[\s\S]*?-->/g);
				CSV = CSV.replace(/<!--[\s\S]*?-->/g, "").replace(/^\s*\n/gm, "");
				if (!canvases[i].hasAttribute("data-chart-src")) {
					createChart(canvases[i], CSV, comments);
				} else {
					const canvas = canvases[i];
					const xhr = new XMLHttpRequest();
					xhr.onload = function () {
						if (xhr.readyState === 4) {
							createChart(canvas, xhr.responseText, comments);
						} else {
							console.warn(
								`Failed to get file ${canvas.getAttribute(
									"data-chart-src"
								)}. ReadyState: ${xhr.readyState}, Status: ${xhr.status}`
							);
						}
					};

					xhr.open("GET", canvas.getAttribute("data-chart-src"), false);
					try {
						xhr.send();
					} catch (error) {
						console.warn(
							`Failed to get file ${canvas.getAttribute(
								"data-chart-src"
							)}. Make sure that the presentation and the file are served by a HTTP server and the file can be found there. ${error}`
						);
					}
				}
			}
		}
	};

	function recreateChart(canvas) {
		const config = canvas.chart.config;
		canvas.chart.destroy();
		setTimeout(function () {
			canvas.chart = new Chart(canvas, config);
		}, 500); // wait for slide transition
	}

	Reveal.addEventListener("ready", function () {
		initializeCharts();
		Reveal.addEventListener("slidechanged", function () {
			const canvases = Reveal.getCurrentSlide().querySelectorAll(
				"canvas[data-chart]"
			);
			for (let i = 0; i < canvases.length; i++) {
				if (canvases[i].chart && canvases[i].chart.config.options.animation) {
					recreateChart(canvases[i]);
				}
			}
		});
	});
};

export default () => {
	return {
		id: "RevealChart",
		init(deck) {
			initChart(deck);
		}
	};
};
