<template>
  <div class="form_cnt">
    <home />
    <router-view />
  </div>
</template>

<script>
import home from './components/home.vue';

export default {
  components: {
    home,
  },
};
</script>
