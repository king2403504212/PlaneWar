import { _decorator, Component, director, Node, tween, Vec3 } from 'cc';
import { GlobalEventManager } from '../../utils/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('startButton')
export class startButton extends Component {

    // 原始缩放值
    private originalScale: Vec3 = new Vec3(1, 1, 1);
    start() {
        this.node.on(Node.EventType.TOUCH_START, ()=>{
            tween(this.node)
            .to(0.05, { scale: new Vec3(0.9, 0.9, 1) })
            .to(0.05, { scale: new Vec3(1.1, 1.1, 1) })
            .to(0.05, { scale: this.originalScale })
            .start();
            director.loadScene('game');
            GlobalEventManager.emit(GlobalEventManager.EVENT.START_GAME);
        })
    }

    update(deltaTime: number) {
        
    }
}


