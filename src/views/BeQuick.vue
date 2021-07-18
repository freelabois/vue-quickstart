<template>
  <div class="quick">
    <h1>
      Hello dude, be quick ⚡
    </h1>
<!--    <FormFields-->
<!--      :fields="[-->
<!--          {-->
<!--          variableName: 'nomeTextField',-->
<!--          component: 'TextField',-->
<!--          type: 'text',-->
<!--          label: 'Nome INCOMPLETO',-->
<!--          cols: 8,-->
<!--          valueField: 'batata',-->
<!--          rules: [-->
<!--            value => !!value || 'O campo Nome é obrigatório',-->
<!--          ]-->
<!--        },-->
<!--      ]"-->
<!--    />-->
  </div>
</template>

<script>

// import FormFields from "../components/FieldsComponents/FormFields";
export default {
  name: "BeQuick",
  components: {},
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
