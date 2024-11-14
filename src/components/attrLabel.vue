<script>
export default {
    props: {
        colorTheme: Object,
        attr: String,
        fullWidth: {
            type: Boolean,
            default: true
        }
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
    <div class="text-[0.8rem] font-semibold p-[8px] h-fit mx-auto rounded-[8px] leading-none text-center"
        :class="[this.fullWidth ? 'w-full' : 'w-fit']"
         :style="{ color: colorDarker, backgroundColor: colorLighter }">
        {{ attr }}
    </div>
</template>