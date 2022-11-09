module.exports = function(param, posts) {
    fetch(param)
        .then(data => data.json())
        .then(data => {
            data.forEach(post => {
                posts(document.querySelector("#posts"), post.action);
            });
    })
}