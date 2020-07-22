class Task {
    constructor(importantLevel, content) {
        this.importantLevel = importantLevel;
        this.content = content;
        let _status = 'created';

        this.getStatus = () => _status;
        this.setStatus = (status) => _status = status;
    }

    editContent(newContent) {
        const oldContent = this.content;

        if (newContent != "") {
            this.content = newContent;
            return [oldContent, this.content];
        } else throw new Error('Content can not be empty');
    }

    completeTask() {
        if (this.getStatus() != 'finished') this.setStatus('finished');
        else throw new Error('This task is already finished');
    }
}