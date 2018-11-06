<template>
    <div> 
        <div class="modal-overlay"></div>
        <div class="modal-new-s">
            <div class="modal-header-new modal-advert-header">
                <h1 class="modal-title-new">{{ $t("label.addNewMessage") }}</h1>
                <div @click="close" class="modal-exit-new">&#10006;</div>
            </div>
            <div class="modal-content-new modal-advert-content">
                <div class="m-wrap">
                    <div class="cd-for-input">
                        <textarea v-model="newAdvert.Message" required class="cd-textarea ta-height"></textarea>
                        <span class="cd-span"></span>
                        <label class="cd-label">{{ $t("label.newMessage") }}</label>
                    </div>
                    <p class="table-p"> {{ $t("label.messageValidTo") }} </p>
                    <v-date-picker class="cd-range" popoverDirection="bottom" is-expanded mode="single" v-model="newAdvert.ValidTo"  :min-date="new Date()">
                        <input required v-model="newAdvert.ValidTo" value="newAdvert.ValidTo"/>
                    </v-date-picker>
                    <button :disabled="!newAdvert.Message || !newAdvert.ValidTo || newAdvert.Message === '' " @click="addNewAdvert(newAdvert)" class="button">{{ $t("button.add") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import i18n from "../../lang/lang";
import moment from "moment";

export default {
    data() {
        return {
            newAdvert: {
                Message: null,
                ValidTo: null
            }
        } 
    },
    methods: {
      ...mapActions([
      "addNewAdvert"
        ]),
        close() {
            this.$store.commit("SET_SHOW_NEW_MESSAGE_DIALOG", false)
        },
        formatDate(date) {
         return date !== null && date !== undefined
        ? moment(date).format("DD.MM.YYYY")
        : "-";
        }
    }
}
</script>

<style scoped>
.ta-height {
    max-height: 10rem;
    height: 6rem;
}

.m-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 80%;
    justify-content: space-around;
}
</style>
