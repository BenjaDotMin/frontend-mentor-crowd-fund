<template>
  <main>
    <Header/>

    <router-view/>

    <Modal/>
  </main> 
</template>

<script>
  import Header from "./components/Header";
  import Modal from "./components/Modal";

  export default{
    name: 'App',
    components:{Header, Modal}   
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Commissioner:wght@400;500;700&display=swap'); 
  *{box-sizing: border-box;}
  html{font-size: 62.5%;}
  body{margin: 0; font-family: 'Commissioner', sans-serif; background-color: #fafafa;
    &.lock{position: fixed; overflow: hidden; width: 100%; padding-right: 17px;}
  }
  p, h1, h2, h3, h4, h5{margin: 0;}
  a{text-decoration: none;}
  ul{margin: 0; padding: 0;
    li{list-style: none;}
  }
  #app {-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;}
  main{
    .container{width: 100%; max-width: 1110px; margin: 0 auto;}
    img{display: block; max-width: 100%;}
  }
</style>
