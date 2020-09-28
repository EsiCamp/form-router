<template>
  <div class="form_cnt">
    <pageHeader />
    <home />
    <router-view />
    <imageSlider />
    <pageFooter />
  </div>
</template>

<script>
import pageHeader from './components/pageHeader.vue';
import home from './components/home.vue';
import imageSlider from './components/imageSlider.vue';
import pageFooter from './components/pageFooter.vue';

export default {
  components: {
    pageHeader,
    home,
    imageSlider,
    pageFooter,
  },
};
</script>
