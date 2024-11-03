<script>
export default {
    props: {
        colorTheme: Object,
        oneChar: {
            type: Boolean,
            default: false
        },
        value: String,
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            innerValue: this.value,
        }
    },
    mounted() {
    },
}
</script>

<template>
    <div contenteditable @input="(e) => {
        if (this.oneChar) {
            e.target.innerText = e.target.innerText[0];
            this.innerValue = e.target.innerText[0]
        } else {
            this.innerValue = e.target.innerText
        this.$emit('update:value', this.innerValue)
        }
        
    }" class="text-[14px] p-[8px] text-wrap border-[1px] mx-auto rounded-[8px] outline-transparent leading-none text-center break-words overflow-hidden"
         :class="[oneChar ? 'w-[2em]' : 'w-full']" :style="{
            color: colorDarker,
            borderColor: colorMain,
        }">
        {{ this.innerValue }}
    </div>
</template>