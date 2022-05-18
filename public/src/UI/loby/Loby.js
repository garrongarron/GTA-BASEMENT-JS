import lazyLoad from "../../basic/LazyLoad.js"

class Loby {
    constructor() {
        this.node = null
        this.module = null
        this.getScreen = async () => {
            this.module = await lazyLoad(location.origin + '/src/UI/loby/src/index.js')
            this.module.start()
            document.querySelector('.room-list').style.display = 'block'
        }
    }

    start() {
        this.node = document.createElement('div')
        document.body.appendChild(this.node)
        this.getScreen()
    }

    stop() {
        document.querySelector('.room-list').style.display = 'none'
        this.module?.stop()
    }
}

const loby = new Loby()

export default loby

export { Loby }