<template>
  <div :style="{ marginBottom: '110px' }">
    <table-minifigures/>
  </div>
</template>

<script>
import TableMinifigures from '@/components/TableMinifigures.vue';

export default {
  name: 'Minifigures',

  components: {
    TableMinifigures,
  },
};
</script>
