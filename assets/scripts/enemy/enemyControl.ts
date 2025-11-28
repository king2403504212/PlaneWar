import { _decorator,  Component, Animation, Collider2D, RigidBody2D, AnimationClip, AudioClip, AudioSource } from 'cc';
import { GlobalEventManager } from '../utils/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('enemyControl')
export class enemyControl extends Component {
    public isDead :boolean= false;
    private hasPlayed : boolean = false;
    private audioSource : AudioSource = null;
    @property(AnimationClip)
    enemyDestroy : AnimationClip = null;

    @property(AudioClip)
    bomb_bullet : AudioClip = null;
    
    @property(AudioClip)
    bomb_player : AudioClip = null;

    start() {
        GlobalEventManager.on(GlobalEventManager.EVENT.BOMB_BULLET, this.playBombBullet, this);
        GlobalEventManager.on(GlobalEventManager.EVENT.BOMB_PLAYER, this.playBombPlayer, this);
        this.audioSource = this.node.getComponent(AudioSource);
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
        const col = this.getComponent(Collider2D);
        const body = this.getComponent(RigidBody2D);
        if (col) col.enabled = false;
        if (body) body.enabled = false;
        this.node.getComponent(Animation).defaultClip = this.enemyDestroy;
        if(this.isDead) return;
        this.isDead = true;
        if(!this.hasPlayed) {
            this.playDead();
        }
        setTimeout(() => {            
            this.node.destroy();  
        }, 420)
    }
            
    

    // 销毁动画
    playDead(){
        const anim = this.node.getComponent(Animation);
        anim.play("");
        this.hasPlayed = true;
    }

    playBombBullet(){
        try {
            this.audioSource.volume = 0.5;
            this.audioSource.playOneShot(this.bomb_bullet);
            console.log("成功播放");
        } catch (error) {
            console.error("播放失败:", error);            
        }
    }

    playBombPlayer(){
        try{
            this.audioSource.volume = 0.5;
            this.audioSource.playOneShot(this.bomb_player);
            console.log("成功播放");
        }catch(error){
            console.error("播放失败:", error);
        }
    }

}   


