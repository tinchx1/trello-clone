const addBoardBtn = document.querySelectorAll('.add-board-btn');
const boardForm = document.getElementById('board-form');
const newBoardForm = document.getElementById('new-board-form');
const boardSection = document.querySelector('.board-section');
const boardsList = document.getElementById('boards-list');

let openForm = null; // Variable para almacenar el formulario abierto actualmente

// Evento de clic en el botón de agregar tablero
addBoardBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        // Mostrar el formulario para agregar tablero
        boardForm.style.display = 'block';
    });
});

// Evento de envío del formulario para agregar tablero
newBoardForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    const boardName = document.getElementById('board-name').value;
    if (boardName.trim() !== '') {
        createBoard(boardName); // Crear el nuevo tablero
        boardForm.style.display = 'none'; // Ocultar el formulario después de crear el tablero
        newBoardForm.reset(); // Limpiar el formulario
    } else {
        alert('Por favor, ingresa un nombre para el tablero.');
    }
});


function createBoard(boardTitle) {
    // Eliminar la clase 'selected' de todos los tableros existentes
    const allBoardItems = document.querySelectorAll('.board-item');
    allBoardItems.forEach(item => {
        item.classList.remove('selected');
    });

    // Crear contenedor del tablero
    const boardContainer = document.createElement('div');
    boardContainer.classList.add('board');

    // Crear el botón de eliminar el tablero
    const deleteBoardBtn = document.createElement('button');
    deleteBoardBtn.classList.add('delete-board-btn');
    deleteBoardBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Ícono de basura para eliminar el tablero

    // Crear el elemento de lista de tableros y agregar el botón de eliminar al final
    const boardItem = document.createElement('li');
    boardItem.textContent = boardTitle;
    boardItem.classList.add('board-item');
    boardItem.appendChild(deleteBoardBtn);

    // Crear encabezado del tablero
    const boardHeader = document.createElement('header');
    boardHeader.classList.add('board-header');
    boardHeader.innerHTML = `
        <h2>${boardTitle}</h2>
        <button class="add-list-btn">+ Añadir Lista</button>
    `;

    // Agregar evento de clic para eliminar el tablero
    deleteBoardBtn.addEventListener('click', function() {
        if (confirm('¿Seguro que quieres eliminar el tablero?')) {
            boardsList.removeChild(boardItem); // Eliminar el tablero de la lista
            boardSection.removeChild(boardContainer); // Eliminar el tablero del espacio de trabajo
        }
    });

    // Agregar evento de clic para agregar una nueva lista al tablero
    boardHeader.querySelector('.add-list-btn').addEventListener('click', function() {
        if (!openForm) {
            openForm = createForm('list', boardContainer); // Crear el formulario dentro del tablero
        }
    });

    // Agregar evento de clic para seleccionar el tablero
    boardItem.addEventListener('click', () => {
        // Remover la clase 'selected' de todos los tableros
        const allBoardItems = document.querySelectorAll('.board-item');
        allBoardItems.forEach(item => {
            item.classList.remove('selected');
        });

        // Añadir la clase 'selected' solo al tablero seleccionado
        boardItem.classList.add('selected');

        // Ocultar todos los tableros
        const allBoards = document.querySelectorAll('.board');
        allBoards.forEach(board => {
            board.style.display = 'none';
        });

        // Mostrar solo el tablero seleccionado
        boardContainer.style.display = 'block';

        // Al seleccionar un tablero, mostrar sus listas y tarjetas en la sección board-section
        displayBoardContent(boardContainer);
    });

    // Agregar el encabezado del tablero al contenedor del tablero
    boardContainer.appendChild(boardHeader);

    // Crear el contenedor de listas dentro del tablero

    // Agregar el tablero a la lista de tableros
    boardsList.appendChild(boardItem);

    // Agregar el tablero a la sección de tableros
    boardSection.appendChild(boardContainer);

    // Ocultar el contenido de todos los tableros
    const allBoards = document.querySelectorAll('.board');
    allBoards.forEach(board => {
        board.style.display = 'none';
    });

    // Mostrar el contenido del tablero recién creado
    boardContainer.style.display = 'block';
    boardItem.classList.add('selected'); // Marcar el tablero como seleccionado al crearlo
    displayBoardContent(boardContainer); // Mostrar su contenido

    // Agregar evento de clic para cerrar el formulario
    const closeFormBtn = newBoardForm.querySelector('.close-form-btn');
    closeFormBtn.addEventListener('click', function() {
        // Ocultar el formulario de crear un nuevo tablero al hacer clic en el botón de cerrar
        boardForm.style.display = 'none';
    });
}



