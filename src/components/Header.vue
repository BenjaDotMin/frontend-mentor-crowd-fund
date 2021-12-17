<template>
  <div class="hero" :class="{active : readMobileMenu}">
    <header class="header">
      <a href="/">
        <img src="../assets/logo.svg" alt="Crowdfund">  
      </a>     
      <nav :class="{active : readMobileMenu}">
          <ul>
            <li>About</li>
            <li>Discover</li>
            <li>Get Started</li>
          </ul>
      </nav> 
      <img class="mobile-menu" src="../assets/icons/icon-hamburger.svg" alt="mobile menu" @click="mobileMenu"> 
    </header>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    props: {},
    data() {
      return {};
    },
    methods:{
      mobileMenu(){        
        this.$store.dispatch("mobileMenu");
      } 
    },
    computed: {
      readMobileMenu(){
        return this.$store.state.mobileMenu;
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../styles/_colors.scss";
  @import "../styles/_mixins.scss";
 .hero{height: 400px; background: url("../assets/image-hero-desktop.jpg") no-repeat; background-size: cover; position: relative;
    .header{display: flex; justify-content: space-between; align-items: flex-end; height: 68px; width: 100%; max-width: 1190px; margin: 0 auto; padding: 0 40px; position: relative; z-index: 2;
      img{width: 130px;}
      nav{
        ul{display: flex; align-items: flex-end; gap: 33.6px; height: 100%;
          li{@include font(1.3, 19, 0, white, 500); cursor: pointer;}
        }
      }
      .mobile-menu{width: 16px; margin-bottom: 1px;
        @media(min-width:481px){display: none;}
      }
    }
    &:after{content:""; height: 128px; position: absolute; z-index: 1; top:0; left:0; right:0; bottom:0; background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.0001) 100%); opacity: 0.6; transition: height 0.3s; transition-delay: .3s;}
   
    @include mq(600){height: 340px;
      .header{padding: 0 24px;}
    }

    @include mq(480){
      &.active{
        &:after{height: 100vh; transition-delay: 0s;}
      }
      .header{height: 52px;
        nav{position: fixed; z-index: 9998; opacity: 0; pointer-events: none; transform: translateY(10px); background-color: white; left: 24px; right:24px; top:84px; border-radius: 8px; padding: 0 24px; transition: opacity 0.5s, transform 0.5s; transition-delay: 0s;
          ul{flex-direction: column; align-items: unset; justify-content: center; gap:0;
            li{@include font(1.8, 19, 0, $black, 500); border-bottom:1px solid rgba(#2F2F2F, 0.15); padding: 25px 0;}
          }
          &.active{opacity: 1; pointer-events: all; transform: translateY(0); transition-delay: 0.2s;}
        }
      }
    }
  }  
</style>
