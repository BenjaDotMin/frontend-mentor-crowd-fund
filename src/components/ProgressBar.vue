<template>
  <section class="progress-bar">
    <div class="progress-bar__percent" :style="{width: (readPercentage / 100000) * 100 + '%'}"></div>  
  </section>
</template>d

<script>
  export default {
    name: 'ProgressBar',
    computed: {
      readPercentage(){
        return this.$store.state.backedFunds;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";

  .progress-bar{height: 12px; width: 100%; border-radius: 20px; overflow: hidden; background-color: #f5f5f5;
    .progress-bar__percent{background-color: $cyan; height: 100%; border-radius:inherit; transition: width 0.3s ease-in-out;}
  }
</style>
