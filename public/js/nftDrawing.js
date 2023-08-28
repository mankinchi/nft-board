const defaultValue = 10;
let width = defaultValue;
let height = defaultValue;
const colorArr = [
	"#000000",
	"#ffff00",
	"#00ff00",
	"#007900",
	"#00aeae",
	"#0000ff",
	"#7308a5",
	"#ba00ff",
	"#cc00af",
	"#ff0000",
	"#ff4600",
	"#ff7f00",
	"#feb300",
	"#ffffff",
];
let currentColor = colorArr[0];

const addCanvasListener = () => {
	const $canvas = $("#canvas");
	let isDrawing = false;

	const drawCell = ($el) => {
		if (isDrawing) {
			$el.data("drawn", true)
				.data("color", currentColor)
				.css("background", currentColor);
		}
	};

	$canvas.on("mousedown", ".cell", (e) => {
		isDrawing = true;

		const $el = $(e.currentTarget);
		drawCell($el);
	});

	$canvas.on("mouseup", () => {
		isDrawing = false;
	});

	$canvas.on("mouseover", ".cell", (e) => {
		const $el = $(e.currentTarget);

		drawCell($el);
	});
};

const redrawCanvas = () => {
	const $canvas = $("#canvas");

	$canvas.empty();

	for (let row = 0; row < height; row += 1) {
		const $row = $("<div>").addClass("flex flex-row");
		for (let col = 0; col < width; col += 1) {
			const $el = $("<div>")
				.addClass(
					"cell w-6 aspect-square bg-white border border-solid border-black hover:!bg-current",
				)
				.data("location", { row, col });

			$row.append($el);
		}

		$canvas.append($row);
	}
};

const updateActiveColorPicker = () => {
	const $container = $("#colorPicker");

	$container.children().removeClass("border-red-600");

	for (const el of $container.children()) {
		const $el = $(el);
		if ($el.data("color") === currentColor) {
			$el.addClass("border-red-600");
		}
	}
};

const drawColorPicker = () => {
	const $container = $("#colorPicker");
	for (const color of colorArr) {
		const $picker = $("<div>")
			.addClass(
				"h-4 aspect-square rounded-full border border-solid border-black cursor-pointer",
			)
			.css("background-color", color)
			.data("color", color);
		$container.append($picker);
	}
};

const init = () => {
	drawColorPicker();
	addCanvasListener();
	redrawCanvas();
	updateActiveColorPicker();

	$("#canvas").css("color", currentColor);

	$("#colorPicker").on("click", "div", (e) => {
		const $el = $(e.currentTarget);
		currentColor = $el.data("color");

		$("#canvas").css("color", currentColor);
		updateActiveColorPicker();
	});

	$("#canvasControl").on("change", ".canvasDimension", (e) => {
		const $el = $(e.currentTarget);
		const newValue = $el[0].valueAsNumber ?? defaultValue;

		if ($el.attr("name") === "width") {
			width = newValue;
		}
		if ($el.attr("name") === "height") {
			height = newValue;
		}

		redrawCanvas();
	});
};

init();
