import { _decorator, Component, instantiate, Node, Prefab, tween, Vec3 } from 'cc';
import { GlobalEventManager } from '../utils/GlobalEventManager';
const { ccclass, property } = _decorator;

@ccclass('hpManager')
export class hpManager extends Component {
    private currentLives: number = 5;
    private maxLives : number = 5; // 最大生命值
    
    // 当前显示的心形
    @property([Node])
    activeHearts: Node[] = []; 
    start() {
        this.maxLives = this.activeHearts.length;
        this.currentLives = this.maxLives;
        GlobalEventManager.on(GlobalEventManager.EVENT.HIT_PLAYER,this.removeLife,this);
    }

    update(deltaTime: number) {
        
    }

    // 减少生命值
    removeLife(amount: number = 1) {
        this.currentLives -= amount;
        if(this.currentLives >= 0){
            this.activeHearts[this.currentLives].active = false;
        }else{
            // GlobalEventManager.emit(GlobalEventManager.EVENT.GAME_OVER);
        }
    }


}


