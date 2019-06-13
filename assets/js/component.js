var ajax = {}, db = {}

// AJAX GET
ajax.get = function(url, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status != 200) return;
    
            // Muat daftar tautan menu
            callback(xhttp.responseText)
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

// AJAX POST

// DB NAV
db.nav = {}

// DB NAV TEMPLATE 
db.nav.template = function(item) {
    let 
        li = document.createElement("li"),  
        a = document.createElement("a")
    
    a.appendChild(document.createTextNode(item.text))
    a.setAttribute("href", item.href)
    li.appendChild(a)
    return li
}

// DB NAV DATA
db.nav.data = [
    {href: "#vertebrata", text: "Vertebrata"},
    {href: "#avertebrata", text: "Avetebrata"},
    {href: "#about", text: "About"},
    {href: "#contact-us", text: "Contact Us"}
]