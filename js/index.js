const task_form = document.querySelector('#add-task');
const todos = document.querySelector('#todos');

let task_counter = 0;

function createTask(task) {
    const task_container = document.createElement('article');
    task_container.className = 'task';
    task_counter++;
    task_container.id = `task-${task_counter}`;

    task_container.innerHTML = `
    <div>
      <h3>Número de cheque: ${task.description}</h3>
      <h4>Banco: ${task.banco}</h4>
      <p>Plazo: ${task.deadline}</p>
    </div>
    <p class="${task.status.toLowerCase()}">${task.status}</p>
    <button id="btn-${task_counter}" class="btn-delete" type="button">Eliminar</button>`;

    todos.appendChild(task_container);

    const deleteButton = document.querySelector(`#btn-${task_counter}`);
    deleteButton.addEventListener('click', (e) => {
        const id = e.target.id.split('-')[1];
        document.querySelector(`#task-${id}`).remove();
    });
}

function loadInitialTasks() {
    fetch('/data/cheques.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(task => {
                const formattedTask = {
                    description: task["numero de cheque"],
                    banco: task.banco,
                    deadline: task.plazo,
                    status: task.estado
                };
                createTask(formattedTask);
            });
        })
        .catch(error => console.error('Error loading initial tasks:', error));
}

task_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = {
        description: e.target[0].value,
        banco: e.target[1].value,
        deadline: e.target[2].value,
        status: e.target[3].value
    };

    createTask(task);

    task_form.reset();
});

window.addEventListener('load', loadInitialTasks);

Swal.fire({
  title: 'Atención',
  text: 'Esta chequera es de uso personal e intransferible',
  icon: 'info',
  confirmButtonText: 'Aceptar'
});