import { _decorator, Component, EventTouch, Node, Prefab, v3 ,instantiate} from 'cc';
import { GlobalEventManager } from '../utils/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('playerController')
export class playerController extends Component {
    @property(Prefab)
    bullet : Prefab = null;
    start() {
        this.node.on(Node.EventType.TOUCH_MOVE,(e :EventTouch)=>{
            const{ x, y} = e.getUILocation(); // 获取鼠标坐标（单位：设计分辨率像素 ==> 设计时的分辨率大小 ) 
            // console.log("检测到移动,当前x轴坐标：",x,"y轴坐标：" ,y);
            // if(x < 85 || x >470 || y > 700 || y < 60) return;
            this.node.setWorldPosition(v3(x, y));   
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


