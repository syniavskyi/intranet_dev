<template>
                     <div class="plane-dashboard-nav">
                        <div class="dashboard-nav-title">
                            <div class="dashboard-nav-logo-continer">
                                <!-- <img class="dashboard-nav-logo"  src="../../images/nav/if_world.png"> -->
                            </div>
                            <p class="dashboard-nav-title">BTech</p>
                        </div>
                        <!-- <img class="dashboard-user-img" width="100px" src="../../images/if_users.png"> -->
                        <nav>
                            <ul>
                                <li>
                                    <router-link class="dash-nav-link" to="/profile">
                                    <button class="dashboard-nav-item dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_profile-32_wh.png"> -->
                                    {{ $t("header.profile") }}
                                    </button>
                                    </router-link>
                                </li>
                                <li>
                                    <!-- <button class="dashboard-nav-item"> -->
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_home_32_wh.png"> -->
                                        <router-link class="dash-nav-link" to="/dashboard">
                                        <button class="dashboard-nav-item dash-nav-link">
                                        {{ $t("header.home") }}
                                        </button>
                                        </router-link>
                                    <!-- </button> -->
                                </li>
                                <li>
                                    <router-link class="dash-nav-link" to="/news">
                                    <button class="dashboard-nav-item dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_docu_32_wh.png"> -->
                                     {{ $t("header.news") }}
                                    </button>
                                    </router-link>
                                </li>
                                <li>
                                     <router-link class="dash-nav-link " to="/calendar">
                                    <button class="dashboard-nav-item  dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_docu_32_wh.png"> -->
                                    {{ $t("header.calendar") }}
                                    </button>
                                     </router-link>
                                </li>
                                <li>
                                     <router-link class="dash-nav-link" to="/employees">
                                    <button class="dashboard-nav-item dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_docu_32_wh.png"> -->
                                    {{ $t("header.employees") }}
                                    </button>
                                     </router-link>
                                </li>
                                <li>
                                     <router-link class="dash-nav-link" to="/informations">
                                    <button class="dashboard-nav-item dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if_docu_32_wh.png"> -->
                                    {{ $t("header.informations") }}
                                    </button>
                                     </router-link>
                                </li>
                                <li>
                                     <router-link class="dash-nav-link" to="/files">
                                    <button class="dashboard-nav-item dash-nav-link">
                                        <!-- <img class="dash-nav-img" src="../../images/nav/if-files_32_wh.png"> -->
                                    {{ $t("header.files") }}
                                    </button>
                                    </router-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
</template>
