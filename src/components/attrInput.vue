<script>
export default {
    props: {
        colorTheme: Object,
        oneChar: {
            type: Boolean,
            default: false
        },
        attr: Object
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    mounted() {
        this.$refs.attrInputDiv.innerText = this.attr.value
    },
}
</script>

<template>
    <div contenteditable ref="attrInputDiv"
         class="text-[0.8rem] p-[8px] text-wrap border-[1px] mx-auto rounded-[8px] leading-none text-center break-words overflow-hidden outline-none"
         :class="[oneChar ? 'w-[2em]' : 'w-full']" 
         :style="{
            color: colorDarker,
            borderColor: colorMain,
        }" @input="(e) => {
            if (this.oneChar) {
                e.target.innerText = e.target.innerText[0];
                attr.value = e.target.innerText[0]
            } else {
                attr.value = e.target.innerText
            }
        }">
    </div>
</template>