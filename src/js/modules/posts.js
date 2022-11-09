module.exports = function actions(parent, postText) {
    const post = document.createElement("div");
    const complated = document.createElement("div");
    const change = document.createElement("div");
    const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
    const p = document.createElement("p");
    const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
    const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";

    parent.append(post);
    post.append(complated);
    post.append(change);
    complated.append(checkbox);
    complated.append(p);
    change.append(editBtn);
    change.append(delBtn);

    post.classList.add("post");
    complated.classList.add("complated");
    change.classList.add("change");
    editBtn.classList.add("edit");
    delBtn.classList.add("del");

    p.textContent = postText;
}