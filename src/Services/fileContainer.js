import { PDFDocument } from "pdf-lib";

class fileContainer {

    constructor() {
        this.container = [];
    }

    async append(newFiles) {
        let newList = Object.values(newFiles);
        for (let fileData of newList) {
            const buffer = await fileData.arrayBuffer();
            const doc = await PDFDocument.load(buffer)
            this.container.push({
                file: fileData,
                numberPages: doc.getPageCount(),
                added: false
            })
        }
        return this;
    }

    toPageContainer(pages) {
        for (let [index, el] of this.container.entries()) {
            if (!(el.added)) {
                pages.appendEntireFile(index, el.numberPages);
                this.container[index].added = true;
            }
        }
        return pages;
    }

    empty (){
        this.container = [];
        return this;
    }

    // Getters

    getFiles(index = null) {
        if (index == null){ return this.container; }
        else { return this.container[index]; }
    }

    getLength() {
        return this.container.length;
    }
}

export default fileContainer;
