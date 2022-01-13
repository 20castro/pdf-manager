
class pageContainer {

    constructor() {
        this.container = [];
    }

    appendEntireFile(index, n) {
        console.log("Adding file ", index)
        for (let k = 0; k < n; k++) {
            this.container.push({
                fileId: index,
                page: k + 1
            });
        }
    }

    groupByFile (){
        if (this.getLength() == 0) { return []; }
        let lastId = null;
        let grouped = [];
        let current = [];
        for (const el of this.container) {
            if (lastId != null && lastId != el.fileId) {
                grouped.push({
                    fileId: lastId,
                    pages: current.slice()
                });
                current = [];
            }
            current.push(el.page);
            lastId = el.fileId;
        }
        grouped.push({
            fileId: lastId,
            pages: current.slice()
        });
        return grouped;
    }

    // Getters

    getLength() {
        return this.container.length;
    }
}

export default pageContainer;
