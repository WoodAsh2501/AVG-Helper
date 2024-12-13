<script>
export default {
    data() {
        return {
            isDragging: false,
            startX: 0,
            startY: 0,
        }
    },
    methods: {
        dragStart(e) {
            const canvas = this.$refs.canvas
            this.isDragging = true
            this.startX = e.clientX - canvas.offsetLeft
            this.startY = e.clientY - canvas.offsetTop
        },
        dragging(e) {
            if (this.isDragging) {
                const canvas = this.$refs.canvas
                canvas.style.left = (e.clientX - this.startX) + 'px'
                canvas.style.top = (e.clientY - this.startY) + 'px'
            }
        },
        dragEnd() {
            this.isDragging = false
        }
    }
}
</script>
<template>
    <div class="size-full">
        <div ref="canvas" id="gridCanvas" class="absolute size-[2500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        @mousedown="dragStart" @mousemove="dragging" @mouseup="dragEnd" @mouseleave="dragEnd">
            <div v-for="i in 2500" class="border"></div>
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