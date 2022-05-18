class HitSystem {
    constructor() {
        this.hitableContainer = {}
    }
    addHitable(hitable) {
        this.hitableContainer[hitable.name] = hitable
    }
}

const hitSystem = new HitSystem()

export default hitSystem

export { HitSystem }