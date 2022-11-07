let profile = ''
let profileDetails = null;
let repos = [];
let followers = [];
let following = [];

async function fetchProfileDetails() {
    profile = document.getElementById("search-bar").value;
    const response = await fetch(`https://api.github.com/users/${profile}`)
    const data = await response.json();
    console.log(data)
    profileDetails = data;
    fetchUserRepos();
    fetchUserFollowers();
    fetchUserFollowing();
    document.getElementById('followers').innerHTML = data.followers;
    document.getElementById('repos').innerHTML = data.public_repos;
    document.getElementById('following').innerHTML = data.following;
    document.getElementById('about').innerHTML = data.bio;
    document.getElementById('user-url').setAttribute("href", `${data.html_url}`);
    document.getElementById('username').innerHTML = data.name;
    document.getElementById('handle').innerHTML = data.company;
    document.getElementById('location').innerHTML = data.location;
    document.getElementById('user-image').setAttribute("src", `${data.avatar_url}`);

    const _element = document.getElementById("lod")
    if (profile==""){
        _element.innerHTML = "Enter correct user name"
        _element.style.display = "block";
        _element.style.color = "red";
    }else _element.style.display = "block";
}

async function fetchUserRepos () {
    const response = await fetch(`https://api.github.com/users/${profile}/repos`)
    const data = await response.json();
    repos = data;
    let output;
    let element = document.getElementById("projects");
    
    repos.forEach(function(repo){
        if(output==undefined){
            output=" "
        }else output +=  `<li>${repo.name}</li>`
    })
    console.log(output)
    element.innerHTML = output;
}

async function fetchUserFollowers () {
    const response = await fetch(`https://api.github.com/users/${profile}/followers`)
    const data = await response.json();
    followers = data;
}

async function fetchUserFollowing () {
    const response = await fetch(`https://api.github.com/users/${profile}/following`)
    const data = await response.json();
    following = data;
}

