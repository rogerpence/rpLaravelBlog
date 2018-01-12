<div id="modal-confirm-container" style="display:none;z-index:100000">
    <div id="vue-view">
        <h3 id="modal-title" v-text="title"></h3>
        <div id="modal-subtitle" v-text="subtitle"></div>
        <div id="modal-text" v-text="text"></div>

        <button id="submit-button"  v-on:click="submitAction" class="btn btn-success">text</button>
        <button id="cancel-button"  v-on:click="cancelAction" class="btn btn-danger">text</button>              
    </div>
</div>
