<template>
  <div class="modal" :class="{active : readPledgeModal}" @click="closeModal">  
    
    <transition name="fade">
      <div class="modal__content" v-on:click.stop v-if="readPledgeModal && !readPledgeMade">
        <svg class="close-modal" @click="closeModal" width="14" height="15" xmlns="http://www.w3.org/2000/svg"><g fill="#a6a6a6" fill-rule="evenodd"><path d="M2.404.782l11.314 11.314-2.122 2.122L.282 2.904z"/><path d="M.282 12.096L11.596.782l2.122 2.122L2.404 14.218z"/></g></svg>
        <div class="modal__header">
          <h3>Back this project</h3>
          <p>Want to support us in bringing Mastercraft Bamboo Monitor Riser out in the world?</p>
        </div>

        <div class="pledge-option --no-pledge" :class="{active : !readPledgeSelected}" @click="pledgeActive(0)">      
          <div>
            <input type="radio" name="pledge-option" id="no-reward" :checked="!readPledgeSelected">
            <div class="pledge-option__radio"></div>  
            <div class="pledge-option__content">
              <label>Pledge with no reward</label>
              <p>Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.</p>
            </div>
          </div>          
         
          <div class="pledge-option__cta"> 
            <label>Enter your pledge</label>          
            <div class="cta">         
              <input type="number" :value="0" :min="0" @keyup="removeError">
              <Button text="Continue" @click="pledgeMade(0)"/>
            </div>          
          </div>
        </div>

        <div :key="stand.id" v-for="stand in Stands" class="pledge-option" :class="{disabled : !stand.remaining, active : readPledgeSelected == stand.id}" @click="pledgeActive(stand.id)">
          <div>
            <input type="radio" name="pledge-option" :id="stand.id" :checked="readPledgeSelected == stand.id">  
            <div class="pledge-option__radio"></div>  
            <div class="pledge-option__content">
              <label><i>{{stand.name}}<b>Pledge &dollar;{{stand.minPledge}} or more</b></i> <span>{{readRemaining[stand.id-1]}}<i>left</i></span></label>
              <p>{{stand.description}}</p>
            </div>
          </div> 

          <div class="pledge-option__cta">
            <label>Enter your pledge</label>
            <div class="cta">
              <input type="number" :value="stand.minPledge" :min="stand.minPledge" @keyup="removeError">
              <Button text="Continue" @click="pledgeMade(stand.id)"/>
            </div>          
          </div>
          
        </div>

      </div>  
    </transition>   

    <transition name="fade">
      <div class="modal__success" v-on:click.stop v-if="readPledgeMade">
        <img src="../assets/icons/icon-check.svg" alt="pledge success">
        <label>Thanks for your support!</label>
        <p>Your pledge brings us one step closer to sharing Mastercraft Bamboo Monitor Riser worldwide. You will get an email once our campaign is completed.</p>
        <Button text="Got it!" @click="pledgeReset"></Button>
      </div>
    </transition>

  </div>
</template>

