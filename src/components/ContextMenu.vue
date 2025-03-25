<template>
    <div :class="['menus', nested && 'nested', isMenuVisible && 'show']" ref="menuItems" v-if="isMenuVisible">
        <slot />
    </div>
</template>

<script setup lang="ts">
    import { Ref, ref, watch } from 'vue';
    import { IContextMenuProps } from '../interfaces';

    const { isMenuVisible, nested = false } = defineProps<IContextMenuProps>();

    const menuItems = ref();
    const menuItemsXOffset: Ref<number> = ref(12);

    watch(() => isMenuVisible, () => {
        if(!isMenuVisible) return;
        const menuItemsDimension: DOMRect = menuItems.value.getBoundingClientRect();
        if(innerWidth - menuItemsDimension.left < menuItemsDimension.width) {
            console.log(innerWidth, menuItemsDimension)
            menuItemsXOffset.value = 12 - menuItemsDimension.width;
        }
    }, {flush: "post"});
</script>

<style scoped>
    .menus {
        position: absolute;
        background-color: var(--dropdown-bg);
        top: calc(100% + 5px);
        left: v-bind('menuItemsXOffset + "px"');
        padding: 8px 0;
        z-index: 1;
        width: 200px;
        box-shadow: 0 0 5px 2px var(--shadow);
        display: none;
        &.nested {
            left: -50px;
            top: calc(100% - 8px);
            width: 100%;
        }
        &.show {
            display: block;
        }
        & > div {
            font-size: 0.875rem;
            color: var(--text);
            padding: 8px 7px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &.move-to {
                position: relative;

                & .groups {
                    position: absolute;
                    left: -50px;
                    top: calc(100% - 8px);
                    width: 100%;
                    display: none;

                    &.show {
                        display: block;
                    }
                }
            }
            & .icon {
                width: 15px;
                height: 15px;

                &.move {
                    transform: rotate(-90deg);

                    &.open {
                        transform: rotate(0deg);
                    }
                }
            }
            &:hover {
                background-color: var(--background);
            }
        }
    }
</style>