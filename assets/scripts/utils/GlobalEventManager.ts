// GlobalEventManager.ts
import { _decorator, Component, Node } from 'cc';

export class GlobalEventManager {
    private static instance: Node = null;
    
    // 定义事件类型常量
    static readonly EVENT = {
        BOMB_BULLET: 'bomb_bullet',
        BOMB_PLAYER:'bomb_player',
        START_GAME:'start_game',
        HIT_PLAYER:'hit_player',

    };
    
    // 获取全局事件节点（单例模式）
    static getInstance(): Node {
        if (!GlobalEventManager.instance) {
            GlobalEventManager.instance = new Node('GlobalEventManager');
        }
        return GlobalEventManager.instance;
    }
    
    // 发射全局事件
    static emit(eventName: string, data?: any) {
        GlobalEventManager.getInstance().emit(eventName, data);
    }
    
    // 监听全局事件
    static on(eventName: string, callback: Function, target?: any) {
        GlobalEventManager.getInstance().on(eventName, callback, target);
    }
    
    // 取消监听
    static off(eventName: string, callback?: Function, target?: any) {
        GlobalEventManager.getInstance().off(eventName, callback, target);
    }
    
    // 一次性监听
    static once(eventName: string, callback: Function, target?: any) {
        GlobalEventManager.getInstance().once(eventName, callback, target);
    }
}