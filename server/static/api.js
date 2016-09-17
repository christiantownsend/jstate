/**
 * Created by Trase on 7/30/2016.
 */


axios.get('/api/main').then( function (response) {
    console.log(response);
});

/* TODO:
update document: DONE
    this should be done by having ids on all important pieces, then on a update document have an onclick function
    Pieces: title, content, meta

create document: DONE
    this should be done by having ids on all important pieces, then on a update document have an onclick function
    Pieces: title, content, meta

update document: DONE
    old title, new title, content, meta

delete document: DONE

login: DONE
    ids on username, and password

logout: DONE
    just a post request

logged: DONE

create/delete user

update password

get users

get posts by a user

get main: DONE

get post

delete post: DONE

get urls

base64 upload

viewrequest
 */

function getcontent(id) {
    var content = document.getElementById(id);
    if (content.innerText == '')
        return content.value;
    return content.innerText;
}

function geturl() {
    return window.location.href.split('/').pop();
}

function login() {
    var username = getcontent('username');
    var password = getcontent('password');
    var returned = false;
    return axios.post('/api/login', {
        name: username,
        password: password
    }).then( function (response) {
        console.log(response.data);
        returned = response.data
    });


}


function logout() {
    return axios.post('/api/logout', {})
}

function logged() {

    return axios.get('/api/logged');
}

function getAllPosts() {
    return axios.get('/api/main');
}



function test(div) {
    content = getcontent('test');
    console.log(content);
    if (content == '')
        console.log('etst');
}


function startedit() {
    var oldtitle = document.createElement('span');
    oldtitle.setAttribute('id', 'oldtitle');
    oldtitle.setAttribute('style', 'display:none;');
    oldtitle.innerText = 'testtitle';
    document.body.appendChild(oldtitle);
}

function createpost() {
    var title = getcontent('title');
    var content = getcontent('content');
    var meta = getcontent('meta');

    axios.post('/api/post', {title: title, content: content, meta: meta}).then( function (response) {
        console.log(response.data);
        window.location = '/post/' + response.data.url;
    });
}

function updatepost(url, redirect) {
    var title = getcontent('title');
    var content = getcontent('content');
    var meta = getcontent('meta');


    return axios.put('/api/post/' + url, {title: title, content: content, meta: meta}).then( function (response) {
        if (redirect && response.data != 'False')
            window.location = '/post/' + response.data;
        else {
            console.log(response.data);
            return response.data;
        }

    }).catch( function (response) {
        return false;
    });
}

function deletepost(url) {
    return axios.delete('/api/post/' + url).then( function (response) {return true;}).catch(function (response) {return false;});
}



















