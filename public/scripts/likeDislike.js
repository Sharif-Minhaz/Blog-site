window.onload = function() {
	const likeBtn = document.getElementById("likeBtn");
	const dislikeBtn = document.getElementById("dislikeBtn");

	likeBtn.addEventListener("click", function (e) {
		let postId = likeBtn.dataset.post;
		reqLikeDislike("likes", postId)
			.then((res) => res.json())
			.then((data) => {
				let likeText = data.liked ? "🧡 Liked" : "🧡 Like";
                likeText = likeText + ` (${data.totalLikes}) `
                let dislikeText = `💔 Dislike ( ${data.totalDislikes} )`;

                likeBtn.innerHTML = likeText
                dislikeBtn.innerHTML = dislikeText
			})
			.catch((e) => {
                console.error(e);
            });
	});

	dislikeBtn.addEventListener("click", function (e) {
		let postId = likeBtn.dataset.post;
		reqLikeDislike("dislikes", postId)
			.then((res) => res.json())
			.then((data) => {
				let dislikeText = data.disliked ? "💔 disliked" : "💔 dislike";
                dislikeText = dislikeText + ` (${data.totalDislikes}) `
                let likeText = `🧡 like ( ${data.totalLikes} )`;

                likeBtn.innerHTML = likeText
                dislikeBtn.innerHTML = dislikeText
			})
			.catch((e) => {
                console.error(e);
            });
	});

	function reqLikeDislike(type, postId) {
		let headers = new Headers();
		headers.append("Accept", "Application/JSON");
		headers.append("Content-Type", "Application/json");

		let req = new Request(`/api/${type}/${postId}`, {
			method: "GET",
			headers,
			mode: "cors",
		});
		return fetch(req);
	}
};
