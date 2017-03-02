const autosize = require("autosize")
const es = require('electron-storage')
const ipc = require('electron').ipcRenderer;
const vueAlert = require('vue-alert-go')
autosize(document.querySelector('textarea'));
let title = document.getElementById('title');
let body = document.getElementById('body');

function saveNote() {
    console.log(title.value)
    es.get('notes', (err, data) => {
        if (err) {
            console.log(err)
        }
        let d = data;
        let i = {
            title: title.value,
            text: body.value,
            created: Date.now()
        }
        d.notes.push(i)
        es.set('notes', d, (err) => {
            if (err) {
                console.log(err)
            }

            vueAlert({
                msg: 'Note Created!',
                onClickYesBtn() {
                    ipc.send('updateNotes')
                    ipc.send('closeTray')
                    title.value = "";
                    body.value = ""
                },
                align: 'center', 
                animate: 'bound',
                yesBtnText: "Close",
                style: {
                    box: {
                        padding: '5px',
                    },
                    textColor: 'black'
                },
            })
        })
    })
}