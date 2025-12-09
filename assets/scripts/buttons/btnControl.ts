import { _decorator, Component, director, Node, NodeEventType } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('btnControl')

export class btnControl extends Component {
    @property(Node)
    startBtn: Node = null;
    @property(Node)
    complaintBtn: Node = null;
    @property(Node)
    praiseBtn: Node = null;

    @property(Node)
    complaintMsg:Node = null;
    @property(Node)
    praiseMsg: Node = null;


    // LIFE-CYCLE CALLBACKS:
    start() {
        this.startBtn.on(Node.EventType.TOUCH_START, this.playStartBtn, this);
        this.complaintBtn.on(Node.EventType.TOUCH_START, this.playComplaintBtn, this);
        this.praiseBtn.on(Node.EventType.TOUCH_START, this.playPraiseBtn, this);
    }

    update(deltaTime: number) {
        
    }

    // 点击开始按钮
    playStartBtn(){
        director.loadScene('game');
    }

    // 点击投诉按钮
    playComplaintBtn(){
        this.complaintMsg.active = true;
        this.praiseMsg.active = false;
        this.startBtn.setScale(1.5,1.5);
        this.complaintBtn.setScale(0.5,0.5)
        this.praiseBtn.setScale(1.5,1.5);
    }

    //  点击夸奖按钮
    playPraiseBtn(){
        this.praiseMsg.active = true;
        this.complaintMsg.active = false;
        this.startBtn.setScale(1,1)
        this.complaintBtn.setScale(1,1)
        this.praiseBtn.setScale(1,1)
    }


}


