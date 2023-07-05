const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const filterSelect = document.getElementById('filter');

function addTask() {
    if(inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement('span');
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        let time = document.createElement('p');
        time.innerHTML = getCurrentTime();
        li.appendChild(time);
    }
    inputBox.value = '';
    saveData();
}

listContainer.addEventListener('click', function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if(e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Add leading zeros to minutes if needed
    minutes = minutes < 10 ? "0" + minutes : minutes;

    return hours + ":" + minutes + " " + ampm;
}

filterSelect.addEventListener('change', filterTasks);

function filterTasks() {
    const selectedOption = filterSelect.value;
    const tasks = Array.from(listContainer.getElementsByTagName('li'));

    tasks.forEach(task => {
        if (selectedOption === 'all') {
            task.style.display = 'block';
        } else if (selectedOption === 'pending' && task.classList.contains('checked')) {
            task.style.display = 'none';
        } else if (selectedOption === 'executed' && !task.classList.contains('checked')) {
            task.style.display = 'none';
        } else {
            task.style.display = 'block';
        }
    });
}