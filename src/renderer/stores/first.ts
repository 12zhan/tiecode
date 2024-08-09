// 记录首次启动

import { defineStore } from 'pinia'


export const FirstStore = defineStore('first', {
    state(){
        return {
            first:0
        }
    },
    getters:{
        isFirst(state){
            return state.first === 0
        },
        first(state){
            return state.first
        }
    },
    actions:{
        add(){
            this.first += 1
        }
    }
})