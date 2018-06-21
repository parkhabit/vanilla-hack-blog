function callApi(url) {   
    var xhr = new XMLHttpRequest();
    var obj;

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if (xhr.status == 200){
                obj = JSON.parse(xhr.responseText);
                paintPage(obj)
            } else {
                console.log('Error: ' + xhr.status)
            }
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
}

callApi('https://jsonplaceholder.typicode.com/posts/');

function paintPage(blogData) {
    var domField = document.getElementById('blog-content');
    for (var i=0; i < blogData.length; i++) {
        var container = document.createElement('div');

        var titleContainer = document.createElement('h3');
        var userIdContainer = document.createElement('span');
        var bodyContainer = document.createElement('p');

        var titleText = document.createTextNode(blogData[i].title.charAt(0).toUpperCase() + blogData[i].title.slice(1));
        var userIdText = document.createTextNode('Written by user ' + blogData[i].userId);
        var bodyText = document.createTextNode(blogData[i].body.charAt(0).toUpperCase() + blogData[i].body.slice(1));

        titleContainer.appendChild(titleText);
        userIdContainer.appendChild(userIdText);
        bodyContainer.appendChild(bodyText);

        bodyContainer.classList.add('displayNone');

        container.appendChild(titleContainer);
        container.appendChild(bodyContainer);
        container.appendChild(userIdContainer);


        container.id = blogData[i].id;

        hideOrDisplay(container);
        hover(container);

        domField.appendChild(container);
    }
}


function hideOrDisplay(effectedDiv) {
    effectedDiv.addEventListener('click', function(e) {
        var containerChildren = effectedDiv.childNodes;
        containerChildren[1].classList.toggle('displayNone');
    })
}

function hover(effectedDiv) {
    effectedDiv.addEventListener('mouseover', function(e) {
        effectedDiv.classList.add('highlightedBackground')
    })
    effectedDiv.addEventListener('mouseout', function(e) {
        effectedDiv.classList.remove('highlightedBackground')
    })
}