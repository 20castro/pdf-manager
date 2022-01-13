
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

    // Getters

    getPages() {
        return this.container;
    }
}

export default pageContainer;
