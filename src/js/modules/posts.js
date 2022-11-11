const del = require("./delete");
const put = require("./put");
const DB_URL = "http://localhost:3000/actions";

module.exports = function actions(parent, postText) {
    const post = document.createElement("div");
    const complated = document.createElement("div");
    const change = document.createElement("div");
    const hr = document.createElement("hr");
        hr.setAttribute("class", "del-line");
    const inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.setAttribute("class", "new-text");
    const doneBtn = document.createElement("button");
        doneBtn.innerText = "Done";
    const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
    const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";

    doneBtn.addEventListener("click", () => {
        hr.classList.toggle("active");
    })
    editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        inp.focus();

        inp.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                inp.blur();
                put(DB_URL, postText, inp.value);
            }
        })
    })
    delBtn.addEventListener("click", () => {
        del(DB_URL, postText);
    })

    parent.append(post);
    post.append(complated);
    post.append(change);
    complated.append(hr);
    complated.append(inp);
    change.append(doneBtn);
    change.append(editBtn);
    change.append(delBtn);

    post.classList.add("post");
    complated.classList.add("complated");
    change.classList.add("change");
    doneBtn.classList.add("done");
    editBtn.classList.add("edit");
    delBtn.classList.add("del");

    inp.value = postText;
}