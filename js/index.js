document.querySelector('#repo').addEventListener('click', search)
document.querySelector('#user').addEventListener('click', search)

function search(e){
    const form= document.querySelector('#github-form')
    let val = form.search.value
    if(val !== ""){
        document.getElementById('user-list').innerHTML = ""
        switch(e.target.name){
            case "search_users": {
                goFetch(`search/users?q=${val}`, 0)
                break
            }
            case "search_repos": {
                goFetch(`users/${val}/repos`, 1)
                break
            }
        }
        form.reset()
    }
    else {
        window.alert("Fill the form")
    }
}

function goFetch(url, searchType){
    fetch(`https://api.github.com/${url}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/vnd.github.v3+json"
        }
    })
    .then(response => response.json())
    .then(obj => {
        switch(searchType){
            case 0: {
                displayUsers(obj.items)
                break}
            case 1: {displayRepos(obj)
                console.log(obj)
                break}
        }
    })
    .catch(()=> window.alert("There was a problem with the Server"))
}

function displayUsers(results){
    results.forEach(e => {
        const listItem = document.createElement('li')
        const a = document.createElement('a')
        const image = document.createElement('img')
        const name = document.createElement('h3')
        name.addEventListener('mouseover', e => {
            e.target.style.textDecoration = "underline"
            document.body.style.cursor = "pointer"
         })
        name.addEventListener('mouseleave', e => {
            e.target.style.textDecoration = ""
            document.body.style.cursor = "default"})
        name.addEventListener('click', e => goFetch(`users/${e.target.innerText}/repos`, 1))
        a.href = e.html_url
        name.innerText = e.login
        image.src = e.avatar_url
        image.alt = e.login
        a.append(image)
        listItem.append(name, a)
        document.getElementById('user-list').append(listItem)
    } )
    
}

function displayRepos(results){
    document.getElementById('user-list').innerHTML = ""
    results.forEach(e => {
        const listItem = document.createElement('li')
        const a = document.createElement('a')
        a.href = e.html_url
        a.innerText = e.name
        listItem.append(a)
        document.getElementById('repos-list').append(listItem)
    })

}