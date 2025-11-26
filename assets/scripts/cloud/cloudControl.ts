import { _decorator, Component, Node } from 'cc';
import { BgControl } from '../bg/BgControl';
const { ccclass, property } = _decorator;

@ccclass('cloud')
export class cloud extends Component {
    private speed : number;
    start() {
        const bgControl = new BgControl();
        this.speed = bgControl.getSpeed();
    }

    update(deltaTime: number) { 
        const {x , y} = this.node.position;
        this.node.setPosition ( x , y - this.speed * deltaTime)
        if(this.node.position.y < -1300) this.node.destroy();
    }
}

