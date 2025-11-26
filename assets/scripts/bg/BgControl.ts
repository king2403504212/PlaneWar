import { _decorator, CCObject, Component, Node, Prefab, UITransform, instantiate, Contact2DType, Collider2D, PhysicsSystem2D } from 'cc';
import { enemyControl } from '../enemy/enemyControl';
import { BulletControl } from '../bullet/BulletControl';
const { ccclass, property } = _decorator;

@ccclass('BgControl')
export class BgControl extends Component {
    private  speed : number = 100;
    private h : number = 0;
    @property(Prefab)
    cloud : Prefab = null;
    public  getSpeed(): number {
        return this.speed;
    }
    start() {
        let bg = this.node.getChildByName('bg1');
        this.h = bg.getComponent(UITransform).height;

        // 注册一个全局的回调函数
        PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT,this.onBeginContact,this);
    }

    update(deltaTime: number) {
        for(let item of this.node.children){
            const {x , y} = item.position;;
            const moveY = this.speed * deltaTime;
            let newY = y - moveY;
            item.setPosition(x , newY);
            if(newY < -this.h){
                item.setPosition(x , newY + this.h *2 );
                this.cloudSpawn();
            }
        }
        
    }

    // 碰撞开始的回调函数
    onBeginContact(self: Collider2D, other: Collider2D){
        if((other.tag === 1 && self.tag === 0) ){
            other.getComponent(enemyControl).die();
            self.getComponent(BulletControl).die();
        }else if((other.tag === 0 && self.tag === 1)){
            self.getComponent(enemyControl).die();
            other.getComponent(BulletControl).die();
        }
    }

    // 随机生成云朵
    cloudSpawn(){ 
        for(let i = 0; i < 10;i ++){
            // 初始一个云
            const cloud = instantiate(this.cloud);
            cloud.parent = this.node.parent;
            // 随机显示一个云 （1-4）
            let index = Math.floor(Math.random() * 4) + 1 ;
            let name  = index.toString()
            cloud.getChildByName(name).active = true;

            // x :-160 - 160     y : 480 -1210
            cloud.setPosition(Math.random() * 320 - 160,Math.random() * 730 + 480);
        }
    }
}


