<template>
  <Transition
    name="slide-from-top"
    enter-active-class="transition ease-out duration-300 transform"
    enter-from-class="translate-y-[-100%]"
    enter-to-class="translate-y-0"
    leave-active-class="transition ease-in duration-300 transform"
    leave-from-class="translate-y-0"
    leave-to-class="translate-y-[-100%]"
  >
    <div id="snackbar" v-if="open"
      class="absolute w-full isolate flex items-center overflow-hidden bg-green-300 z-10 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p class="text-sm leading-6 text-gray-900">
          <slot/>
        </p>
      </div>
      <div class="flex flex-1 justify-end">
        <button type="button" @click="openSnackbar = false" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
          <span class="sr-only">Dismiss</span>
          <XMarkIcon class="h-6 w-6 text-gray-900"
            aria-hidden="true" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/20/solid'
import { watch, ref } from 'vue'
const props = defineProps({
  openSnackbar: Boolean
})
const open = ref(false)
watch(() => props.openSnackbar, (value) => {
  open.value = value
  if (value) {
    setTimeout(() => {
      open.value = false
    }, 5000)
  }
})
</script>
<style>
div#snackbar::after {
  content: '';
  width: 100%;
  height: 2px;
  background: black;
  position: absolute;
  bottom: 0;
  left: 0;
  animation: borderDisappear 5s linear forwards;
}

@keyframes borderDisappear {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}
</style>