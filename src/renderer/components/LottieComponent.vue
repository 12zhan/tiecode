<template>
  <div ref="lavContainer"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted, defineProps} from 'vue';
import lottie,{AnimationItem} from 'lottie-web';

const props = defineProps<{
  path:string,
  progress?:number
}>()

const lavContainer = ref(null);
let animation : AnimationItem

onMounted(()=>{
  animation = lottie.loadAnimation({
    
    container:lavContainer.value as any,
    renderer:'canvas',
    loop:true,
    autoplay:true,
    path:props.path
  })
  // animation.goToAndStop(props.progress || 0);
})

onUnmounted(()=>{
  animation.destroy();
})

</script>