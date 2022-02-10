window.onload = function () {
	const comment = document.getElementById("comment");
	const commentHolder = document.getElementById("comment-holder");

	comment.addEventListener("keypress", function (e) {
		if (e.key === "Enter") {
			if (e.target.value) {
				let postId = comment.dataset.post;
				console.log(postId);
				let data = {
					body: e.target.value,
				};
				let req = generateRequest(`/api/comments/${postId}`, "POST", data);
                console.log(req);
                console.log(`/api/comments/${postId}`);
				fetch(req)
					.then((res) => res.json())
					.then((data) => {
						let commentElement = createComment(data); ////////////////
						commentHolder.insertBefore(commentElement, commentHolder.children[0]);
						e.target.value = "";
					})
					.catch((err) => {
						console.error(err);
					});
			} else {
				alert("Enter a valid comment!");
			}
		}
	});
};

function generateRequest(url, method, body) {
	let headers = new Headers();
	headers.append("Accept", "Application/JSON");
	headers.append("Content-Type", "Application/JSON");

	let req = new Request(url, {
		method,
		mode: "cors",
		headers,
		body: JSON.stringify(body),
	});
	return req;
}

function createComment(comment) {
	console.log(comment);
	let innerHTML = `
    <img src="${comment.user.profilePics}" class="rounded-circle mx-3 my-3" style="width:40px;">
    <div class="media-body my-3">
        <p>${comment.body}</p>

        <div class="my-3">
            <input class="form-control" type="text" placeholder="Press Enter to Reply" name="reply" data-comment=${comment._id} />
        </div>
    </div>
    `;
	let div = document.createElement("div");
	div.className = "media border";
	div.innerHTML = innerHTML;

	return div;
}

function createReplyElement(reply) {
	let innerHTML = `
        <img style="width:40px;"
            src="${reply.profilePics}" 
            class="align-self-start mr-3 rounded-circle">
        <div class="media-body">
            <p>${reply.body}</p>
        </div>
    `;

	let div = document.createElement("div");
	div.className = "media mt-3";
	div.innerHTML = innerHTML;

	return div;
}
