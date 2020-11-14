<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="text-h4">Daftar Akun Pembaca</div>
            </v-col>
            <!-- <v-col cols="2">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-col> -->
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
                    <tbody>
                        <tr
                        v-for="item in account"
                        :key="item.id_pembaca"
                        >
                            <td>{{ item.id_pembaca }}</td>
                            <td>{{ item.username }}</td>
                            <td>{{ item.email }}</td>
                            <td class="text-center">
                              <v-btn
                                depressed
                                color="error"
                                v-on:click="deleteAccount(item.id_pembaca)"
                              >Delete</v-btn>
                            </td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import daftarPembaca from "../../../api/admin/daftarPembaca";
export default {
  data () {
    return {
      account: [],
      key: "",
      id: ""
    }
  },
  methods: {
    retrieveAccount() {
      daftarPembaca.getAll()
        .then(response => {
          this.account = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    searchAccount() {
      if(this.key==""){
        this.retrieveAccount();
      }
      else{
        daftarPembaca.searchBy(this.key)
        .then(response => {
          this.account = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      }
    },

    deleteAccount() {
      daftarPembaca.deleteBy(this.id);
      this.retrieveAccount();
    }
  },
  mounted() {
    this.searchAccount();
  }
};
</script>

<style scoped>
  /* .field-size {
    padding: 0 0;
    transform: scale(0.8);
    transform-origin: right;
    background-color: aquamarine;
  } */
</style>