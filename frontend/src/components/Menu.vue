<template>
    <div class="plane-nav">
        <button class="logout-button" @click="logout"><span class="logout-text">wyloguj</span></button> 
        <p class="nav-title">BTech</p>
        <div class="nav-user">
            <img class="nav-user-img" width="130px" :src="userData.image">
        </div>
        <nav class="nav">
            <ul class="nav-list">
                <li>
                    <router-link class="nav-router-link" to="/profile">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_profile-32_wh.png">
                            <p>{{ $t("header.profile") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/dashboard">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_home_32_wh.png">
                            <p>{{ $t("header.home") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/news">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_docu_32_wh.png">
                            <p>{{ $t("header.news") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/calendar">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_calendar_32 (2).png">
                            <p>{{ $t("header.calendar") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link"  to="/employees">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_docu_32_wh.png">
                            <p>{{ $t("header.employees") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/informations">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if_docu_32_wh.png">
                            <p>{{ $t("header.informations") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/files">
                        <button class="nav-item">
                            <img class="nav-item-img" src="../assets/images/nav/if-files_32_wh.png">
                            <p>{{ $t("header.documents") }}</p>
                        </button>
                    </router-link>
                </li>
                <li>
                    <router-link class="nav-router-link" to="/availability">
                        <button class="nav-item">
                             <img class="nav-item-img" src="../assets/images/nav/if-files_32_wh.png">
                             <p>{{ $t("header.availability") }}</p>
                        </button>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
computed: {
    ...mapGetters({
      userData: 'userData',
    })
  },
  methods: {
     logout() {
        this.$store.dispatch('logout')
     }
    }
}

</script>