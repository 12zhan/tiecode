<script setup lang="ts">
import WindowsBarComponent from './components/WindowsBarComponent.vue'
import MduiThemeColorComponent from './components/MduiThemeColorComponenet.vue'
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'

import { useRouter } from "vue-router";
const router = useRouter()
onMounted(() => {
  router.push("/first")
})
</script>

<template>
  <MduiThemeColorComponent></MduiThemeColorComponent>
  <WindowsBarComponent></WindowsBarComponent>
  <RouterView></RouterView>

</template>

