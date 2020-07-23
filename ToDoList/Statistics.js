class Statistics {
    constructor(created = 0, removed = 0, finished = 0) {
        this.stats = [created, removed, finished];
    }

    getStatistics() {
        return this.stats;
    }

    updateStats(tasksList) {
        this.stats[0] = tasksList.filter(task => task.getStatus() === 'created').length;
        this.stats[1] = tasksList.filter(task => task.getStatus() === 'removed').length;
        this.stats[2] = tasksList.filter(task => task.getStatus() === 'finished').length;
    }


}