<template>
  <Transition name="fade">
    <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
      <Transition name="zoom">
        <div v-if="modelValue" class="modal-container">
          <button class="modal-close" @click="closeModal">✕</button>
          <div class="modal-content">
            <slot />
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean,
})
const emit = defineEmits(['update:modelValue'])
const closeModal = () => emit('update:modelValue', false)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  /* animation: fadeIn 0.3s ease-out; */
}

.modal-container {
  position: relative;
  background-color: #141414;
  border-radius: 8px;
  width: 90%;
  max-width: 850px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.9);
  animation: zoomIn 0.3s ease-out;
}

.modal-close {
  width: 30px;
  height: 30px;
  border: 1px solid #fff !important;
  position: absolute;
  border-radius: 50%;
  top: 10px;
  right: 12px;
  font-size: 18px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  transition: color 0.2s ease;
}
.modal-close:hover {
  color: #e50914;
}

.modal-content {
  color: #fff;
}

/* ENTER & LEAVE ACTIVE */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s ease;
}

/* ENTER START */
.modal-fade-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

/* ENTER END */
.modal-fade-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* LEAVE START */
.modal-fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* LEAVE END */
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

@keyframes fadeIn {
  from {
    background-color: rgba(0, 0, 0, 0);
  }
  to {
    background-color: rgba(0, 0, 0, 0.8);
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
