<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()

const NavigationData = [
    {
        title: '功能',
        icon: 'airplay',
        router: ""
    }, {
        title: '文档',
        icon: 'book',
        router:'/web'
    }, {
        title: '插件',
        icon: 'auto_awesome_mosaic',
        router:''
    }, {
        title: '设置',
        icon: 'settings',
        router:''
    }
] as { title: string, icon: string, router?: string}[]
</script>
<template>
    <div class="container">
        <div class="navigation">

            <mdui-button-icon v-for="i in NavigationData" :icon="i.icon" @click="router.push(i.router as any)">
                <v-tooltip activator="parent" location="start">{{ i.title }}</v-tooltip>
            </mdui-button-icon>
        </div>
        <div class="slot">
            <slot></slot>
        </div>
    </div>
</template>
<style scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
}

.container .navigation {
    background: white;
    width: 60px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.container .slot {
    flex: 1;
    width: 100px;
    height: 100%;
}

@media screen and (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    .container .navigation {
        order: 1;
        height: 50px;
        width: 100%;
        flex: none;
        flex-direction: row;
        justify-content: space-around;
    }

    .container .slot {
        order: -1;
        height: 100%;
        width: 100%;
        flex: 1;
    }
}
</style>