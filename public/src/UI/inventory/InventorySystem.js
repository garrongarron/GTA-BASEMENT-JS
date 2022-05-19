class InventorySystem {
    constructor() {
        this.node = null
        this.promise = fetch('src/UI/inventory/inventory.html').then(response => response.text())
        this.promise.then(html => {
            this.node = document.createElement('div')
            this.node.innerHTML = html
            this.node.style.display = 'none'
            document.body.appendChild(this.node)
        })
    }
    start(){
        this.promise.then(() => {
            this.node.style.display = 'block'
        })
        return this.promise
    }
    stop(){
        this.node.style.display = 'none'
    }
}

const inventorySystem = new InventorySystem()

export default inventorySystem

export { InventorySystem }