
class pageContainer {

    constructor() {
        this.container = [];
        this.cnt = 0;
    }

    appendEntireFile(index, n, dimPages) {
        for (let k = 0; k < n; k++) {
            this.container.push({
                fileId: index,
                pageId: this.cnt,
                page: k + 1,
                ratio: dimPages[k].height/dimPages[k].width
            });
            this.cnt++;
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
            current.push({
                num: el.page,
                id: el.pageId
            });
            lastId = el.fileId;
        }
        grouped.push({
            fileId: lastId,
            pages: current.slice()
        });
        return grouped;
    }

    arrayByFile (){
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
            current.push(el.page - 1); // pdf-lib numbering starts with 0
            lastId = el.fileId;
        }
        grouped.push({
            fileId: lastId,
            pages: current.slice()
        });
        return grouped;
    }

    empty (){
        this.container = [];
        this.cnt = 0;
        return this;
    }

    // Pages moves

    find (pid) {
        for (const [index, value] of this.container.entries()) {
            if (value.pageId == pid){ return index; }
        }
        return -1;
    }

    goUp (pid) {
        const loc = this.find(pid);
        if (loc > 0){
            // Swaping
            [this.container[loc - 1], this.container[loc]] = [this.container[loc], this.container[loc - 1]]
        }
        return this;
    }

    goDown (pid) {
        const loc = this.find(pid);
        if (loc > -1 && loc < this.container.length - 1){
            [this.container[loc], this.container[loc + 1]] = [this.container[loc + 1], this.container[loc]]
        }
        return this;
    }

    remove (pid) {
        const loc = this.find(pid);
        this.container.splice(loc, 1);
        return this;
    }

    // Getters

    getById(pid) {
        for (const value of this.container) {
            if (value.pageId == pid){ return value; }
        }
        return null;
    }

    getLength() {
        return this.container.length;
    }
}

export default pageContainer;
