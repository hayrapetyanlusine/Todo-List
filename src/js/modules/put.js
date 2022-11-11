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