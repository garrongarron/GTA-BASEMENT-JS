import sounds from "../../../sounds/Audios.js"
import cache from "../../basic/Cache.js"

class Settings {
    constructor() {
        this.background = document.createElement('div')
        this.background.classList.add('settings')
        fetch('src/UI/settings/Background.html').then(p => p.text()).then(html => {
            this.background.innerHTML = html
        })
        this.loaded = false
        sounds.setVolume('background', 0)
        sounds.setAsLoop('background')
        sounds.play('background')
    }
    init = () => {
        let bg = document.querySelector('.settings-sounds-background')
        let input = bg.querySelector('input')
        input.addEventListener('change', () => {
            sounds.setVolume('background', input.value *1)
            localStorage.setItem('background', input.value)
        })
        input.value =  localStorage.getItem('background') || '0.5'
        sounds.setVolume('background', input.value *1)
    }
    start() {
        document.body.appendChild(this.background)
        if (this.loaded) return
        this.loaded = true
        setTimeout(() => {
            this.init()
        }, 500);
    }
    stop() {
        cache.appendChild(this.background)
    }
}

const settings = new Settings()

export default settings

export { Settings }