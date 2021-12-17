<template>
  <div class="home">    
    <section class="home__header">
      <div class="content">
        <div class="content__header">        
          <h1>Mastercraft Bamboo Monitor Riser</h1>
          <p>A beautiful &amp; handcrafted monitor stand to reduce neck and eye strain.</p>

          <div class="content__cta">
            <Button text="Back this project" @click="pledgeSelected(0)"/>
            <Button :text="bookmarked ? 'Bookmarked' : 'Bookmark'" bookmark @click="bookmark" :class="{active : bookmarked}"/>
          </div>        
        </div>        
      </div>
      <img class="mastercraft-logo" src="../assets/logo-mastercraft.svg" alt="mastercraft" >    
    </section>  

    <section class="pledge__stats">
      <div class="pledge__stat">
        <label>&dollar;{{backedFunds}}</label>
        <span>of &dollar;100,000 backed</span>
      </div>
      <div class="pledge__stat">
        <label>{{totalBackers}}</label>
        <span>total backers</span>
      </div>
      <div class="pledge__stat">
        <label>56</label>
        <span>days left</span>
      </div>     

      <ProgressBar/>
    </section> 

    <section class="pledge">
      <h2>About this project</h2>

      <p>The Mastercraft Bamboo Monitor Riser is a sturdy and stylish platform that elevates your screen to a more comfortable viewing height. Placing your monitor at eye level has the potential to improve your posture and make you more comfortable while at work, helping you stay focused on the task at hand.</p>
      <p>Featuring artisan craftsmanship, the simplicity of design creates extra desk space below your computer to allow notepads, pens, and USB sticks to be stored under the stand.</p>
    
    <div class="pledge__stands">
      <Stand :key="stand.id" v-for="stand in Stands" :stand="stand"/>
    </div>
    </section>

  </div> 
</template>

<script>
  import Stands from "../json/stands.json";
  import Button from "../components/Button";
  import ProgressBar from "../components/ProgressBar";
  import Stand from "../components/Stand";

  export default {
    name: 'Home', 
    props: {},
    components:{Button, ProgressBar, Stand},
    data() {
      return {
        Stands
      };
    },
    methods:{
      pledgeSelected(stand){ 
        let body = document.body;
        let scrollAmount = window.scrollY;         
        body.classList.add("lock");       
        body.style.top = -scrollAmount+"px";
        this.$store.dispatch("pledgeSelected", {stand, scrollAmount});
      },
      bookmark(){  
        this.$store.dispatch("bookmark");
      },
    },
    computed:{
      totalBackers(){
        return this.$store.state.totalBackers.toLocaleString();
      },
      backedFunds(){
        return this.$store.state.backedFunds.toLocaleString();;
      },
      bookmarked(){
        return this.$store.state.bookmarked;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";

  .home{padding: 0 40px 124px 40px; max-width: 810px; margin: 0 auto;
    &>section{width: 100%; background-color: white; border-radius: 8px; border: 1px solid rgba(0, 0, 0, 0.07);}
    .home__header{margin: -92px auto 0; padding:55px 47px 8px; position: relative; margin-bottom: 23px;
      .mastercraft-logo{position: absolute; left:50%; top:-1px; transform: translate(-50%, -50%)}
      .content{
        .content__header{ 
          h1{@include font(2.8, 34, 0, $black, 700); text-align: center; margin-left: 2px;}
          p{@include font(1.6, 20, 0, $darkGray); text-align: center; margin-top: 15px; margin-left: 2px;}
          .content__cta{display: flex; align-items: center; justify-content: space-between; padding: 40px 1px 40px 0;}
        }      
      }  
      @include mq(720){padding: 55px 25px 7px;}     
    } 

    .pledge__stats{padding: 48px 47px; margin:0 auto; display: flex; gap: 37px 47px; flex-wrap: wrap; margin-bottom: 23px;
      .pledge__stat{border-right: 1px solid rgba(black, 0.15); flex:1; padding-top: 7px;
        label{@include font(3.2, 26, 0, $black, 700); display: block; margin-bottom: 19px;}
        span{@include font(1.5, 11, 0, $darkGray);}
        &:last-of-type{border-right: none;}
      }
      @include mq(830){gap:38px 0; 
        .pledge__stat{text-align: center; border-right: none;
          label{font-size: 2.8rem; margin-bottom: 12px;}
        }
      }
      @include mq(720){flex-direction: column; padding: 33px 25px 40px; gap:50px 0; 
        .pledge__stat{position: relative;
          label{font-size: 3.2rem; margin-bottom: 19px;}
          &:after{content: ""; width:80px; height: 1px; background-color: black; position: absolute; bottom:-30px; left:50%; transform: translateX(-50%); opacity: 0.15;}
          &:last-of-type{
            &:after{content:none;}
          }
        }
      }
    }

    .pledge{padding: 48px 47px; margin:0 auto;
      h2{@include font(2, 24, 0, $black, 700); margin-bottom: 35px;}
      p{@include font(1.6, 30, 0, $darkGray); margin-bottom: 30px;
        &:last-of-type{margin-bottom: 0;}
      }
      @include mq(720){padding: 40px 25px;}
      @include mq(600){
        h2{font-size: 1.8rem; margin-bottom: 18px;}
        p{font-size: 1.4rem; line-height: 24px; margin-bottom: 18px;}
      }
    }

    .pledge__stands{margin: 40px 0 0; display: grid; gap: 24px;
      @include mq(600){margin: 32px 0 0;}
    }

    @include mq(600){padding: 0 24px 60px 24px;
      .home__header{padding-top: 45px;
        .content{
          .content__header{
            h1{font-size: 2rem;}
            p{font-size: 1.4rem; line-height: 24px;}
            .content__cta{padding: 30px 0;}
          }
        }
      }
    }  

    @include mq(510){
      .home__header{
        .content{
          .content__header{
            .content__cta{padding: 20px 0;}
          }
        }
      }
    }  
  }
</style>
