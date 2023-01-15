const bulletin = document.querySelector('.bulletin');
const createForm = document.querySelector('.create-form');
const createFormLink = document.querySelector('.create-form-link');
const viewDetailsPage = document.querySelector('.viewdetails');
const homePage = document.querySelector('.homepage');
const updatePage = document.querySelector('.update-page');

const newTitle = createForm.querySelector('.title');
const newDate = createForm.querySelector('.date');
const newAuthor = createForm.querySelector('.author');
const newBodyText = createForm.querySelector('.bodytext');

const viewingId = document.querySelector('#viewbox-id')
const viewingTitle = document.querySelector('#viewbox-title')
const viewingDatetime = document.querySelector('#viewbox-datetime')
const viewingAuthor = document.querySelector('#viewbox-author')
const viewingBodytext = document.querySelector('#viewbox-body')

const updateForm = updatePage.querySelector('.update-form');
const updatingTitle = updatePage.querySelector('.title');
const updatingDate = updatePage.querySelector('.date');
const updatingAuthor = updatePage.querySelector('.author');
const updatingBodytext = updatePage.querySelector('.bodytext');

const POSTS_KEY = 'posts';
const savedPosts = JSON.parse(localStorage.getItem(POSTS_KEY));
let posts = [];
let id = 0;




function savePosts(e) {                // preventDefault 해야되나? 해야되네
    e.preventDefault();
    const newPost = {
        id: ++id,
        title: newTitle.value,
        date: newDate.value,           // innerText로 뽑히나? value로 해야되네
        author: newAuthor.value,
        bodyText: newBodyText.value
    };
    newTitle.value = '';
    newDate.value = '';
    newAuthor.value = '';
    newBodyText.value = '';
    
    posts.push(newPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); 
    console.log(posts);
    renderPosts(posts.length - 1);
    location.href = '/';
}

function renderPosts(index) {
    const tr = document.createElement('tr');
    const tdNum = document.createElement('td');
    const tdTitle = document.createElement('td');
    const tdDate = document.createElement('td');
    const tdAuthor = document.createElement('td');
    const tdUpdate = document.createElement('td');
    const tdDelete = document.createElement('td');

    tdUpdate.innerHTML = `<a href="">update<div class="update-btn">${posts[index].id}</div></a>`;
    tdDelete.innerHTML = `<a href="">delete<div class="delete-btn">${posts[index].id}</div></a>`;
    tdTitle.innerHTML = `<a href="">${posts[index].title}<div class="overlap-check">${posts[index].id}</div></a>`;
    tdNum.innerText = posts[index].id;
    tdDate.innerText = posts[index].date;
    tdAuthor.innerText = posts[index].author;

    tr.append(tdNum, tdTitle, tdDate, tdAuthor,tdUpdate,tdDelete);
    bulletin.appendChild(tr);

    tr.style.textAlign = 'center';

    tdTitle.addEventListener('click', renderViewDetails);
    tdUpdate.addEventListener('click', openUpdateForm);
    tdDelete.addEventListener('click', deleteProcess);
}

function openCreateForm(e) {
    e.preventDefault();
    createForm.classList.toggle('hide-create-form');

}


function renderViewDetails(e) {
    e.preventDefault();
    homePage.classList.toggle('hide-homepage');
    viewDetailsPage.classList.toggle('hide-viewdetails');
    const targetDetails = posts.find(el => el.id === Number(e.target.children[0].innerText));
    viewingId.innerText = targetDetails.id;
    viewingTitle.innerText = targetDetails.title;
    viewingDatetime.innerText = targetDetails.date;
    viewingAuthor.innerText = targetDetails.author;
    viewingBodytext.innerText = targetDetails.bodyText;
}


function openUpdateForm(e) {
    e.preventDefault();
    const updatingPost = posts.find(el => el.id === Number(e.target.children[0].innerText));
    updatingTitle.value = updatingPost.title;
    updatingDate.value = updatingPost.date;
    updatingAuthor.value = updatingPost.author;
    updatingBodytext.innerText = updatingPost.bodyText;
    updatePage.classList.toggle('hide-update-form');
    updateForm.addEventListener('submit', (e) => updateProcess(e, updatingPost));
}


function updateProcess(e, updatingPost) {
    e.preventDefault();
    updatingPost.title = updatingTitle.value;
    updatingPost.date = updatingDate.value;
    updatingPost.author = updatingAuthor.value;
    updatingPost.bodyText = updatingBodytext.value;
    
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); 
    location.href = '/';
    
}

function deleteProcess (e) {
    e.preventDefault();
    const DeletingPost = posts.find(el => el.id === Number(e.target.children[0].innerText));
    posts = posts.filter(el => el !== DeletingPost);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); 
    location.href = '/';
}


createForm.addEventListener('submit', savePosts);
createFormLink.addEventListener('click', openCreateForm);




if (savedPosts !== null) {
    posts = savedPosts;
    for(let i = 0 ; i < posts.length ; i++) {
        renderPosts(i);
    }
    id = posts[posts.length - 1].id;
}