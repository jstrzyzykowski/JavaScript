class Field {
    constructor(size, id, soundEffectUrl) {
        this.id = id;
        this.status = 0;
        this.isImageVisible = false;
        this.width = size;
        this.height = size;
        this.memoryImage = new MemoryImage();
        // this.imageUrl = "";
        this.soundEffectUrl = soundEffectUrl;
    }
}