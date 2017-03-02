<template>

  <div id="#app">
      <div class="bar" style="background-color: white; text-align: center;">
        <p class="appName"><b>MINIMALISMO</b></p>
        <div class="i">
            <router-link  to="/" v-if="$route.name !== 'landing-page'">
              <icon style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="back" :w="14"></icon>
            </router-link>
            <router-link  to="/info" v-if="$route.name === 'landing-page'">
              <icon  style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="info" :w="14"></icon>
            </router-link>
              <button v-if="$route.name === 'note'" v-on:click="removeNote($route.params.id)"><icon style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="delete"  :w="14"></icon></button>
              <span v-if="$route.name === 'note'">
                <button v-on:click="likeNote($route.params.id)">
                  <icon v-if="!liked" style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="favor"  :w="14"></icon>
                </button>
                <button v-if="liked" v-on:click="likeNote($route.params.id)">
                  <icon style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="favor_fill"  :w="14"></icon>
                </button>

              </span>
              <router-link v-if="$route.name === 'note'" :to="'/edit/'+ $route.params.id"><icon style="-webkit-app-region: no-drag; -webkit-user-select: none; float: right; margin: 5px 10px 0 0" name="edit"  :w="14"></icon></router-link>
        </div>
      </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  import es from 'electron-storage'
  import vueAlert from 'vue-alert-go'
  export default {
    data(){
      return{
        liked: false
      }
    },
    mounted(){
      es.get('notes',(err, data)=>{
        if(!err){
          for(let i; i < data.notes.length; i++){
            if(data.notes[i].created == $route.params.id){
              if(data.notes[i].liked){
                this.liked = true
              }
            }
          }
        }
      })
    },
    store,
    methods: {
      removeNote: function(id){
        es.get("notes", (err, data)=>{
          let d = data;
          for (let i = 0; i < data.notes.length; i++) {
            if (data.notes[i].created == id) {
              d.notes.splice(i,1)
              this.notes = [];
              this.notes = d.notes;
              console.log(d.notes)
              es.set("notes", d, (err)=>{
                if(err){

                }else{
                  vueAlert({
                                title: '',
                                msg: 'Note Removed!',
                                align: 'center', 
                                animate: 'bound',
                                yesBtnText: "Home"
                            })
                }
              })
              
            }
          
        }
        })
      },
      cs: function(){console.log("cs"); this.liked = true},
      editNote: function(id){
        console.log(id)
        this.$router.go('edit/'+ id)
      },
      likeNote: function(id){
        es.get("notes", (err, data)=>{
          if(!err){
            let d = data;
            for(let i; i < d.notes.length; i++){
              if(d.notes.length == $route.params.id){
                console.log("like")
                d.notes[i].liked = true
                this.liked = true
                es.set('notes', d)
              }
            }
          }
        })
      }
    }
  }
</script>
<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300,400,700);

  * {
    margin: 0;
    padding: 0;
  }

:not(input):not(textarea),
:not(input):not(textarea)::after,
:not(input):not(textarea)::before {
    -webkit-user-select: none;
    user-select: none;
    cursor: default;
}

  html,
  body { height: 100%; 
  font-family: Lato, Helvetica, sans-serif    
  }

/*  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    justify-content: center;
    text-align: center;
  }*/

    .appName{
      font-size: 8px;
      opacity: 1;
      font-weight: 700;
      position: fixed;
      width: 100vw;
      text-align: center;
      margin: auto;
      padding: 7px 0;
      
      z-index: 99;
      background: white
    }

    .bar{
    -webkit-app-region: drag;
    height: 20px;
    background: white;
    width: 100%;
  }

  .i{
    display: inline-block;
    z-index: 101;
    position: fixed;
    top: 0;
    right: 0;
    float: right;
  }

  .i button{
    border: 0;
    background: white;
  }

  button:focus{
    outline: none;
  }
</style>
