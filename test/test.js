let tags = "tag1, tag2, tag3";

tags = tags.split(",");
let modTags = [];
tags.map((value) => value.trim());

console.log(tags);

function getAge(...args) {
    console.log(typeof args);
}

getAge(21);

function test() {
    console.log("demo");
}

test.did = "x";