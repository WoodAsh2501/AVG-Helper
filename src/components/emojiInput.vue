<script>
export default {
    props: {
        colorTheme: Object,
        objectType: String,
        inputAttrs: Object,
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
        }
    },
    mounted() {
        this.$refs.emojiInputDiv.innerText = this.inputAttrs.value
    }
}
</script>

<template>
    <div contenteditable ref="emojiInputDiv" @input="(e) => {
        inputAttrs.value = e.target.innerText
    }" class="p-[8px] h-[30px] text-wrap border-[1px] self-baseline rounded-[8px] outline-transparent leading-none text-center break-words overflow-hidden min-w-[4em]"
         :style="{
            color: colorDarker,
            borderColor: colorMain,
        }">
    </div>
</template>