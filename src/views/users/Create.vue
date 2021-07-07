<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-item label="Name" name="name">
      <a-input v-model:value="formState.name" />
    </a-form-item>
    <a-form-item label="Email" name="email">
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }"
    >
      <a-button @click="closeModal">Cancel</a-button>
      <a-button style="margin-left: 10px" type="primary" @click="onSubmit()"
        >Create</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { userStore } from "@/store/modules/User";
import UserBody from "@/types/bodies/UserBody";
import User from "@/types/entities/User";
import { toastMessage } from "@/utils/response";
import { isValidEmail } from "@/utils/validation";
import {
  ValidateErrorEntity,
  RuleObject,
} from "ant-design-vue/es/form/interface";
import { defineComponent, reactive, ref, UnwrapRef } from "vue";

export default defineComponent({
  emits: ["close", "completed"],

  setup(props, { emit }) {
    const formRef = ref();
    const formState: UnwrapRef<UserBody> = reactive({
      name: "",
      email: "",
    });
    const labelCol = { span: 4 };
    const wrapperCol = { span: 14 };

    let validateEmail = async (rule: RuleObject, value: string) => {
      if (!isValidEmail(value)) {
        return Promise.reject("Email is invalid");
      }
      return Promise.resolve();
    };

    const rules = {
      name: [{ required: true, message: "Please input name", trigger: "blur" }],
      email: [
        { required: true, message: "Please input email", trigger: "blur" },
        { validator: validateEmail, trigger: "blur" },
      ],
    };

    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          userStore()
            .createUserApi(formState)
            .then(() => {
              toastMessage("Create User Successfully", "");
              emit("close");
              emit("completed");
            });
        })
        .catch((error: ValidateErrorEntity<User>) => {
          console.log("error", error);
        });
    };

    const closeModal = () => {
      emit("close");
    };

    return {
      formRef,
      formState,
      rules,
      onSubmit,
      labelCol,
      wrapperCol,
      closeModal,
    };
  },
});
</script>
