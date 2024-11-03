<script>
export default {
    props: {
        colorTheme: Object,
        attr: String,
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
    <div class="p-[8px] size-fit text-nowrap rounded-[8px] leading-none text-center"
         :style="{ color: colorDarker, backgroundColor: colorLighter }">
        {{ attr }}
    </div>
</template>