<script setup lang="ts">
import { ref } from 'vue';
const navigationState = ref(true)
import Navigation from '../components/Navigation.vue'

</script>
<template>
    <Navigation>
        <div class="container">
            <mdui-fab icon="add" style="position: absolute;bottom: 20px;right: 20px;"></mdui-fab>
        </div>
    </Navigation>
</template>
<style>
.container {
    width: 100%;
    height: 100%;
    position: relative;
}

mdui-fab span {
    color: white;
}
</style>