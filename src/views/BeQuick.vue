<template>
  <div class="quick" style="display: flex; flex-direction: column;">
        <h1>
          Hello dude, be quick ⚡
        </h1>

    <div style="max-width: 600px; display: flex; flex-direction: column; align-items: center; justify-content: center; margin-top: 2em">
      <FormFields
          :fields="fields"
          @update:values="valueField = $event"
      />
      <v-btn style="font-size: 25px" fab color="black" @click="ver">⚡</v-btn>
    </div>

  </div>
</template>

<script>

import FormFields from "../components/FieldsComponents/FormFields";

export default {
  name: "BeQuick",
  components: {FormFields},
  data() {
    return {
      valueField: null,
      fields: {}
    }
  },
  methods: {
    ver() {
      console.log(this.valueField);
    }
  },
  mounted() {
    this.fields = {
      soQuick: {
        field: 'TextField',
        label: 'How much quick?',
        valueField: 'So quick dude 😎'
      },
    }
  }
};
</script>

<style scoped>
.quick {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>
