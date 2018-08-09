<template>

<div class="profile-tile">
    <div class="profile-tile-header">
      <div class="profile-tile-header-row">
        <h2 class="profile-tile-title">Umiejętności</h2>
        <div class="profile-table-buttons">
          <button class="profile-edit-experience" v-if="!editMode" @click="edit">{{ $t("button.edit") }}</button>
          <button class="profile-edit-experience-e" v-if="editMode" @click="cancel">{{ $t("button.cancel") }}</button>
           <button class="profile-edit-experience-e" v-if="editMode" @click="save">{{ $t("button.save") }}</button>
        </div>
      </div>
      <div class="tile-underscore"></div>
    </div>
    <!-- remove style after adding appropriate classes, it is only for testing purposes  -->
    <div class="profile-tile-content">
        <div>
            <!-- languages -->
        </div>
        <div>
            <!-- Sap modules -->
            <p>Doświadczenie modułowe SAP</p>
            <select v-if="editMode" @change="addModule">
                 <option disabled selected value>{{ $t("table.addModule") }}:</option>
                 <option v-for="sapModule in modulesList" :key="sapModule.id" :value="sapModule.id" :id="sapModule.id" > {{ sapModule.name }}</option>
            </select>
            <button :disabled="!editMode" v-for="sapModule in UserSkills.SapModules" :key="sapModule"  @click="removeModuleForSkills(sapModule)">{{sapModule}}</button>
        </div>
        <div>
            <!-- Języki programowania -->
            <p>Języki programowania</p>
            <input v-if="editMode" v-model="newProgramLang"/><button v-if="editMode" @click="addProgramLang">+</button>
            <button :disabled="!editMode" v-for="lang in UserSkills.ProgramLang" :key="lang"  @click="removeProgramLang(lang)">{{lang}}</button>
        </div>
        <div>
            <!-- Technologie -->
            <p>Technologie</p>
            <input v-if="editMode" v-model="newTechnology"/> <button v-if="editMode" @click="addTechnology">+</button>
            <button :disabled="!editMode" v-for="tech in UserSkills.Technologies" :key="tech"  @click="removeTechnology(tech)">{{tech}}</button>
        </div>
        <div>
            <!-- Extensions -->
            <p>Rozszerzenia</p>
            <input v-if="editMode" v-model="newExtension"/> <button v-if="editMode" @click="addExtension">+</button>
            <button :disabled="!editMode" v-for="ext in UserSkills.Extensions" :key="ext"  @click="removeExtension(ext)">{{ext}}</button>
        </div>
        <div>
            <!-- Additional experience -->
            <p>Dodatkowe doświadczenie</p>
            <input v-if="editMode" v-model="newAdditional"/> <button v-if="editMode" @click="addAdditional">+</button>
            <button :disabled="!editMode" v-for="add in UserSkills.AdditionalSkills" :key="add"  @click="removeAdditional(add)">{{add}}</button>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      editMode: false,
      _beforeEditingCache: null,
      newSapModule: null,
      newProgramLang: null,
      newTechnology: null,
      newExtension: null,
      newAdditional: null
    };
  },
  computed: {
    ...mapGetters({
      UserSkills: "getUserSkills",
      modulesList: "getModulesList"
    })
  },
  methods: {
    ...mapActions([
      "removeModuleForSkills",
      "removeSkill",
    ]),
    edit() {
        this.editMode = true
        this._beforeEditingCache = JSON.parse(
        JSON.stringify(this.UserSkills)
        )
    },
    cancel() {
        
        this.$store.commit("SET_USER_SKILLS", this._beforeEditingCache);
        this.editMode = false
    },
    save(){
       this.$store.dispatch('saveUserSkills')
       this._beforeEditingCache = JSON.parse(
        JSON.stringify(this.UserSkills)
        )
        this.editMode = false
    
    },
    addModule(value) {
      const moduleId = value.target.value;
      this.$store.dispatch("addModuleForSkills", moduleId);
    },
    addProgramLang() {
    if (this.newProgramLang){
     const data = {
        name: "ProgramLang",
        value: this.newProgramLang
      };
      this.$store.dispatch("addSkill", data);
      this.newProgramLang = null;
    }
    },
    removeProgramLang(lang) {
     const data = {
        name: "ProgramLang",
        value: lang
      };
      this.$store.dispatch("removeSkill", data);
    },
    addTechnology() {
    if (this.newTechnology){
    const data = {
        name: "Technologies",
        value: this.newTechnology
      };
      this.$store.dispatch("addSkill", data);
      this.newTechnology = null;
    }
    },
    removeTechnology(tech) {
     const data = {
        name: "Technologies",
        value: tech
      };
      this.$store.dispatch("removeSkill", data);
    },
    addExtension() {
    if (this.newExtension){
      const data = {
        name: "Extensions",
        value: this.newExtension
      };
      this.$store.dispatch("addSkill", data);
      this.newExtension = null;
    }
    },
    removeExtension(ext) {
     const data = {
        name: "Extensions",
        value: ext
      };
      this.$store.dispatch("removeSkill", data);
    },
    addAdditional() {
    if (this.newAdditional){    
      const data = {
        name: "AdditionalSkills",
        value: this.newAdditional
      };
      this.$store.dispatch("addSkill", data);
      this.newAdditional = null;
    }
    },
    removeAdditional(add) {
     const data = {
        name: "AdditionalSkills",
        value: add
      };
      this.$store.dispatch("removeSkill", data);
    },
  }
};
</script>
