import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btnControl')

export class btnControl extends Component {
    private startBtn : Node = null;
    private complaintBtn : Node = null;
    private praise : Node = null;
    start() {
        this.startBtn = this.node.getChildByName("start");
        this.complaintBtn = this.node.getChildByName("complaint");
        this.praise = this.node.getChildByName("praise");
        
    }

    update(deltaTime: number) {
        
    }
}


