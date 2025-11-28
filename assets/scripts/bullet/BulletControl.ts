import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BulletControl')
export class BulletControl extends Component {  
    public isDead :boolean= false;

    start() {

    }

    update(deltaTime: number) {
        if(this.isDead) return;
        const{x, y} = this.node.getPosition();
        let newY =  y + 300 * deltaTime;
        this.node.setPosition(x, newY);   
        if(newY > 800){
            this.node.destroy();
        }
    }
    // 延迟销毁子弹
    die() {
        if(this.isDead) return;
        this.isDead = true;
        setTimeout(() =>{
        this.node?.destroy?.();
        }, 10)
    }
}

