class Statistics {
    constructor(created = 0, finished = 0, removed = 0) {
        let _created = created;
        let _finished = finished;
        let _removed = removed;

        this.getCreated = () => _created;
        this.setCreated = (value) => _created = value;

        this.getFinished = () => _finished;
        this.setFinished = (value) => _finished = value;

        this.getRemoved = () => _removed;
        this.setRemoved = (value) => _removed = value;

    }

    updateStats(tasksList) {
        this.setCreated(tasksList.filter(task => task.status === 'created').length);
        this.setFinished(tasksList.filter(task => task.status === 'finished').length);
        this.setRemoved(tasksList.filter(task => task.status === 'removed').length);

        return [this.getCreated(), this.getFinished(), this.getRemoved()];
    }


}