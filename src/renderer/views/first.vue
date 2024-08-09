<!-- 首次启动加载的页面 -->
<script setup lang="ts">
import { ref } from 'vue';
import LottieComponent from '../components/LottieComponent.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const animationFrame = ref(0)

const animationData = [
    {
        path: '/lottie/welcome_page1.json',
        title: '全新UI设计',
        description: '大圆角、卡片式、强动效设计',
    }, {
        path: '/lottie/welcome_page2.json',
        title: '核心全面升级',
        description: '插件式、模块式、拖动式设计',
    }, {
        path: '/lottie/welcome_page3.json',
        title: '极致性能优化',
        description: '全新项目、筛除大量项目沉余',
    }, {
        path: '/lottie/welcome_page4.json',
        title: '云端结合社区',
        description: '动态更新、各路神仙开源盛典',
    }, {
        path: '/lottie/welcome_page5.json',
        title: '结绳，启动',
    }
] as { path: string, title: string, description: string }[]


function next() {
    animationFrame.value = animationFrame.value < animationData.length - 1 ? animationFrame.value + 1 : animationData.length - 1
}

function last() {
    animationFrame.value = animationFrame.value > 0 ? animationFrame.value - 1 : 0
}

function start() {



    router.push('/')

}

</script>
<template>
    <div class="container">

        <div class="lotitleCarousel" :style="{ flex: animationFrame !== animationData.length - 1 ? 1 : 0 }">

            <div class="box" :style="`transform: translateX(-${animationFrame * 100}%)`">

                <div class="lottie" v-for="i in animationData">
                    <LottieComponent :key="i.title" :path="i.path" style="width: 100%;" />
                </div>


            </div>

        </div>

        <div :class="{ description: true }">

            <span class="title">{{ animationData[animationFrame].title }}</span>

            <span class="descriptionText">{{ animationData[animationFrame].description }}</span>

            <div style="display: flex;gap: 100px;margin-top: 100px;">
                <mdui-button v-show="animationFrame !== animationData.length - 1" variant="text"
                    @click="last">上一步</mdui-button>
                <mdui-button v-show="animationFrame !== animationData.length - 1" variant="filled" @click="next"
                    style="color: white;">下一步</mdui-button>
                <mdui-button v-show="animationFrame === animationData.length - 1" variant="filled" @click="start"
                    style="color: white;">启动</mdui-button>
            </div>

        </div>

    </div>

</template>
<style scoped>
.container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    position: relative;
}



.container .lotitleCarousel {
    width: 100%;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s;
}

.container .lotitleCarousel .box {
    width: 100%;
    display: flex;
    transition: all 0.5s;
}

.container .lotitleCarousel .box .lottie {
    width: 100%;
    flex-shrink: 0;
}

.container .description {
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container .description .title {
    font-size: 40px;
    color: #f44336;
    margin-bottom: 20px;
    font-weight: 600;
}

.container .description .descriptionText {
    font-size: 20px;
    color: #8c8c8c;
}

@media screen and (max-width: 600px) {
    .container {
        flex-direction: column;
    }

    .container .description .title {
        font-size: 25px;
    }

    .container .description .descriptionText {
        font-size: 13px;
    }
}
</style>