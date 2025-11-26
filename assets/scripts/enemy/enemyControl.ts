import { _decorator, BoxCollider2D, Collider2D, Component, Node, Prefab, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {
    private isDead :boolean= false;
    start() {
    }

    update(deltaTime: number) {
        if(this.isDead) return;
        const {x, y} = this.node.getPosition();
        const newY = y - 300 * deltaTime;
        this.node.setPosition(x , newY)   
        if(newY < -1000) this.node.destroy();
    }  

    // 延迟销毁敌机
    die() {
        if(this.isDead) return;
        this.isDead = true;
        setTimeout(()=>{
            this.node.destroy();
        }, 200)
    }
    
}   


