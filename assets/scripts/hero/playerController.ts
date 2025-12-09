import { _decorator, Component, EventTouch, Node, Prefab, v3 ,instantiate, find, UITransform} from 'cc';
import { GlobalEventManager } from '../utils/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    @property(Prefab)
    bullet : Prefab = null;
    start() {
        this.node.on(Node.EventType.TOUCH_MOVE,(e :EventTouch)=>{
            const canvas  = find("Canvas");
            const uitransfrom = canvas.getComponent(UITransform);
            const uiPos = e.getUILocation(); // 获取鼠标坐标（单位：设计分辨率像素 ==> 设计时的分辨率大小 ) 
            const {x, y} = uitransfrom.convertToNodeSpaceAR(v3(uiPos.x, uiPos.y,0));
            // x  172    y 375
            if(x > 172 || x < -172 || y > 375 || y < -375) return;
            else this.node.setWorldPosition(v3(x, y));   
        })

        this.schedule(()=>{
            const {x, y} = this.node.getPosition();
            const bullet = instantiate(this.bullet);// 实例化bullet预制体，并赋值给bullet变量
            bullet.setParent(this.node.parent);// // 设置父节点为飞机的父节点（即  同一个父节点）
            bullet.setPosition(x, y + 80);
        }, 0.2)

    }
    update(deltaTime: number) {
        
    }
    collision(){
        GlobalEventManager.emit(GlobalEventManager.EVENT.HIT_PLAYER);
        // console.log("检测到碰撞");
    }
}


