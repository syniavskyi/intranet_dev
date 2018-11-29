<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal" role="dialog" aria-labelledby="modalTitle" aria-describedby="modalDescription">
        <header class="modal-header">
           {{ $t("header.error") }}
        </header>
        <section v-if="messageLog.length > 1" class="modal-body" v-for="(message, index) in messageLog" :key="index">
           {{index+1}}. {{message.message}}
        </section>
        <section v-else class="modal-body" v-for="(message, index) in messageLog" :key="index">
            {{message.message}}
        </section>
        <footer class="modal-footer">
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close modal">X</button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import i18n from "../../lang/lang";
export default {
     name: 'modal',
    //  props: ['message'],
    computed: Object.assign(
    mapGetters({
      messageLog: "getMessageLog",
      showModal: "getShowModal"
    }), {}),
     methods: Object.assign(
         mapActions(["closeModal"]), 
         {
         close() {
              this.message.message.showModal = false;
        }})
}
</script>
<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    font-size: 1rem;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 10px;
  }

  .btn-close {
    color: white;
    background: #22100f;
    border: 1px solid #211472;
    border-radius: 2px;
  }
</style>