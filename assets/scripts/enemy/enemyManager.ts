import { _decorator, Component, Node, Prefab, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyManager')
export class enemyManager extends Component {
    @property(Prefab)
    airPlane : Prefab = null;
    start() {
        this.schedule(()=>{
            // const y = this.node.y;  
            const airPlane = instantiate(this.airPlane);
            airPlane.setParent(this.node);
            const randomX = Math.random() * 430 - 215;
            airPlane.setPosition(randomX , 0);
        },0.5);
    }

    update(deltaTime: number) {
        
    }
}