function createForm(type, container) {
    const form = document.createElement('form');
    const inputPlaceholder = type === 'list' ? 'Introduce el título de la lista...' : 'Introduce el título de la tarjeta...';
    form.innerHTML = `
        <input type="text" placeholder="${inputPlaceholder}" required>
        <button type="submit">Añadir ${type === 'list' ? 'Lista' : 'Tarjeta'}</button>
        <button type="button" class="close-form-btn">&times;</button>
    `;
    form.classList.add('new-form'); // Agregar clase para el estilo CSS
    
    // Agregar evento de clic al botón de cerrar formulario
    const closeFormBtn = form.querySelector('.close-form-btn'); // Selección dentro del formulario creado
    closeFormBtn.addEventListener('click', () => {
        container.removeChild(form); // Eliminar el formulario
        openForm = null;
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = this.querySelector('input').value.trim();
        if (title !== '') {
            if (type === 'list') {
                createList(container, title);
            } else {
                createCard(container, title);
            }
            container.removeChild(form);
            openForm = null;
        } else {
            alert('Por favor, ingresa un título válido.');
        }
    });
    container.appendChild(form);
    return form;
}




// Función para crear una nueva lista en un tablero
// Función para crear una nueva lista en un tablero
function createList(container, listTitle) {
    const listContainer = document.createElement('div');
    listContainer.classList.add('list');

    // Crear el título de la lista
    const listHeader = document.createElement('header');
    listHeader.classList.add('list-header');
    listHeader.innerHTML = `
        <h3>${listTitle}</h3>
        <button class="delete-list-btn"><i class="fas fa-trash-alt"></i></button>
    `;
    listContainer.appendChild(listHeader);

    // Crear el contenedor de tarjetas
    const cardsContainer = document.createElement('div');
    cardsContainer.classList.add('cards-container');
    listContainer.appendChild(cardsContainer);

    // Crear el botón de agregar tarjeta
    const addCardBtn = document.createElement('button');
    addCardBtn.classList.add('add-card-btn');
    addCardBtn.textContent = '+ Añadir Tarjeta';
    listContainer.appendChild(addCardBtn);

    // Agregar evento de clic para agregar una nueva tarjeta a la lista
    addCardBtn.addEventListener('click', function() {
        if (!openForm) {
            openForm = createForm('card', cardsContainer);
        }
    });

    // Agregar evento de clic para eliminar la lista
    const deleteListBtn = listHeader.querySelector('.delete-list-btn');
    deleteListBtn.addEventListener('click', function() {
        if (confirm('¿Seguro que quieres eliminar la lista?')) {
            container.removeChild(listContainer); // Eliminar la lista del contenedor de tablero
        }
    });
    
    // Agregar la lista al contenedor de listas del tablero
    container.appendChild(listContainer);
}



// Función para crear una nueva tarjeta en una lista
// Función para crear una nueva tarjeta en una lista
function createCard(container, cardTitle) {
    const card = document.createElement('div');
    card.classList.add('card');
    const text = document.createElement('p')
    text.classList.add('card-text');
    text.textContent = cardTitle;

    // Crear el botón de eliminar tarjeta
    const deleteCardBtn = document.createElement('button');
    deleteCardBtn.classList.add('delete-card-btn');
    deleteCardBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Ícono de basura para eliminar la tarjeta
    
    
    card.appendChild(text);
    card.appendChild(deleteCardBtn);
    // Agregar evento de clic para eliminar la tarjeta
    deleteCardBtn.addEventListener('click', function() {
        if (confirm('¿Seguro que quieres eliminar la tarjeta?')) {
            container.removeChild(card); // Eliminar la tarjeta de la lista
        }
    });

    container.appendChild(card);
}


// Función para mostrar las listas y tarjetas correspondientes a un tablero en la sección board-section
function displayBoardContent(boardContainer) {
    // Ocultar todos los tableros en la sección de tableros
    const allBoards = document.querySelectorAll('.board');
    allBoards.forEach(board => {
        board.style.display = 'none';
    });

    // Mostrar el tablero seleccionado
    boardContainer.style.display = 'block';
}
