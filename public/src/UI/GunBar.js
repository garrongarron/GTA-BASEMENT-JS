import cache from "../basic/Cache.js"
import { SlideBar } from "./SlideBar.js"

class GunBar {
    constructor() {
        this.gunBar = new SlideBar('gun')
        this.timer  = 0
        this.interval  = 0
    }
    setValue(number){
        this.timer =  number //seconds
        clearInterval(this.interval)
        this.interval = setInterval(() => {
            this.gunBar.setValue(100-this.timer*100)
            if(this.timer < 0){
                clearInterval(this.interval)
            }
            this.timer -= .1
        }, 100);
        
    }
    start(){
        this.gunBar.start()
        this.gunBar.setColor('#CC0000')
    }
    stop(){
        this.gunBar.stop()
    }
}

const gunBar = new GunBar()

export default gunBar

export { GunBar }
/*
slideBar.getBar().style.background = 'linear-gradient(90deg, #fbff00 25%, #ffc0cb00 0%)'
slideBar.setLabel('25/100')
*/

/*
class SlideBar2
{
    constructor(params){
        this.input = document.createElement('input')
        this.params = {
            type:'range',
            min:0.01,
            max:100,
            value:50,
            class:'slider'
        }
        Object.assign(this.params, params | {});
        Object.keys(this.params).map(key=>{
            this.input.setAttribute(key,this.params[key])
        })
        this.container = document.createElement('div')
        this.container.classList.add('slidebar-container')

        this.label = document.createElement('div')
        this.label.innerText = 'Label'
        this.label.classList.add('slidebar-label')
        this.container.appendChild(this.label)
        this.container.appendChild(this.input)
    }
    get(){
        return this.container
    }
    getBar(){
        return this.input
    }

    setLabel(label){
        this.label.innerText = label
    }
    show(){
        this.container.classList.remove('hide')
        this.container.classList.remove('fadeOut1')
        this.container.classList.add('fadeIn1')
        document.body.appendChild(this.container)
    }
    hide(){
        this.container.classList.remove('fadeIn1')
        this.container.classList.add('fadeOut1')
        setTimeout(() => {
            this.container.classList.add('hide')
        }, 1000);
    }
}

*/