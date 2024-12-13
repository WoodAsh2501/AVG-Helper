<script>
export default {
   
}
</script>
<template>
<div class="size-full">
    <div id="gridCanvas" class="absolute size-[2500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div v-for="i in 2500"
        class="border"></div>
    </div>
</div>

</template>

<style>
#gridCanvas {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    grid-template-rows: repeat(50, 1fr);
}
</style>