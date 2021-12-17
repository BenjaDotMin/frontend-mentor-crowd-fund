<template>
  <button type="button" class="button" :class="{bookmark, small, disabled}">
    <label v-if="bookmark">
      <svg width="56" height="56" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><circle fill="#2F2F2F" cx="28" cy="28" r="28"/><path d="M23 19v18l5-5.058L33 37V19z"/></g></svg>
    </label>
    <b v-if="disabled">Out of stock</b>   
    <b v-else>{{text}}</b>
  </button>
</template>

<script>
  export default {
    name: 'Button', 
    props: {
      text: String,
      bookmark: Boolean,
      small: Boolean,
      disabled: Boolean
    }   
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";

  .button{cursor: pointer; background-color: $cyan; border-radius: 30px; color:white; border:none; @include font(1.6, 19, 0, white, 700); padding: 17px 40px 20px 41px; display: flex; align-items: center; transition: background-color 0.2s;
    &.bookmark{padding: 0px 25px 0px 0px; background-color: #f5f5f5; transition: background-color 0.2s;
      label{margin-right: 15px; cursor: pointer; max-height: 56px;}
      b{margin-bottom: 3px; color: $darkGray; transition: color 0.2s;}
      svg{
        circle{fill:#2F2F2F; transition:fill 0.2s;}
        path{fill:#B1B1B1; transition:fill 0.2s;}
      }     
      &:hover{
        svg{
          circle{fill:#707070;}
        }
      }  
       &.active{background-color: $darkCyan;
        svg{
          circle{fill:$darkCyan;}
          path{fill:white;}
        }
      }  
      @include mq(510){padding-right: 0;
        label{margin-right: 0;}
        b{display: none;}
      }      
    }
    
    &.small{padding:14px 33px 15px 32px; font-size: 1.4rem;}
    &.disabled{background-color: $darkGray; cursor: default; padding: 14px 39px 15px 38px; pointer-events: none;}   
    &:hover{background-color: $darkCyan;}
    &.bookmark{
       &:hover{background-color: #f5f5f5; 
        b{color:$darkGray;}
      }
      &.active{background-color: rgba(#147A73, 0.05); 
        b{color:$darkCyan;}
      }     
    }
    @include mq(370){
      &, &.small{padding: 17px 15px 20px 15px;}
    }  
  }
</style>
