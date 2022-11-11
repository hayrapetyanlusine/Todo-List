/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/delete.js":
/*!**********************************!*\
  !*** ./src/js/modules/delete.js ***!
  \**********************************/
/***/ ((module) => {

module.exports = function(url, name) {

    async function deleteAction(url, name) {
        const id = await fetch(url)
            .then(data => data.json())
            .then(data => {
                const filteredAction = data.filter(action => action.action === name)
                return filteredAction[0].id;
            });

        await fetch(`${url}/${id}`, {
            method: "delete"
        })
    }
    
    deleteAction(url, name)
        .then(() => console.log("done"))
        .catch(() => console.log("server error"))     
}

/***/ }),

/***/ "./src/js/modules/get.js":
/*!*******************************!*\
  !*** ./src/js/modules/get.js ***!
  \*******************************/
/***/ ((module) => {

module.exports = function(param, posts) {
    fetch(param)
        .then(data => data.json())
        .then(data => {
            data.forEach(post => {
                posts(document.querySelector("#posts"), post.action);
            });
    })
}

/***/ }),

/***/ "./src/js/modules/posts.js":
/*!*********************************!*\
  !*** ./src/js/modules/posts.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const del = __webpack_require__(/*! ./delete */ "./src/js/modules/delete.js");
const put = __webpack_require__(/*! ./put */ "./src/js/modules/put.js");
const DB_URL = "http://localhost:3000/actions";

module.exports = function actions(parent, postText) {
    const post = document.createElement("div");
    const complated = document.createElement("div");
    const change = document.createElement("div");
    const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
    const inp = document.createElement("input");
        inp.setAttribute("type", "text");
        inp.setAttribute("class", "new-text");
    const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
    const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";

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
    complated.append(checkbox);
    complated.append(inp);
    change.append(editBtn);
    change.append(delBtn);

    post.classList.add("post");
    complated.classList.add("complated");
    change.classList.add("change");
    editBtn.classList.add("edit");
    delBtn.classList.add("del");

    inp.value = postText;
}

/***/ }),

/***/ "./src/js/modules/put.js":
/*!*******************************!*\
  !*** ./src/js/modules/put.js ***!
  \*******************************/
/***/ ((module) => {

module.exports = function(url, name, newText) {

    async function changeAction(url, name, newText) {
        const id = await fetch(url)
            .then(data => data.json())
            .then(data => {
                const filteredAction = data.filter(action => action.action === name)
                return filteredAction[0].id;
            });

        await fetch(`${url}/${id}`, {
            method: "put",
            headers: {
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                action: newText
            })
        })
    }
    
    changeAction(url, name, newText)
        .then(() => console.log("done"))
        .catch((err) => console.log(`server error${err}`))     
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
const actions = __webpack_require__(/*! ./modules/posts */ "./src/js/modules/posts.js");
const get = __webpack_require__(/*! ./modules/get */ "./src/js/modules/get.js");

const form = document.getElementById("form");
const input = document.querySelector(".input");

const DB_URL = "http://localhost:3000/actions";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const inpVal = input.value.trim();

    if (inpVal !== "") {
        const formData = new FormData(form);
        const data = JSON.stringify(Object.fromEntries(formData.entries()));

        async function action(DB_URL, data) {
            await fetch(DB_URL, {
                method: "POST",
                headers: {
                    "content-type" : "application/json"
                },
                body: data
            })
        }
    
        action(DB_URL, data)
            .then(() => console.log("done"))
            .catch(() => console.log("server error"))   
    }
})

try{
    get(DB_URL, actions)
} catch(err) {
    console.log(`get error ${err}`);
}
})();

/******/ })()
;
//# sourceMappingURL=build.js.map