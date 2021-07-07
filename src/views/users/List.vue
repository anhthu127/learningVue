<template>
  <a-row>
    <a-col :span="18" :offset="3">
      <a-button :span="24" @click="showCreate = true" style="margin-bottom: 8px"
        >Add
      </a-button>
    </a-col>
    <a-col :span="18" :offset="3">
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #action="{ record }">
          <span>
            <a @click="openEditModal(record.id)"> Edit </a>
            <a-divider type="vertical" />
            <a @click="deleteUser(record.id)"> Delete </a>
          </span>
        </template>
      </a-table>
    </a-col>

    <a-modal title="Add User" v-model:visible="showCreate" :footer="null">
      <create @close="showCreate = false" @completed="getUsers()"></create>
    </a-modal>

    <a-modal title="Edit User" v-model:visible="showEdit" :footer="null">
      <edit @close="showEdit = false" @completed="getUsers()"></edit>
    </a-modal>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, provide, ref } from "vue";
import Create from "./Create.vue";
import Edit from "./Edit.vue";
import { Modal } from "ant-design-vue";
import { userStore } from "@/store/modules/User";

export default defineComponent({
  components: {
    Create,
    Edit,
  },

  setup() {
    const store = userStore();
    const showCreate = ref(false);
    const showEdit = ref(false);

    const columns = [
      {
        title: "ID",
        dataIndex: "id",
        width: "15%",
      },
      {
        title: "Name",
        dataIndex: "name",
        width: "25%",
      },
      {
        title: "Email",
        dataIndex: "email",
        width: "30%",
      },
      {
        title: "Action",
        dataIndex: "action",
        slots: { customRender: "action" },
      },
    ];

    const openEditModal = async (id: number) => {
      await store.getUserApi(id);
      showEdit.value = true;
    };

    const deleteUser = (id: number) => {
      Modal.confirm({
        title: "Do you want to delete this item?",
        onOk: async () => {
          await store.deleteUserApi(id);
          await store.getUserListApi();
        },
        class: "test",
      });
    };

    onMounted(store.getUserListApi);

    provide("currentUser", store.user);

    return {
      dataSource: store.users,
      columns,
      getUsers: store.getUserListApi,
      deleteUser,
      showCreate,
      showEdit,
      openEditModal,
    };
  },
});
</script>
