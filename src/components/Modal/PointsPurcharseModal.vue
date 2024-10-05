<template>
    <div class="modal" tabindex="-1" v-if="show" :class="{ 'show': show }" :style="{ display: show ? 'block' : 'none' }"
        aria-labelledby="pointModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header border-0">
                    <h5 class="modal-title w-100 text-center" id="pointModalLabel">Mua thêm điểm hỗ trợ</h5>
                    <button type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3" id="pointOptions">
                        <div v-for="point in points" :key="point.id" class="col-md-4">
                            <div class="card point-card h-100" :class="{ 'selected': point.id === selectedPoint?.id }" @click="selectPoint(point.id)">
                                <div class="card-body text-center">
                                    <h3 class="card-title">{{ point.name }}</h3>
                                    <p class="card-text text-muted">{{ point.description }}</p>
                                    <p class="card-text fw-bold">{{ formatPrice(point.price) }}</p>
                                    <span class="checkmark" v-show="point.id === selectedPoint?.id">
                                        <svg fill="#06b72f" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                            class="icon line">
                                            <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer border-0">
                    <button type="button" class="btn btn-primary w-100" @click="handlePurchase" :disabled="!selectedPoint">
                        Gửi yêu cầu mua
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade" :class="{ 'show': show }" v-if="show"></div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { toast } from 'vue3-toastify';

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close']);

const selectedPoint = ref(null);
const points = ref([
    {
        id: 1,
        name: '20 lượt',
        description: 'Gói cơ bản',
        price: 100000,
        checked: false
    },
    {
        id: 2,
        name: '50 lượt',
        description: 'Gói tiêu chuẩn',
        price: 200000,
        checked: false
    },
    {
        id: 3,
        name: '70 lượt',
        description: 'Gói cao cấp',
        price: 300000,
        checked: false
    },
    {
        id: 4,
        name: '90 lượt',
        description: 'Gói vip',
        price: 500000,
        checked: false
    }
]);

const selectPoint = (pointId) => {
    if (selectedPoint.value && selectedPoint.value.id === pointId) {
        selectedPoint.value = null;
    } else {
        selectedPoint.value = points.value.find(point => point.id === pointId);
    }
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

const handlePurchase = () => {
    if (!selectedPoint.value) return;

    try {
        // TODO: Implement purchase logic here
        toast.success(`Yêu cầu mua ${selectedPoint.value.name}`, {
            autoClose: 500
        });
        emit('close');
    } catch (error) {
        toast.error('Có lỗi xảy ra khi mua điểm');
    }
};
</script>

<style scoped>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 0;
}

.modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1040;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop.show {
    opacity: 0.5;
}

.point-card {
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
    position: relative;
}

.point-card:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.point-card.selected {
    border-color: #06b72f;
}

.checkmark {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #06b72f;
}
</style>