<template>
  <div class="container">
    <div class="newNote">
    <router-link to="/new-note" style="text-decoration: none; color: black; font-weight: 300;">NEW NOTE</router-link>
  </div>
  <div v-if="hasNotes" class="notes">
    <div class="note" v-for="note in notes">
      
        <p class="title">
          <router-link style="text-decoration: none; color: black;" :to="'/note/'+note.created">{{note.title | uppercase}} </router-link>
          <button v-on:click="del(note.created)"><icon name="delete" :w="12"></icon></button>
        </p>
        <p class="created">{{note.created | date}} <span style="float:right" v-if="note.edited">edited: {{note.edited | date}}</span></p> 
        <p class="body" style="text-align: justify">{{note.text | limit}}</p>
      
    </div>
  </div>
  </div>
</template>
<script>
const ipc = require('electron').ipcRenderer
import es from 'electron-storage'
import moment from 'moment'
ipc.on('clientUpdate', (event)=>{
        console.log("received")
      })
export default{
  data(){
    return{
      hasNotes: false,
      notes: []
    }
  },
    mounted(){
      es.get("notes", (err, data)=>{
        if(err){
          console.log(err)
        } else {
          if(data.notes !== "undefined"){
            this.hasNotes = true;
            this.notes = data.notes;
            console.log(this.notes)
            this.notes = this.notes.reverse()
          }
        }
      })

      ipc.send('isHome', {isHome: true})

      
    },
    filters: {
      uppercase: function(value){
        let v = value || ""
        return v.toUpperCase()
      },
      date: function(value){
        return moment(value).format("DD MMMM YYYY")
      },
      limit: function(value){
        if(value.length > 140){
          return value.substring(0,135) + ' [...]'
        } else {
          return value
        }
      }
    },
    methods: {
      updateNotes: function(){
        es.get("notes", (err, data)=>{
          if(!err){
            this.notes = data.notes.reverse()
          }
        })
      },
      del: function(id){
        console.log(id)
        es.get("notes", (err, data)=>{
          let d = data;
          for (let i = 0; i < data.notes.length; i++) {
            if (data.notes[i].created == id) {
              d.notes.splice(i,1)
              this.notes = [];
              this.notes = d.notes;
              console.log(d.notes)
              es.set("notes", d)
            }
          
        }
        })
      }
    }
}
</script>
<style scoped>
  .container{

  }

  .notes{
    margin-top: -200px;
    text-align: center
  }

  .note{
    margin: auto;
    width: 400px;
    padding: 20px;
    text-decoration: none;

  }

  .note button{
    float: right;
    width: 10px;
    border: none;
    padding: 5px;
    height: 0;
    background: white;
    }

    .note button:focus{
      outline: none;
    }


  .newNote{
    text-align: center;
    line-height: calc(100vh - 20px)
  }

  .title{
    text-align: left;
    font-size: 12px;
    font-weight: 700;
    color: #51F5A0;

  }

  .body{
    text-align: left;
    margin-top: 5px;
    font-size: 13px;
    font-weight: 300;
    color:black;
  }

  .created{
    font-size: 8px;
    font-weight: bold;
    text-align: left;
    padding-top: 5px;
    color: black;
    opacity: 0.3;
  }
</style>