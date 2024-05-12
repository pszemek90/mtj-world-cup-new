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
    <div id="snackbar" v-if="show"
      :class = "success ? 'bg-green-300' : 'bg-red-300'"
      class="absolute w-full isolate flex items-center overflow-hidden z-10 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p class="text-sm leading-6 text-gray-900">
          <slot/>
        </p>
      </div>
      <div class="flex flex-1 justify-end">
        <button type="button" @click="show = false" class="-m-3 p-3 focus-visible:outline-offset-[-4px]">
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
  opened: Boolean,
  success: Boolean
})
const emit = defineEmits(['close-snackbar'])
const show = ref(false)
watch(() => props.opened, (value) => {
  show.value = value
  if (value) {
    setTimeout(() => {
      show.value = false
      emit('close-snackbar')
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