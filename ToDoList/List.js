class List {
    constructor(title) {
        this.title = title;
        this.tasksList = [];




        render();
    }

    render(title = 'New List', stats = [0, 0, 0]) {

    }

    changeTitle() {
        const newTitle = prompt('Type new title for this list', 'New Title');
        const oldTitle = this.title;
        if (newTitle != "") {
            this.title = newTitle;
            return [oldTitle, newTitle];
        } else throw new Error('Empty value');
    }

    addTask(importantLevelSelect, contentInput) {
        const importantLevel = importantLevelSelect.options[importantLevelSelect.selectedIndex];

        if (contentInput.value) {
            const content = contentInput.value;
            const newTask = new Task(importantLevel, content);
            this.tasksList.push(newTask);
            this.render();
            return this.tasksList;
        } else throw new Error('Empty value');
    }
}