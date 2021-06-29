import { $ } from '@/utils/dom';

class Router<IPage>{
    constructor(readonly pages:IPage){
           this.bindEvents();
    }
    
    public pathanme():string{
        return window.location.hash.replace('#','/');
    }

    public push(href:string):void{
        window.location.hash=href.replace('/','#');
    }


    private bindEvents():void{
        window.addEventListener('hashchange',()=> this.render());
    }

    private unmount():void{

    }

    private render():void{
        const href=this.pathanme();
        console.log(href);
        const $main = $("#main");
        $main.innerHTML = "";
        if(this.pages[href]){
            $main.appendChild(this.pages[href].mount());
        }
        // TODO: NOT FOUND
    }
}

export default Router;