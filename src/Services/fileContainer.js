
class fileContainer {

    constructor() {
        this.container = [];
        this.pages = [];
    }

    append(newFiles) {
        this.container = this.container.concat(Object.values(newFiles));
        return this;
    }

    getFiles() {
        return this.container;
    }

    getPages() {
        return this.pages;
    }

    addPages(n) {
        this.pages.push(n);
        return this;
    }
}

export default fileContainer;
