<script>
export default {
    props: {
        colorTheme: Object,
        value: String
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            innerValue: this.value,
        }
    },
}
</script>

<template>
    <div contenteditable @input="(e) => {
        this.innerValue = e.target.innerText
        this.$emit('update:value', this.innerValue)
    }" class="p-[8px] text-wrap border-[1px] rounded-[8px] outline-transparent leading-none text-center break-words overflow-hidden min-w-[4em]"
     :style="{
            color: colorDarker,
            borderColor: colorMain,
        }">
        {{ this.innerValue }}
    </div>
</template>