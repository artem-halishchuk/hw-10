//https://artem-halishchuk.github.io/hw-10/index.html
document.addEventListener("DOMContentLoaded", function() {
    class FormAdd {
        constructor(blockInsert) {
            this.blockInsert = blockInsert;
        }
        createForm() {
            let form = document.createElement('div');
            form.classList.add('form');
            this.blockInsert.append(form);

            let input = document.createElement('input');
            input.classList.add('input', 'form-name');
            form.append(input);

            let buttonAdd = document.createElement('button');
            buttonAdd.classList.add('button', 'form-add');
            buttonAdd.innerHTML = 'add';
            form.append(buttonAdd);
        }
    }
    class ContentList {
        constructor(blockInsert) {
            this.blockInsert = blockInsert;
        }
        createContentList() {
            let ul = document.createElement('ul');
            ul.classList.add('content-list');
            this.blockInsert.append(ul);
        }
    }
    class ContentItem {
        constructor(blockInsert, name, index) {
            this.blockInsert = blockInsert;
            this.name = name;
            this.index = index;
        }
        createContentItem() {
            let li = document.createElement('li');
            li.classList.add('content-item');
            this.blockInsert.append(li);

            let buttonShow = document.createElement('button');
            buttonShow.classList.add('content-item-name');
            buttonShow.innerHTML = this.name;
            li.append(buttonShow);

            let buttonDelete = document.createElement('button');
            buttonDelete.classList.add('delete');
            li.append(buttonDelete);

            li.dataset.index = this.index;
            return li;
        }
    }

    class SearchForm {
        constructor(blockInsert) {
            this.blockInsert = blockInsert;
        }
        createSearch() {
            let div = document.createElement('div');
            div.classList.add('form', 'search');
            this.blockInsert.append(div);
            let input = document.createElement('input');
            input.classList.add('input', 'form-search');
            div.append(input);
        }
    }

    class NoteName {
        constructor(blockInsert) {
            this.blockInsert = blockInsert;
        }
        createNoteName() {
            let input = document.createElement('input');
            input.classList.add('input', 'note-name');
            this.blockInsert.append(input);
        }
    }
    class NoteForm {
        constructor(blockInsert) {
            this.blockInsert = blockInsert;
        }
        createNoteForm() {
            let textarea = document.createElement('textarea');
            textarea.classList.add('input', 'note-form');
            this.blockInsert.append(textarea);
        }
    }

    //?????????????????? menu-main
    let getMainMenu = document.querySelector('.menu-main');
    //???????????????? ??????????
    let formAddUser = new FormAdd(getMainMenu);
    formAddUser.createForm();
    //???????????????? ul ?????? ????????????
    let contentListUsers = new ContentList(getMainMenu);
    contentListUsers.createContentList();


    //?????????????????? menu-note
    let getMenuNote = document.querySelector('.menu-note');
    // ???????????????? noteName
    let noteName = new NoteName(getMenuNote);
    noteName.createNoteName();
    // ???????????????? noteForm
    let noteForm = new NoteForm(getMenuNote);
    noteForm.createNoteForm();

    let users = []; //???????????? ????????????
    class User {
        constructor(name, id) {
            this.name = name;
            this.id = id;
            this.notes = [];
        }
    };
    class Note {
        constructor(name, note) {
            this.name = name;
            this.note = note;
        }
    };



    let click = document.querySelector('.app');
    //???????????????? user
    click.addEventListener('click', ()=> addUser(event));
    function addUser (event) {
        if(!event.target.matches('.menu-main .form-add')) return;
        let name = document.querySelector('.menu-main .form-name');
        if (name.value.trim() === '') {
            alert('Entered name');
            return;
        }
        users.push(new User(name.value));
        name.value = null;
        showUsers(users);
    };
    //?????????????????? ?????????????????? ??????????
    let activeUser;
    let activeUserIndex;
    click.addEventListener('click', ()=> changesActiveUser(event));
    function changesActiveUser(event) {
        if (!event.target.matches('.content-item-name')) return;
        let contentList = document.querySelector('.menu-main .content-list');
        contentList.childNodes.forEach(e => {
            e.firstChild.classList.remove('content-item-name-active');
        });
        event.target.classList.add('content-item-name-active');
        activeUserIndex = event.target.parentNode.dataset.index;
        activeUser = users[activeUserIndex];
        console.log(activeUser);
        showNotes(activeUserIndex);
    }

    //???????????????? note
    click.addEventListener('click', ()=> addNote(event, 0));
    function addNote (event, activeUser) {
        if (!event.target.matches('.menu-notes .form-add')) return;
        let name = document.querySelector('.menu-notes .form-name');
        if (name.value.trim() === '') {
            alert('Entered name');
            return;
        }
        users[activeUser].notes.push(new Note(name.value));
        name.value = null;
        //showNotes(activeUserIndex);
    };

    //???????????????????? ???????????? ?? ???????????? ???????? main
    let contentListMain = document.querySelector('.menu-main .content-list');
    function showUsers(users) {
        contentListMain.innerHTML = '';
        let userItem = users.map((element, index) =>
            new ContentItem(contentListMain, element.name, index).createContentItem());
        contentListMain.append(...userItem);
        if (activeUserIndex) {
            contentListMain.childNodes[activeUserIndex].firstChild.classList.add('content-item-name-active');
        }

    };

    //???????????????????? ?????????????? ?? ???????????? ???????? notes

    function showNotes(notes) {
        let contentListNotes = document.querySelector('.menu-notes .content-list');
        contentListNotes.innerHTML = '';
        let noteItem = notes.map((element, index) =>
            new ContentItem(contentListNotes, element.name, index).createContentItem());
        contentListNotes.append(...noteItem);
        // if (activeUserIndex) {
        //     contentListMain.childNodes[activeUserIndex].firstChild.classList.add('content-item-name-active');
        // }

    };

    //?????????????????????? ??????????????
    //click.addEventListener('click', ()=> showNotes(event, 0));
    function showNotes(activeUserIndex) {
        if (!activeUserIndex) return;
        let menuNotes = document.querySelector('.menu-notes');
        menuNotes.style.display = 'block';
        menuNotes.innerHTML = '';
        //?????????????????? menu-notes
        let getNotesMenu = document.querySelector('.menu-notes');
        //???????????????? ??????????
        let formAddNote = new FormAdd(getNotesMenu);
        formAddNote.createForm();
        //???????????????? search
        let searchForm = new SearchForm(getNotesMenu);
        searchForm.createSearch();
        //???????????????? ul ?????? ????????????
        let contentListNotes = new ContentList(getNotesMenu);
        contentListNotes.createContentList();


        let contentListNotes1 = document.querySelector('.menu-notes .content-list');
        contentListNotes1.innerHTML = '';
        let noteItem = users[activeUser].notes.map((element, index) =>
            new ContentItem(contentListNotes, element.name, index).createContentItem());
        contentListNotes1.append(...noteItem);
    }


    // click.addEventListener('click', ()=> {
    //     if (!event.target.matches('.menu-main .content-item-name')) return;
    //     let index = event.target.parentNode.dataset.index;
    //     activeUser = users[index];
    // });


})