class List {
    constructor(title) {
        this.title = title;
        this.tasksList = [];
        this.listStatistics = new Statistics();

        this.titleH1 = document.querySelector('.title h1');
        this.changeTitleBtn = document.querySelector('.titleChange');
        this.statsSpans = [...document.querySelectorAll('.number')];
        this.input = document.getElementById('taskContent');
        this.select = document.getElementById('importantLevels');
        this.createBtn = document.querySelector('.createTask');
        this.ul = document.querySelector('.list ul');

        this.changeTitleBtn.addEventListener('click', this.changeTitle.bind(this));
        this.createBtn.addEventListener('click', this.addTask.bind(this));

        this.render();
    }

    render(title = 'New List', taskList = [], currentStats = this.listStatistics.getStatistics()) {
        this.titleH1.textContent = title;

        this.ul.textContent = "";
        if (taskList.length > 4) this.ul.classList.add('scroll-active');
        else this.ul.classList.remove('scroll-active');
        taskList.forEach((task, index) => {
            if (task.getStatus() === 'created' || task.getStatus() === 'finished') {
                const li = document.createElement('li');
                li.dataset.number = index;
                if (task.getStatus() === 'finished') {
                    li.dataset.finished = "1";
                    li.style.backgroundColor = "rgb(45, 204, 112)";
                } else li.dataset.finished = "0";

                const div = document.createElement('div');
                const p = document.createElement('p');
                p.textContent = task.content;
                if (task.getStatus() === 'finished') p.style.textDecoration = 'line-through';

                const span = document.createElement('span');
                span.classList.add('priority');
                span.classList.add(`${task.importantLevel}`);

                switch (task.importantLevel) {
                    case 'normal':
                        span.textContent = '[Normal]';
                        break;
                    case 'important':
                        span.textContent = '[Important]';
                        break;
                    case 'vimportant':
                        span.textContent = '[Very-Important]';
                        break;
                }

                const editBtn = document.createElement('button');
                editBtn.classList.add('edit');
                editBtn.textContent = 'Edit';
                editBtn.addEventListener('click', (e) => {
                    const newTaskTitle = prompt('Type new title for this task', 'New task title');
                    if (newTaskTitle != "") {
                        const p = (e.target.parentNode.parentNode).querySelector('p');
                        p.textContent = newTaskTitle;
                    } else throw new Error('Empty value');
                });
                if (task.getStatus() === 'finished') editBtn.classList.toggle('off');

                const removeBtn = document.createElement('button');
                removeBtn.classList.add('remove');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', (e) => {
                    const li = e.target.parentNode.parentNode;
                    const taskNumber = li.dataset.number;

                    // this.tasksList.splice(taskNumber, 1);
                    this.tasksList[taskNumber].setStatus('removed');
                    this.listStatistics.updateStats(this.tasksList);
                    this.render(this.title, this.tasksList);
                });

                const completeBtn = document.createElement('button');
                completeBtn.classList.add('complete');
                completeBtn.textContent = 'Complete';
                completeBtn.addEventListener('click', (e) => {
                    const continueBtn = e.target;
                    const li = e.target.parentNode.parentNode;
                    const editBtn = li.querySelector('.edit');
                    const p = li.querySelector('p');
                    const taskNumber = li.dataset.number;

                    if (li.dataset.finished === "0") {
                        continueBtn.textContent = 'Continue';
                        li.dataset.finished = "1";
                        li.style.backgroundColor = "rgb(45, 204, 112)";
                        editBtn.classList.toggle('off');
                        p.style.textDecoration = 'line-through';
                        this.tasksList[taskNumber].setStatus('finished');
                        this.listStatistics.updateStats(this.tasksList);
                    } else {
                        continueBtn.textContent = 'Complete';
                        li.dataset.finished = "0";
                        li.style = "";
                        editBtn.classList.toggle('off');
                        p.style = "";
                        this.tasksList[taskNumber].setStatus('created');
                        this.listStatistics.updateStats(this.tasksList);
                    }

                    this.render(this.title, this.tasksList);
                });

                div.appendChild(span);
                div.appendChild(editBtn);
                div.appendChild(removeBtn);
                div.appendChild(completeBtn);

                li.appendChild(div);
                li.appendChild(p);

                this.ul.appendChild(li);
            }
        });

        const stats = currentStats;
        this.statsSpans.forEach((stat, index) => stat.textContent = `${stats[index]}`);
    }

    changeTitle() {
        const newTitle = prompt('Type new title for this list', 'New Title');
        // const oldTitle = this.title;
        if (newTitle != "") {
            this.title = newTitle;
            this.render(newTitle, this.tasksList, this.listStatistics.getStatistics());
            // return [oldTitle, newTitle];
        } else throw new Error('Empty value');
    }

    addTask() {
        const importantLevel = this.select.options[this.select.selectedIndex].value;

        if (this.input.value != "") {
            const content = this.input.value;
            const newTask = new Task(importantLevel, content);
            this.tasksList.push(newTask);
            this.listStatistics.updateStats(this.tasksList);
            this.render(this.title, this.tasksList, this.listStatistics.getStatistics());
            this.input.value = "";
            document.getElementById('importantLevels').selectedIndex = 0;
            // return this.tasksList;
        } else throw new Error('Empty value');
    }
}