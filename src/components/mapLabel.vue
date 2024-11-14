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
    <div class="py-[8px] w-[54px] text-[0.8rem] font-semibold size-fit text-nowrap rounded-[8px] leading-none text-center shrink-0"
         :style="{ color: colorDarker, backgroundColor: colorLighter }">
        {{ labelName }}
    </div>
</template>