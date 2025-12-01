import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('startButton')
export class startButton extends Component {
    start() {
        this.node.on(Node.EventType.TOUCH_START,()=>{
            director.loadScene('praise');
        }
        )
    }

    update(deltaTime: number) {
        
    }
}


