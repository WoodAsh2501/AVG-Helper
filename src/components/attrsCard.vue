<script>
import AttrInput from './attrInput.vue';
import AttrLable from './attrLable.vue';

export default {
    props: {
        colorTheme: Object,
        attrs: Object,
    },
    components: {
        AttrLable,
        AttrInput
    },
    data() {
        return {
            colorMain: this.colorTheme["color-main"],
            colorLighter: this.colorTheme["color-lighter"],
            colorDarker: this.colorTheme["color-darker"],
            innerAttrs: this.attrs,
            attrList: Object.keys(this.attrs),
            multiple: Object.keys(this.attrs).length > 1
        }
    },
}
</script>

<template>
    <div class="flex flex-col p-[8px] w-[96px] gap-[8px] border-2 self-end bg-white rounded-[16px] justify-between"
         :class="[this.multiple ? 'h-full' : 'h-fit']" :style="{ borderColor: colorMain }">
        <div class="flex flex-col gap-[8px]" v-for="attr in attrList">
            <AttrLable :colorTheme :attr="this.innerAttrs[attr].name" />
            <AttrInput :colorTheme :value="this.innerAttrs[attr].value" @update:value="(newValue) => {
                this.innerAttrs[attr].value = newValue;
                this.$emit('update:attrs', this.innerAttrs)
            }"/>
        </div>
    </div>

</template>

<style scoped>
textarea::-webkit-scrollbar {
    display: none;
}
</style>