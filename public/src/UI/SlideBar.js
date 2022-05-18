import cache from "../basic/Cache.js"

class SlideBar {
    constructor(classSelector = 'slide') {
        this.node = document.createElement('div')
        this.node.classList.add('slide')
        this.node.classList.add(classSelector)
        this.color = '#00ff00'
    }
    setColor(color){
        this.color = color
    }
    setValue(number){
        this.node.style.background = `linear-gradient(90deg, ${this.color} ${number}%, #ffc0cb00 0%)`
    }
    start(){
        document.body.appendChild(this.node)
    }
    stop(){
        cache.appendChild(this.node)
    }
}

const slideBar = new SlideBar()

export default slideBar

export { SlideBar }
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