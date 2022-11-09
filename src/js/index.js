const actions = require("./modules/posts");
const get = require("./modules/get");

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