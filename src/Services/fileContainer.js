import pageContainer from "./pageContainer";

class fileContainer {

    constructor() {
        this.container = [];
        this.pages = new pageContainer();
    }

    append(newFiles) {
        let newList = Object.values(newFiles);
        for (let fileData of newList) {
            this.container.push({
                file: fileData,
                loaded: false,
                added: false
            })
        }
        return this;
    }

    addPages(index, n) {
        this.container[index]['numberPages'] = n;
        this.container[index].loaded = true;
        return this;
    }

    toPageContainer() {
        for (let [index, el] of this.container.entries()) {
            if (el.loaded && !(el.added)) {
                this.pages.appendEntireFile(index, el.numberPages);
                this.container[index].added = true;
            }
        }
        return this.pages;
    }

    empty (){
        this.container = [];
        this.pages.empty();
        return this;
    }

    // Getters

    getFiles() {
        return this.container;
    }
}

export default fileContainer;
