<script setup lang="ts">
import { ref } from 'vue';


const title = ref("Tiecode for Windows")

const widnowsControlData = [
    { name: 'devtools',title:"开发者模式", color: "#ffe088", click: devtool },
    { name: 'top',title:"置顶", color:"#9e9e9e", click: top },
    { name: 'max',title:"最大化", color: "#4caf50", click: max },
    { name: 'min',title:"最小化", color: "#ff9800", click: min },
    { name:"close",title:"关闭",color:"#f44336",click:close}
] as {name:string,title:string,color:string,click:Function}[]

function top() {
    window.electronAPI.top()
}

function max() {
    window.electronAPI.max()
}

function min() {
    window.electronAPI.min()
}

function close() {
    window.electronAPI.close()
}

function devtool() {
    window.electronAPI.devtools()
}

</script>

<template>

    <div id="container">
        <div style="flex: 1;display: flex;align-items: center;">
            <img src="/icon.ico" alt="icon" class="icon">
            <span class="title">
                <!-- {{ title }} -->
            </span>
        </div>
        <div style="flex: 1;display: flex;justify-content: center;align-items: center;">
            <span style="font-size: 15px;font-weight: 500;text-wrap: nowrap;">
                {{ title }}
            </span>
        </div>
        <div style="flex: 1;display: flex;justify-content: end;align-items: center;">
            <div class="control">
                <li :style="{background:i.color}" @click="i.click" v-for="i in widnowsControlData">
                    <v-tooltip activator="parent" location="bottom">
                        {{ i.title }}
                    </v-tooltip>
                </li>
            </div>
        </div>
    </div>

</template>

<style scoped>
#container {
    width: 100%;
    height: 30px;
    background: white;
    -webkit-app-region: drag;
    user-select: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon {
    width: 20px;
    height: 20px;
    margin: 5px;
    border-radius: 4px;
}

.title {
    font-size: 12px;
}

.control {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
}

.control li {
    -webkit-app-region: no-drag;
    font-size: 0px;
    list-style: none;
    width: 18px;
    height: 18px;
    border-radius: 18px;
}
</style>