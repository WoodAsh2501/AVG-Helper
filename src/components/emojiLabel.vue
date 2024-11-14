<script>
export default {
    props: {
        colorTheme: Object,
        labelName: String
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
    <div class="p-[8px] text-[0.8rem] font-semibold size-fit text-nowrap rounded-[8px] leading-none text-center"
         :style="{ color: colorDarker, backgroundColor: colorLighter }">
        {{ labelName }}
    </div>
</template>