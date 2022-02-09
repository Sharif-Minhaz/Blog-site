window.onload = function () {
	const bookmarks = document.getElementsByClassName("bookmark");
	[...bookmarks].forEach((bookmark) => {
		bookmark.style.cursor = "pointer";
		bookmark.addEventListener("click", function (e) {
			let target = e.target.parentElement;

			console.log(target);

			let headers = new Headers();
			headers.append("Accept", "Application/JSON");

			let req = new Request(`/api/bookmarks/${target.dataset.post}`, {
				method: "GET",
				headers,
				mode: "cors",
			});

			fetch(req)
				.then((res) => res.json())
				.then((data) => {
                    console.log("Stamp: " + data.bookmark);
					if (data.bookmark) {
						target.innerHTML =
							'<i class="fas fa-bookmark" style="font-size: 20px"></i>';
					} else {
						target.innerHTML =
							'<i class="far fa-bookmark" style="font-size: 20px"></i>';
					}
				})
				.catch((e) => {
					console.error(e.response.data);
					alert(e.response.data.error);
				});
		});
	});
};
