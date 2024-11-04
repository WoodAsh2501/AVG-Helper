<script>
import { objectAttrs } from '@/store';

export default {
    props: {
        colorTheme: Object,
        oneChar: {
            type: Boolean,
            default: false
        },
        attrName: String,
        objectType: String
    },
    data() {
        return {
            objectAttrs,

            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    mounted() {
        this.$refs.attrInputDiv.innerText = objectAttrs[this.objectType][this.attrName].value
    },
}
</script>

<template>
    <div contenteditable ref="attrInputDiv"
         class="text-[14px] p-[8px] text-wrap border-[1px] mx-auto rounded-[8px] leading-none text-center break-words overflow-hidden outline-none"
         :class="[oneChar ? 'w-[2em]' : 'w-full']" 
         :style="{
            color: colorDarker,
            borderColor: colorMain,
        }" @input="(e) => {
            if (this.oneChar) {
                e.target.innerText = e.target.innerText[0];
                objectAttrs[objectType][attrName].value = e.target.innerText[0]
            } else {
                objectAttrs[objectType][attrName].value = e.target.innerText
            }
        }">
    </div>
</template>