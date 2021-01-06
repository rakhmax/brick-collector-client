<template>
  <div :style="{ marginBottom: '110px' }">
    <table-sets />
  </div>
</template>

<script>
import TableSets from '@/components/TableSets.vue';

export default {
  name: 'Sets',

  components: {
    TableSets,
  },
};
</script>
