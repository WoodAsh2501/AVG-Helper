<script>
export default {
    props: {
        colorTheme: Object,
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            value: '',
        }
    },
}
</script>

<template>
    <div contenteditable @input="(e) => {
        if (this.oneChar) {
            e.target.innerText = e.target.innerText[0];
            console.log(this.value)
        }
        this.value = e.target.innerText[0]
    }" class="p-[8px] text-wrap border-[1px] rounded-[8px] outline-transparent leading-none text-center break-words overflow-hidden min-w-[4em]"
     :style="{
            color: colorDarker,
            borderColor: colorMain,
        }">
    </div>
</template>