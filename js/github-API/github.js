const userInfo = document.querySelector(".user-info")
const inputButton = document.querySelector(".button-input")
const userSearch = document.querySelector("#user-text")
const statsContainer = document.querySelector(".user-stats")
const socialMediaContainer = document.querySelector(".user-social-media")
const showUserContainer = document.querySelector(".information-container")
const userNotFoundContainer = document.querySelector(".user-not-found")

const defaultValue = "Ines"


function getData(value){

    fetch("https://api.github.com/users/" + value)
    .then(response => response.json())
    .then(response => {
        showData(response)
    })
}

function showNotFoundUser(){
    userNotFoundContainer.classList.add("show")
    showUserContainer.classList.remove("show")
}

function showData(data){
    if(data.message){
        showNotFoundUser()
    }
    else{
        userNotFoundContainer.classList.remove("show")
        showUserContainer.classList.add("show")
        setProfileInfo(data)
        setStats(data)
        setSocialMedia(data)
    }    
}

function arrangeDate(date){
    const newDate = date.split("-")
    const year = newDate[0]
    const month = newDate[1]
    const day = newDate[2].slice(0,2)

    var months = [ "Janu", "Feb", "Mar", "Apr", "May", "June", 
           "July", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    var selectedMonthName = months[parseInt(month)]; 
    
    return "Created " + day + " " + selectedMonthName + " " + year
}

function setProfileInfo(data){
    let imgNode = userInfo.childNodes[1]
    imgNode.src = data[imgNode.dataset.info]

    userInfo.childNodes[3].childNodes.forEach((node) => {
        if(node.nodeName == "#text") return 
        
        //Date
        if(node.dataset.info == "created_at")
            node.innerHTML = arrangeDate(data[node.dataset.info])
        else if (node.dataset.info == "login")
            node.innerHTML = "@" + data[node.dataset.info]
        else
            node.innerHTML = data[node.dataset.info]
    })
}

function setStats(data){
    statsContainer.childNodes.forEach((node) => {
        if(node.nodeName == "#text") return 

        if(node.dataset.result)
            node.innerHTML = data[node.dataset.result]

    })
}

function setSocialMedia(data){
    socialMediaContainer.childNodes.forEach((node) => {
        if(node.nodeName == "#text") return    

        if(data[node.dataset.social] == null){
            node.firstChild.innerHTML = "Not Available"  
            node.firstChild.classList.add("not-found")
        }  
        else{
            //Hiperlink to blog
            if( node.dataset.social == "blog")
                node.firstChild.href = data[node.dataset.social] 
                
            node.firstChild.innerHTML = data[node.dataset.social] 
            node.firstChild.classList.remove("not-found")
        }   
    })
}

getData(defaultValue)


inputButton.addEventListener("click",() => getData((userSearch.value)))