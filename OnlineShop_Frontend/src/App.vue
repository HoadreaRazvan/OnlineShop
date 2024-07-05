<script setup lang="ts">

import { ref } from 'vue';
let message = ref('Hello World');
let color = ref('black');
function changeColor() {
    color.value = 'red';
    message.value = 'Salut';
}

</script>

<template>

<button @click="changeColor" :style="{ color }">{{ message }}</button> 

</template>

<style scoped>

button {
    font-size: 20px;
    background-color: lightblue;
}

</style>