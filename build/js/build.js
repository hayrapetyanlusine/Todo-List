/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

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
/***/ ((module) => {

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