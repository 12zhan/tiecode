<script setup lang="ts">
import { defineProps, onMounted } from 'vue'
import { setColorScheme } from 'mdui'

const props = defineProps({
  color: {
    type: String,
    default: '#f44336'
  }
})

onMounted(() => {
  setColorScheme(props.color)
})



</script>
<template>
  <!--  -->
</template>