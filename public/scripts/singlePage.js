window.onload = function () {
	const bookmarks = document.getElementsByClassName("bookmark");
	const likeBtn = document.getElementById("likeBtn");
	const dislikeBtn = document.getElementById("dislikeBtn");
	const comment = document.getElementById("comment");
	const commentHolder = document.getElementById("comment-holder");
	const reply = document.getElementById("reply");

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
				let user = reply.dataset.user;
				console.log(user);
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
							alert(e.message);
						});
				} else {
					alert("Please Enter A Valid Reply");
				}
			}
		}
	});

	likeBtn.addEventListener("click", function (e) {
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
	<div class="media-body w-100 pe-3 my-3">
		<a class="d-flex justify-content-between w-100" href="/author/${comment.user._id}">
			<span>${comment.user.username}</span>
			<span class="text-muted">a few seconds ago</span>
		</a>
        <p style="width: 100%">${comment.body}</p>
        <div class="my-3 reply-base">
            <input class="form-control" type="text" placeholder="Press Enter to Reply" name="reply" data-comment=${comment._id} />
        </div>
    </div>
    `;
	let div = document.createElement("div");
	div.className = "media border w-100";
	div.innerHTML = innerHTML;

	return div;
}

function createReplyElement(reply, user) {
	let innerHTML = `
		<a href="/author/${reply.user}">
			<img src="${reply.profilePics}" class="align-self-start rounded-circle" style="width: 44px; height: 44px" alt="rep_profile">
		</a>
		<div class="media-body">
			<a class="w-100 d-flex justify-content-between" href="/author/${reply.user}">
				<span>${user}</span>
				<span class="text-muted d-flex">
					a few seconds ago
				</span>
			</a>
			<p>${reply.body}</p>
		</div>
    `;

	let div = document.createElement("div");
	div.className = "media mt-3 w-100 gap-14";
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
