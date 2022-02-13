window.onload = function () {
	const bookmarks = document.getElementsByClassName("bookmark");
	const likeBtn = document.getElementById("likeBtn");
	const dislikeBtn = document.getElementById("dislikeBtn");
	const comment = document.getElementById("comment");
	const commentHolder = document.getElementById("comment-holder");

	[...bookmarks].forEach((bookmark) => {
		bookmark.style.cursor = "pointer";
		bookmark.addEventListener("click", function (e) {
			let target = e.target.parentElement;

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
					if (data.bookmark) {
						target.innerHTML = '<i class="fas fa-bookmark"></i>';
					} else {
						target.innerHTML = '<i class="far fa-bookmark"></i>';
					}
				})
				.catch((e) => {
					alert(e.response.data.error);
				});
		});
	});

	comment.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			if (e.target.value) {
				let postId = comment.dataset.post;
				let data = {
					body: e.target.value,
					main: e.target.value,
				};
				let req = generateRequest(`/api/comments/${postId}/`, "POST", data);
				fetch(req)
					.then((res) => res.json())
					.then((data) => {
						let commentElement = createComment(data);
						commentHolder.insertBefore(commentElement, commentHolder.children[0]);
						e.target.value = "";
					})
					.catch((e) => {
						// location.reload();
						// console.log(e.message);
						alert(e.message);
					});
			} else {
				alert("Please Enter A Valid Comment");
			}
		}
	});

	commentHolder.addEventListener("keypress", function (e) {
		if (commentHolder.hasChildNodes(e.target)) {
			if (e.key === "Enter") {
				let commentId = e.target.dataset.comment;
				let user = e.target.dataset.user;
				let value = e.target.value;

				if (value) {
					let data = {
						body: value,
					};
					let req = generateRequest(`/api/comments/replies/${commentId}`, "POST", data);
					fetch(req)
						.then((res) => res.json())
						.then((data) => {
							let replyElement = createReplyElement(data, user);
							let parent = e.target.parentElement;
							parent.previousElementSibling.appendChild(replyElement);
							e.target.value = "";
						})
						.catch((e) => {
							console.log(e);
							alert(e.message);
						});
				} else {
					alert("Please Enter A Valid Reply");
				}
			}
		}
	});

	likeBtn.addEventListener("click", function (e) {
		console.log("Like");
		let postId = likeBtn.dataset.post;
		reqLikeDislike("likes", postId)
			.then((res) => res.json())
			.then((data) => {
				let likeText = data.liked ? "🧡 Liked" : "🧡 Like";
				likeText = likeText + ` ( ${data.totalLikes} )`;
				let dislikeText = `💔 Dislike ( ${data.totalDislikes} )`;

				likeBtn.innerHTML = likeText;
				dislikeBtn.innerHTML = dislikeText;
			})
			.catch((e) => {
				console.log(e);
				alert(e.response.data.error);
			});
	});

	dislikeBtn.addEventListener("click", function (e) {
		let postId = likeBtn.dataset.post;
		reqLikeDislike("dislikes", postId)
			.then((res) => res.json())
			.then((data) => {
				let dislikeText = data.disliked ? "💔 Disliked" : "💔 Dislike";
				dislikeText = dislikeText + ` ( ${data.totalDislikes} )`;
				let likeText = `🧡 Like ( ${data.totalLikes} )`;

				likeBtn.innerHTML = likeText;
				dislikeBtn.innerHTML = dislikeText;
			})
			.catch((e) => {
				console.log(e);
				alert(e.response.data.error);
			});
	});
};

function generateRequest(url, method, body) {
	let headers = new Headers();
	headers.append("Accept", "Application/JSON");
	headers.append("Content-Type", "Application/JSON");

	let req = new Request(url, {
		method,
		headers,
		body: JSON.stringify(body),
		mode: "cors",
	});

	return req;
}

function createComment(comment) {
	let innerHTML = `
	<a href="/author/${comment.user._id}" class="sm-details">
    	<img style="width:49px; height:49px" src="${comment.user.profilePics}" class="rounded-circle mx-3 my-3">
    </a>
	<div class="media-body pe-3 my-3">
		<a href="/author/${comment.user._id}">
			<span>${comment.user.username}</span>
		</a>
        <p>${comment.body}</p>
        <div class="my-3 reply-base">
            <input class="form-control" type="text" placeholder="Press Enter to Reply" name="reply" data-comment=${comment._id} />
        </div>
    </div>
    `;
	let div = document.createElement("div");
	div.className = "media border";
	div.innerHTML = innerHTML;

	return div;
}

function createReplyElement(reply, user) {
	let innerHTML = `
		<a href="/author/${reply.user}" class="sm-details">
        	<img style="width:44px; height:44px" src="${reply.profilePics}" alt="rep_profile" class="align-self-start rounded-circle">
		</a>
        <div class="media-body">
			<a href="/author/${reply.user}">
				<span>${user}</span>
			</a>
            <p>${reply.body}</p>
        </div>
    `;

	let div = document.createElement("div");
	div.className = "media mt-3";
	div.innerHTML = innerHTML;

	return div;
}

function reqLikeDislike(type, postId) {
	let headers = new Headers();
	headers.append("Accept", "Application/JSON");
	headers.append("Content-Type", "Application/JSON");

	let req = new Request(`/api/${type}/${postId}`, {
		method: "GET",
		headers,
		mode: "cors",
	});

	return fetch(req);
}
