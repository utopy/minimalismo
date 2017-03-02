<template>
<div class="container">
    <input type="text" placeholder="NEW NOTE" class="title" v-model="t">
    <textarea class="ta" placeholder="TEXT GOES HERE..." v-model="m"></textarea>
    <button v-on:click="saveNote">Confirm</button>
</div>
</template>
<script>
import autosize from 'autosize'
import es from 'electron-storage'
import vueAlert from 'vue-alert-go'
export default{
    data(){
        return{
            t: null,
            m: null
        }
    },
    methods:{
        saveNote: function(){
            console.log("click")
            es.get("notes", (err, data)=>{
                let d = data
                if(err){
                    console.log(err)
                } else {
                    for(let i = 0; i < d.notes.length ; i++){
                        console.log(d)
                        if(d.notes[i].created == this.$route.params.id){
                            d.notes[i].edited = Date.now();
                            d.notes[i].title = this.t;
                            d.notes[i].text = this.m;
                            es.set('notes', d)
                            vueAlert({
                                title: '',
                                msg: 'Note Edited!',
                                align: 'center', 
                                animate: 'bound',
                                yesBtnText: "Home"
                            })
                        }
                    }
                }
            })
        }
    },
    mounted(){
        this.m = ""
        es.get('notes', (err, data)=>{
            if(!err){
                for (let i = 0; i < data.notes.length; i++) {
                    if(this.$route.params.id == data.notes[i].created){
                        this.t = data.notes[i].title.toUpperCase()
                        this.m = data.notes[i].text
                        
                        

                    }
                }
            }
        })

        
    }
}
</script>
<style scoped>
    .title{
        width: 60%;
        height: 10px;
        border: 0;
        border-bottom: 1px solid black;
        padding: 20px;
        display: block;
        margin: auto;
    }
    .title:focus{
        outline: none;
    }
    .container{
        width: 100vw;
    }

    .ta{
        width: 80%;
        display: block;
        margin: auto;
        margin-top: 40px;
        outline: none;
        border: none;
        font-family: 'Lato', Helvetica, Arial;
        margin-bottom: 25px;
        overflow: hidden;
        overflow-y: scroll !important;
        height: 70vh;
        padding-bottom: 20px;
    }
    button{
        width: 100px;
        border: none;
        position: fixed;
        bottom: 0;
        right: 0;
        margin: 20px;
        padding: 5px;
        background: black;
        color: white;
        border-radius: 25px;
    }
    button:focus{
        outline: none;
    }

</style>