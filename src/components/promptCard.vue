<script>
import { objectAttrs } from '@/store';

export default {
    props: {
        colorTheme: Object,
        value: String,
        attrName: String,
        objectType: String,
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
        this.$refs.promptDiv.innerText = this.objectAttrs[this.objectType][this.attrName].value;
    },
}
</script>

<template>
    <div class="flex p-[8px] w-[344px] min-h-[80px] max-h-[240px] h-fit rounded-[16px] border-2 gap-[8px]" :style="{
        borderColor: colorMain,
    }">
        <!-- 左侧标签 -->
        <div class="p-[4px] w-[10em] text-[12px] text-nowrap text-center rounded-[8px] h-fit" :style="{
            backgroundColor: colorLighter,
            color: colorDarker
        }">
            {{ attrName }}
        </div>

        <!-- 右侧输入框 -->
        <div ref="promptDiv" contenteditable="plaintext-only" @input="(e) => {
            objectAttrs[objectType][attrName].value = e.target.innerText
        }" class="text-[14px] p-[8px] w-full text-wrap border-[1px] mx-auto rounded-[8px] outline-none leading-none break-words overflow-hidden" style="-webkit-user-modify: read-write-plaintext-only"
             :style="{
                color: colorDarker,
                borderColor: colorMain,
            }">
        </div>
    </div>

</template>