<script>
  import Stands from "../json/stands.json";
  import Button from '@/components/Button.vue';

  export default { 
    name: 'Modal',
    components: {Button},
    props: {
    
    },
    data() {
      return {
        Stands     
      };
    },
    methods:{
      closeModal(){
        let body = document.body;      
        body.classList.remove("lock");    
        body.style.top = "";  
        this.$store.dispatch("closeModal");    
        window.scrollTo(0, this.$store.state.scrollAmount);
      },
      pledgeSelected(stand){    
        let body = document.body;
        let scrollAmount = window.scrollY;         
        body.classList.add("lock");       
        body.style.top = -scrollAmount+"px";
        this.$store.dispatch("pledgeSelected", {stand, scrollAmount});
      },
      pledgeMade(pledgeID){     
        let pledge = document.querySelector(".pledge-option.active input[type='number']");
        let pledgeValue = pledge.valueAsNumber;
        !pledgeValue ? (pledge.classList.add("error")) : (this.$store.dispatch("pledgeMade", {pledgeValue, pledgeID}));
      },
      pledgeReset(){   
        let body = document.body;      
        body.classList.remove("lock");    
        body.style.top = "";  
        this.$store.dispatch("pledgeReset");   
        window.scrollTo(0, this.$store.state.scrollAmount);    
      },
      pledgeActive(stand){      
        this.$store.dispatch("pledgeActive", stand); 
      },  
      removeError(){
        let pledge = document.querySelector(".pledge-option.active input[type='number']");
        pledge.classList.remove("error");
      }          
    },
    computed:{
      readPledgeModal(){
        return this.$store.state.pledgeModal;
      },
      readBookmarked(){
        return this.$store.state.bookmarked;
      },
      readPledgeSelected(){
        return this.$store.state.pledgeSelected;
      },
      readPledgeMade(){
        return this.$store.state.pledgeMade;
      },
      readRemaining(){
        return this.$store.state.pledgesRemaining
      } 
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";

  .modal{position: fixed; overflow: hidden; top:0; right:0; bottom:0; left:0; background-color: rgba($black, 0.5); padding: 184px 0 100px; opacity: 0; pointer-events: none; transition: opacity 0.2s ease-out; will-change: opacity; transition-delay: 0.2s;
    .modal__content{background-color: white; padding: 51px 48px 48px; border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 8px; width: 89.5vw; max-width: 730px; margin: 0 auto; position: relative; transition: opacity .2s ease-out, transform .2s ease-out; will-change: opacity, transform;
      .close-modal{position: absolute; top:31px; right:30px; cursor: pointer;
        path{transition: fill 0.2s;}
        &:hover{         
          path{fill:black;}         
        }
        @include mq(720){right:22px;}
      }      
      .modal__header{
        h3{@include font(2.4, 24, 0, $black, 700);}
        p{@include font(1.6, 30, 0, $darkGray); margin: 18px 0 32px;}
      }
      .pledge-option{outline: 1px solid #d9d9d9; border-radius: 8px; margin-bottom: 28px; position: relative; transition:  0.2s;
        &>div{display: flex; padding-bottom: 33px; padding-right: 25px; padding-left: 25px; position: relative; padding-top: 31px;
          @include mq(720){padding-bottom: 70px;}
          @include mq(575){padding-top: 24px;}
        }
        input[type="radio"]{position: absolute; z-index: 1; width: 100%; height: 100%; margin: 0; opacity: 0; top: 0; right: 0; bottom: 0; left: 0; cursor: pointer;     
          &:checked{
            &+.pledge-option__radio{
              &:after{background-color: $cyan; transform: translate(-50%, -50%) scale(1);}
            }
          }          
        } 
        .pledge-option__radio{height: 24px; min-width: 24px; border: 1px solid #d9d9d9; border-radius: 100%; cursor: pointer; margin: -1px 16px 0 0; position: relative; transition: border-color 0.2s;
          &:after{content: ""; height: 12px; width: 12px; border-radius: 100%; background-color: white; position: absolute; top:50%; left:50%; transform: translate(-50%, -50%) scale(0); transition: transform 0.2s;}
          @include mq(720){margin-top: 10px;}
          @include mq(575){margin: 9px 16px 0 0;}
        }
        .pledge-option__content{
          i{font-style: normal;}
          label{@include font(1.6, 20, 0, black, 700); display: flex; align-items: center; justify-content: space-between; transition: color 0.2s;
            b{@include font(1.6, 20, 0, $cyan, 500); margin-left: 16px;}
            span{@include font(1.8, 20, 0, black, 700);display: flex; align-items: center;
              i{@include font(1.5, 20, 0, $darkGray); margin-left: 11px;}
            }
          }
          p{@include font(1.5, 28, 0, $darkGray); margin: 18px 0 0px;}
          @include mq(720){
            label{
              span{position: absolute; bottom: 30px; left: 75px;}
              i{
                b{display: block; margin: 5px 0 0 0;}
              }
            }
          }
          @include mq(575){
            label{font-size: 1.4rem;
              span{left:25px;}
              b{font-size: 1.4rem; margin-top: 2px !important;}
            }
            p{margin-left: -39px; font-size: 1.4rem; line-height: 24px;}
          }
        }
        .pledge-option__cta{align-items: center; justify-content: space-between; padding: 0 25px 0; overflow: hidden; height: 0; transition: height 0.2s ease-out;
          label{@include font(1.5, 20, 0, $darkGray);}
          .cta{display: flex; align-items: center; position: relative;
            input[type="number"]{-moz-appearance: textfield; width: 60px; height: 48px; border-radius: 40px; border:1px solid #d9d9d9; min-width: 103px; margin-right: 16px; @include font(1.4, 14, 0, black, 700); padding: 0 20px 0 41px; caret-color: $cyan; transition: border-color 0.2s;
              &:focus-visible, &:hover{outline:none; border-color: $cyan;}
              &::-webkit-outer-spin-button, &::-webkit-inner-spin-button{-webkit-appearance: none; margin: 0;}      
              &.error{border-color: #f13232;}        
            }
            button{font-size: 1.4rem; padding: 14px 24px;}
            &:after{content:"$"; position: absolute; @include font(1.4, 20, 0, black, 700); opacity: 0.5; top: 50%; left: 24px; transform: translateY(-50%);}
          }         

          @include mq(575){flex-direction: column; 
            label{padding-top: 19px;}
            .cta{flex:1; justify-content: space-between; width: 100%;}           
          }
          @include mq(360){padding: 0 8px 0;}
        }
        &.disabled{opacity: 0.5; pointer-events: none; cursor: default;}
        &.active{outline-color: $cyan;
          .pledge-option__cta{height: 96px; border-top:1px solid #d9d9d9;
            @include mq(575){height: 140px;}
          }        
        }
        &:last-child{margin-bottom: 0;}
        &:hover{
          .pledge-option__radio{border-color: $cyan;}
          .pledge-option__content{
            label{color:$cyan;}
          }
        }
      }  

      @include mq(600){width: 91.6vw; padding: 32px 24px 32px;
       .modal__header{
          h3{font-size: 1.8rem;}
          p{font-size: 1.4rem; line-height: 24px; margin: 13px 0 23px;}
       }
      }  
    }
    
    &.active{opacity: 1; pointer-events: all; z-index: 9999; transition-delay: 0s; overflow: auto;}   

    .modal__success{text-align: center; background-color: white; padding: 51px 48px 40px; border: 1px solid rgba(0, 0, 0, 0.05); border-radius: 8px; width: 89.5vw; max-width: 540px; margin: 0 auto; position: relative; transition: opacity .2s ease-out, transform .2s ease-out; will-change: opacity, transform; transition-delay: 0.1s;
      img{margin: 0 auto; width: 90px;}
      label{@include font(2.4, 28, 0, $black, 700); display: block; margin: 46px 0 15px;}
      p{@include font(1.6, 30, 0, $darkGray);}
      button{margin: 32px auto 0;}      
    
      @include mq(600){width: 91.6vw; padding: 32px 24px 40px;
        img{width: 60px;}
        label{font-size: 1.8rem; margin: 21px 0 15px;}
        p{font-size: 1.4rem; line-height: 24px;}
      }
    }

    @include mq(600){padding-top: 120px;}      
  }

  .fade-enter-active, .fade-leave-active{transform: translate3d(0, 25px, 0); opacity: 0;}
  .fade-enter, .fade-leave-to{opacity: 0;}
</style>
