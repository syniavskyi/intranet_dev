<template>
 <div class="availability-tile ava-tile-2">
                        <div class="availability-tile-header">
                            <div class="ava-tile-header-title">
                                <h2>Dodaj wpis</h2>
                                <div class="availability-tile-underscore"></div>
                            </div>
                            <!-- <button class="ava-button ava-button-add" @click="showAddProjectDialog = true"> Dodaj projekt </button> -->
                        </div>
                        <div class="availability-tile-content">
                            <div id="add-project-dialog">
                                <div class="ava-add-1">
                                    <div class="ava-div-select-cool">
                                        <v-date-picker required class="ava-input-range-wide" popoverDirection="top" is-expanded mode="range">
                                            <input class="ava-input-range-wide" />
                                        </v-date-picker>
                                        <label class="ava-input-label-cool">{{ $t("label.dates") }}</label>
                                    </div>
                                </div>
                                <div class="ava-add-2">
                                    <div class="ava-div-input-cool" v-if="selectedType == 'OT'">
                                        <textarea class="ava-textarea" required maxlength="50" />
                                        <label class="ava-select-label-cool">Uwagi</label>
                                    </div>

                                    <div class="ava-div-buttons">
                                        <button class="ava-button" >{{ $t("button.cancel") }}</button>
                                        <button class="ava-button ava-button-edit" >Dodaj wpis</button>
                                    </div>
                                </div>

                            </div>
                        </div>
  </div>    
</template>
<script>
export default {
    props: ['selected-type']
};
</script>

