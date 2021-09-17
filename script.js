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

    //получение menu-main
    let getMainMenu = document.querySelector('.menu-main');
    //создание формы
    let formAddUser = new FormAdd(getMainMenu);
    formAddUser.createForm();
    //создание ul для списка
    let contentListUsers = new ContentList(getMainMenu);
    contentListUsers.createContentList();


    //получение menu-notes
    let getNotesMenu = document.querySelector('.menu-notes');
    //создание формы
    let formAddNote = new FormAdd(getNotesMenu);
    formAddNote.createForm();
    //создание search
    let searchForm = new SearchForm(getNotesMenu);
    searchForm.createSearch();
    //создание ul для списка
    let contentListNotes = new ContentList(getNotesMenu);
    contentListNotes.createContentList();

    //получение menu-note
    let getMenuNote = document.querySelector('.menu-note');
    // создание noteName
    let noteName = new NoteName(getMenuNote);
    noteName.createNoteName();
    // создание noteForm
    let noteForm = new NoteForm(getMenuNote);
    noteForm.createNoteForm();

    let users = []; //массив юзеров
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
    //создание user
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
        console.log(users);
        showUsers(users);
    };
    //создание note
    click.addEventListener('click', ()=> addNote(event, 0));
    function addNote (event, i) {
        if (!event.target.matches('.menu-notes .form-add')) return;
        let name = document.querySelector('.menu-notes .form-name');
        if (name.value.trim() === '') {
            alert('Entered name');
            return;
        }
        users[i].notes.push(new Note(name.value));
        name.value = null;
        console.log(users[i].notes);
    };

    let contentListMain = document.querySelector('.menu-main .content-list');
    function showUsers(users) {
        contentListMain.innerHTML = '';
        let userItem = users.map((element, index) =>
            new ContentItem(contentListMain, element.name, index).createContentItem());
        contentListMain.append(...userItem);
        console.log(activeUser);
    };

    let activeUser;
    click.addEventListener('click', ()=> {
        if (!event.target.matches('.menu-main .content-item-name')) return;
        let index = event.target.parentNode.dataset.index;
        activeUser = users[index];
    });


})