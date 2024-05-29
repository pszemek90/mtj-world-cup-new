<template>
    <div class="p-4 max-w-sm w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
            <div class="flex-1 space-y-6 py-1">
                <div class="grid grid-cols-11 gap-6 items-center" v-for="item in 3">
                    <div class="h-8 col-span-3 col-start-2 bg-slate-200 dark:bg-slate-500 rounded"></div>
                    <div class="h-0.5 col-start-6 bg-slate-200 dark:bg-slate-500 rounded"></div>
                    <div class="h-8 col-span-3 col-start-8 bg-slate-200 dark:bg-slate-500 rounded"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted, onUnmounted } from 'vue';

// Your component's setup logic here

// Your component's data, methods, and computed properties here

</script>

<style scoped>
/* Your component's styles here */
</style>
