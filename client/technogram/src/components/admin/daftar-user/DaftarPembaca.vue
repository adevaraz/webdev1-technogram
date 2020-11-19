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
                    v-on:keydown.enter="searchAccount"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert
              v-model="alert"
              dismissible
              type="success"
            >
              {{ message }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-simple-table class="grey lighten-5">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Id
                        </th>
                        <th class="text-left">
                            Username
                        </th>
                        <th class="text-left">
                            Email
                        </th>
                        <th class="text-left">
                            Delete
                        </th>
                        </tr>
                    </thead>
                    <transition-group tag="tbody" name="fade" mode="out-in">
                       <tr
                        v-for="item in account"
                        :key="item.id_pembaca"
                        >
                            <td>{{ item.id_pembaca }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.email }}</td>
                            <td class="text-center">
                                <v-dialog
                                    v-model="dialog"
                                    persistent
                                    max-width="290"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                            color="error"
                                            dark
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
                                            v-on:click="deleteAccount()"
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
        <v-progress-circular
          class="progressbar"
          v-if="isLoading"
          color="#E52B38"
          height="10"
          indeterminate
        ></v-progress-circular>
        <v-overlay :value="isLoading" absolute></v-overlay>
    </v-container>
</template>

<script>
import daftarPembaca from "../../../api/admin/daftarPembaca";
import {store} from '../../../store/index';
export default {
  data () {
    return {
      account: [],
      key: "",
      dialog: false,
      isLoading: false,
      id: "",
      alert: false,
      message: ""
    }
  },
  methods: {
    retrieveAccount() {
      this.isLoading = true;
      daftarPembaca.getAll()
        .then(response => {
          if(this.alert==true){
            this.alert = false;
            this.message = "";
          }
          this.account = response.data;
          console.log(response.data);
          this.isLoading = false;
          if(this.message!=""){
            this.alert = true;
          }
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
    },

    searchAccount() {
      if(this.key==""){
        this.retrieveAccount();
      }
      else{
        this.isLoading = true;
        daftarPembaca.searchBy(this.key)
        .then(response => {
          this.account = response.data;
          console.log(response.data);
          this.isLoading = false;
        })
        .catch(e => {
          console.log(e);
          this.isLoading = false;
        });
      }
    },

    deleteAccount() {
      this.isLoading = true;
      daftarPembaca.deleteBy(this.id , store.getters['admin/getToken'])
      .then(response => {
          this.message = response.message;
          this.retrieveAccount();
      })
      .catch(e => {
          console.log(e);
          this.isLoading = false;
      })
    },

    selectedAccount(id){
      this.id = id;
    }
  },
  mounted() {
    this.searchAccount();
  }
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