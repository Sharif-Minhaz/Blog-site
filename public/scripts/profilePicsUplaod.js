window.onload = function () {
	let baseCropping = $("#cropped-image").croppie({
		viewport: {
			width: 200,
			height: 200,
		},
		boundary: {
			width: 300,
			height: 300,
		},
		showZoomer: true,
	});

	function readableFile(file) {
		let reader = new FileReader();
		reader.onload = function (event) {
			baseCropping
				.croppie("bind", {
					url: event.target.result,
				})
				.then(() => {
					$(".cr-slider").attr({
						min: 0.5,
						max: 1.5,
					});
				});
		};
		reader.readAsDataURL(file);
	}
	$("#profilePicsFile").on("change", function () {
		if (this.files[0]) {
			readableFile(this.files[0]);
			$("#crop-modal").modal("show",{
				backdrop: "static",
				keyboard: false,
			});
		}
	});
	$("#cancel-cropping").on("click", function () {
		$("#crop-modal").modal("hide");
		setTimeout(() => {
			baseCropping.croppie("destroy");
		}, 1000);
	});
};
