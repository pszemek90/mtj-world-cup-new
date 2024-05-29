<template>
    <div class="border border-slate-200 dark:border-slate-500 shadow rounded-md p-4 w-full max-w-[12rem] mx-auto">
        <div class="grid grid-cols-3 gap-x-4 gap-y-4 animate-pulse">
            <div class="h-6 bg-slate-200 dark:bg-slate-500 rounded" v-for="item in 3"></div>
        </div>
    </div>
    <div class="border border-slate-200 dark:border-slate-500 shadow rounded-md p-4 w-full max-w-[12rem] mx-auto">
        <div class="grid grid-cols-3 gap-x-4 gap-y-6 animate-pulse">
            <div class="h-6 bg-slate-200 dark:bg-slate-500 rounded" v-for="row in rows" :key="row"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const rows = ref(15); // Number of rows in the table
</script>

<style>
</style>
