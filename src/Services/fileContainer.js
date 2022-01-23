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
            const dim = [];
            for (const p of doc.getPages()){ dim.push(p.getSize()); }
            this.container.push({
                file: fileData,
                numberPages: doc.getPageCount(),
                dimPages: dim,
                added: false
            })
        }
        return this;
    }

    toPageContainer(pages) {
        for (let [index, el] of this.container.entries()) {
            if (!(el.added)) {
                pages.appendEntireFile(index, el.numberPages, el.dimPages);
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
