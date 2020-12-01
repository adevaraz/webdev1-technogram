<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="text-h4">Daftar Akun Pembaca</div>
      </v-col>
      <v-col cols="4">
        <v-text-field
          class="field-size"
          label="Search by Username/Email"
          outlined
          append-icon="mdi-magnify"
          v-model="key"
          v-on:keydown.enter="handle_search_enter"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-alert v-model="alert" dismissible type="success">
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-select
          v-model="perPage"
          :items="pageSizes"
          label="Items per Page"
          @change="handlePageSizeChange"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-simple-table class="grey lighten-5">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Id</th>
                <th class="text-left">Username</th>
                <th class="text-left">Email</th>
                <th class="text-left">Delete</th>
              </tr>
            </thead>
            <transition-group tag="tbody" name="fade" mode="out-in">
              <tr v-for="item in account" :key="item.id_pembaca">
                <td>{{ item.id_pembaca }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.email }}</td>
                <td class="text-center">
                  <v-dialog
                    v-model="dialog"
                    persistent
                    max-width="290"
                    :retain-focus="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="error"
                        width="100px"
                        v-bind="attrs"
                        v-on="on"
                        @click="selectedAccount(item.id_pembaca)"
                      >
                        Delete
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title class="text-h6">
                        Apakah Anda yakin ingin menghapus akun ini?
                      </v-card-title>
                      <v-card-text></v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="grey darken-1"
                          text
                          @click="dialog = false"
                        >
                          Batal
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialog = false"
                          @click.prevent="deleteAccount"
                        >
                          Setuju
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </td>
              </tr>
            </transition-group>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination
          v-model="page"
          :length="totalPage"
          total-visible="7"
          color="error"
          @input="handlePageChange"
        ></v-pagination>
      </v-col>
    </v-row>
    <v-overlay :value="isLoading">
      <v-progress-circular
        indeterminate
        size="64"
        color="#E52B38"
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import daftarPembaca from "../../../api/admin/daftarPembaca";
import { store } from "../../../store/index";
export default {
  data() {
    return {
      account: [],
      key: "",
      dialog: false,
      isLoading: false,
      id: "",
      alert: false,
      message: "",
      page: 1,
      totalPage: 0,
      perPage: 5,
      pageSizes: [5, 10, 15, 20],
      totalItemInPage: 0,
    };
  },
  methods: {
    getRequestParams(key, page, perPage) {
      let params = {};

      if (key) {
        params["key"] = key;
      }

      if (page) {
        params["page"] = page;
      }

      if (perPage) {
        params["perpage"] = perPage;
      }

      return params;
    },
    retrieveAccount() {
      this.isLoading = true;
      daftarPembaca
        .getAll()
        .then((response) => {
          if (this.alert == true) {
            this.alert = false;
            this.message = "";
          }
          this.account = response.data;
          console.log(response.data);
          this.isLoading = false;
          if (this.message != "") {
            this.alert = true;
          }
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },

    searchAccount() {
      this.isLoading = true;
      const params = this.getRequestParams(this.key, this.page, this.perPage);
      daftarPembaca
        .searchBy(params)
        .then((response) => {
          this.account = response.data.rows;
          this.totalItemInPage = response.data.rows.length;
          this.totalPage = Math.ceil(response.data.count / this.perPage);
          console.log(response.data);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },

    handle_search_enter() {
      try {
        this.page = 1;
        this.searchAccount();
      } catch (error) {
        console.log(error);
      }
    },

    deleteAccount() {
      this.isLoading = true;
      daftarPembaca
        .deleteBy(this.id, store.getters["admin/getToken"])
        .then((response) => {
          this.message = response.message;
          this.totalItemInPage -= 1;
          if (this.totalItemInPage == 0) {
            this.page -= 1;
            this.totalPage -= 1;
          }
          this.searchAccount();
        })
        .catch((e) => {
          console.log(e);
          this.isLoading = false;
        });
    },

    selectedAccount(id) {
      this.id = id;
    },
    handlePageChange(value) {
      this.page = value;
      this.searchAccount();
    },

    handlePageSizeChange(size) {
      this.perPage = size;
      this.page = 1;
      this.searchAccount();
    },
  },
  mounted() {
    this.searchAccount();
  },
};
</script>

<style scoped>
.progressbar {
  position: relative;
  bottom: 50%;
  left: 50%;
}

/* Fade */
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 1s;
  opacity: 0;
}
</style>