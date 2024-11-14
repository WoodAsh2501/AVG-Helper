<script>
import { mapAttrs } from '@/store';

export default {
    props: {
        colorTheme: Object,
        attrName: String,
        index: Number,
        editAble: Boolean
    },
    data() {
        return {
            mapAttrs,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    mounted() {
        if (this.index >= 0) {
            this.$refs.emojiInputDiv.innerText = mapAttrs[this.index][this.attrName].value
        }
    }
}
</script>

<template>
    <div :contenteditable="editAble" ref="emojiInputDiv" 
    @input="(e) => {
        mapAttrs[index][attrName].value = e.target.innerText;
    }" class="p-[8px] h-[30px] border-[1px] rounded-[8px] outline-none leading-none text-center text-nowrap overscroll-x-auto overflow-hidden w-full"
         :style="{
            color: colorDarker,
            borderColor: colorMain,
        }">
    </div>
</template>