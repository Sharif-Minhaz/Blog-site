window.onload = function () {
	const commentHolder = document.getElementById("comment-holder");

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

function createReplyElement(reply, user) {
	let innerHTML = `
		<a href="/author/${reply.user}" class="sm-details">
        	<img style="width:44px; height:44px" src="${reply.profilePics}" alt="rep_profile" class="align-self-start rounded-circle">
		</a>
        <div class="media-body">
			<a class="d-flex justify-content-between w-100" href="/author/${reply.user}">
				<span>${user}</span>
                <span class="text-muted">a few seconds ago</span>
			</a>
            <p>${reply.body}</p>
        </div>
    `;

	let div = document.createElement("div");
	div.className = "media mt-3 w-100";
	div.innerHTML = innerHTML;

	return div;
}
