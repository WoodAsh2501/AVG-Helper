<script>
export default {
    data() {
        return {
            isDragging: false,
            isDrawing: false,
            startX: 0,
            startY: 0,
            mode: 'DRAG'
        }
    },
    methods: {
        dragStart(e) {
            if (this.mode === 'DRAG') {
                const canvas = this.$refs.canvas
                this.isDragging = true
                this.startX = e.clientX - canvas.offsetLeft
                this.startY = e.clientY - canvas.offsetTop
            }
        },
        dragging(e) {
            if (this.mode === 'DRAG' && this.isDragging) {
                const canvas = this.$refs.canvas
                canvas.style.left = (e.clientX - this.startX) + 'px'
                canvas.style.top = (e.clientY - this.startY) + 'px'
            }
        },
        dragEnd() {
            if (this.mode === 'DRAG') {
                this.isDragging = false
            }
        },

        drawStart() {
            if (this.mode === 'PEN') {
                this.isDrawing = true
            };
        },

        drawing(e) {
            if (this.mode === 'PEN' && this.isDrawing) {
                const div = e.target;
                if (div.children.length === 0) {
                    const newBlock = document.createElement('div');
                    newBlock.textContent = '😀';
                    newBlock.style.pointerEvents = "none";
                    newBlock.style.userSelect = "none";
                    newBlock.style.userDrag = "none";
                    newBlock.draggable = false;

                    div.appendChild(newBlock);
                }
            };
        },

        drawEnd() {
            if (this.mode === 'PEN') {
                this.isDrawing = false
            };
        },
    }
}
</script>
<template>
    <div ref="canvas" id="gridCanvas"
         class="absolute size-[2500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0" @mousedown="dragStart"
         @mousemove="dragging" @mouseup="dragEnd" @mouseleave="dragEnd">
        <div v-for="i in 2500" class="border flex justify-center items-center"
             :class="{ 'hover:bg-black/10': this.mode === 'PEN' }" @mousedown="drawStart" @mousemove="drawing"
             @mouseup="drawEnd" />
    </div>

    <div id="panel" class="absolute left-10 bottom-10 flex text-[32px] w-fit gap-2">
        <button class="size-20 bg-black" @click="this.mode = 'DRAG'">
            DRAG
        </button>
        <button class="size-20 bg-black" @click="this.mode = 'PEN'">
            PEN
        </button>
    </div>

</template>

<style>
#gridCanvas {
    display: grid;
    grid-template-columns: repeat(50, 1fr);
    grid-template-rows: repeat(50, 1fr);
}
</style>