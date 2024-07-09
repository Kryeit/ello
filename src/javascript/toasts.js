import {ref} from 'vue';

const toasts = ref([]);
let nextId = 0;

export function addToast(image, title, description) {
    toasts.value.push({ id: nextId++, image, title, description });
}

export function getToasts() {
    return toasts.value;
}

export function removeToast(id) {
    toasts.value = toasts.value.filter(toast => toast.id !== id);
}