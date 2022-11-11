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