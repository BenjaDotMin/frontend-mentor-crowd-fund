<template>
  <div class="stand" :class="{disabled : !stand.remaining}">    
    <div class="stand__header">
      <label>{{stand.name}}</label>
      <span>Pledge &dollar;{{stand.minPledge}} or more</span>
    </div>

    <p>{{stand.description}}</p>

    <div class="stand__footer">
      <b>{{readRemaining[stand.id-1]}} <span>left</span></b>
      <Button text="Select Reward" small :disabled="!stand.remaining" @click="pledgeSelected(stand.id)"></Button>
    </div>
    
  </div>
</template>

<script>
  import Button from '@/components/Button.vue';

  export default {
    name: 'Stand',
    components: {Button},
    props: {
      stand: Object
    },
    methods:{
      pledgeSelected(stand){  
        let body = document.body;
        let scrollAmount = window.scrollY;         
        body.classList.add("lock");       
        body.style.top = -scrollAmount+"px";
        this.$store.dispatch("pledgeSelected", {stand, scrollAmount});
      },     
    },
    computed:{
      readRemaining(){
        return this.$store.state.pledgesRemaining
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";

  .stand{padding: 38px 31px 31px; border-radius: 8px; border: 1px solid rgba(0, 0, 0, 0.15);
    .stand__header, .stand__footer{display: flex; justify-content: space-between; align-items: center;}
    .stand__header{
      label{@include font(1.8, 20, 0.03, $black, 700);}
      span{@include font(1.5, 20, 0, $cyan, 500);}
    }
    p{@include font(1.6, 30, 0, $darkGray); margin: 25px 0 24px;}
    .stand__footer{
      b{@include font(3.2, 34, 0.2, $black, 700); display: flex; align-items: center;
        span{@include font(1.5, 18, 0, $darkGray); margin-left: 4px; margin: 1px 0 0 8px; display: block;}
      }
    }
    &.disabled{opacity: 0.5;}

    @include mq(500){padding: 18px 25px 25px; 
      .stand__header{flex-direction: column; align-items: flex-start;
        label{font-size: 1.4rem; line-height: 28px;}
        span{font-size: 1.4rem;}
      }
      p{font-size: 1.4rem; line-height: 24px; margin: 21px 0 21px;}
      .stand__footer{flex-direction: column; align-items: flex-start;
        button{margin-top: 20px;}
      }
    }
  }
</style>
