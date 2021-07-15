<template>
  <v-col class="fields-box">
    <v-form
        v-if="formRef"
        class="form-fields fields"
        :ref="formRef"
    >
      <component
          :maskMoney="field.maskMoney"
          v-for="(field, index) in fields"
          :title="field.titulo"
          :maskFormat="field.maskFormat"
          v-if="field.reactive_show ? reatividade(pesData, field.reactive_params) : !field.hideInput"
          :disabled="disabled"
          :valueField="field.valueField"
          :ref="field.identificacao_interna"
          :keyValue="field.keyValue"
          :items="field.items"
          :rules="isRule(field) ? [ (v) => !!v || field.rules || 'Preencha o campo'] : field.validation"
          :label="field.titulo"
          :cols="isMobile ? '12' : field.colunas"
          :key="field.componente+index"
          :is="field.componente"
          :keyName="field.keyName"
          :reqText="field.rules"
          :required="field.requerido"
          :module="field.modulo"
          :type="field.tipo"
          :data="inputsValues"
          :reactiveField="field.reactiveField"
          :hint="field.hint"
          :initialValue="field.initialValue"
          :multiple="true"
          @onEnter="$set(inputsValues, field.identificacao_interna, $event), $emit('update:values', inputsValues)"
          @update:value="$set(inputsValues, field.identificacao_interna, $event); $emit('update:values', inputsValues);"
          @update:returnFile="addFile($event)"
          @update:removeFile="removeFile($event)"
          @onBlur="field.onBlur? (field.onBlur($event), $emit('update:values', inputsValues)): null"
      />
    </v-form>
  </v-col>
</template>

<script>
const {isNil} = require('lodash');
import Vue from 'vue';
import MaskTextField from "./Inputs/MaskTextField";
import TextField from "./Inputs/TextField";
import SelectField from "./Selects/SelectField";
import DefaultDocumentInput from "./DefaultComponents/DefaultDocumentInput";
import SelectAutoComplete from "./Selects/SelectAutoComplete";
import CnsComponent from "./DefaultComponents/CnsComponent";
import DataTextField from "./Inputs/DataTextField";
import ParentTextField from "./Inputs/ParentTextField";
import DefaultSwitch from "./Inputs/DefaultSwitch";
import Validation from "../mixins/Validation";
import Helpers from "../mixins/Helpers";
import DefaultButton from "./DefaultComponents/DefaultButton";
import CampoDinamico from "../mixins/CampoDinamico";

export default {
  name: 'FormFields',
  components: {
    DefaultButton,
    TextField,
    DataTextField,
    CnsComponent,
    MaskTextField,
    SelectField,
    ParentTextField,
    DefaultDocumentInput,
    SelectAutoComplete,
    DefaultSwitch
  },
  mixins: [Validation, Helpers, CampoDinamico],
  props: {
    fields: {
      type: Array,
      required: true,
    },
    disabled: false,
    validate: {},
    pesData: {},
    codRef: {},
    initalValues: {},
    fieldValues: {}
  },
  data() {
    let data = {
      windowWidth: window.innerWidth,
      inputsValues: {},
      formRef: false,
    }
    data = Object.assign({}, data, this.fields);
    return data;
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
    this.formRef = (this.formRef ? this.formRef : 'form');
    this.fieldValues === null ? this.fieldValues = {} : '';
  },
  methods: {
    updateValue(fieldName, event, reactiveFunction) {

    },
    removeFile(event) {
      this.fieldValues.documentos = this.fieldValues.documentos.filter((item, key) => key !== this.fieldValues.documentos.indexOf(event));
      this.$emit('update:values', this.fieldValues);
    },
    addFile(event) {
      if (typeof this.fieldValues.documentos === 'undefined') {
        this.fieldValues.documentos = [];
      }
      this.fieldValues.documentos.push(event);
      this.$emit('update:values', this.fieldValues);
    },
    isRule(element) {
      return isNil(element.validation)
    }
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768;
    }
  },
  watch: {
    initalValues(value) {
      this.inputsValues = value;
    },
    inputsValues(value) {
      //   console.log(this.$refs);
      // this.fields.forEach(field => {
      //   // this.$refs[field.identificacao_interna].valueField = value[field.identificacao_interna]
      // })
    },
    fields() {
      this.fields.forEach(field => {
        //ternario preenchimento campo dinamico
        Vue.set(this.inputValues, field.identificacao_interna, '');
      })
    },
    validate() {
      this.$emit('save', this.$refs[this.formRef].validate());
      if (!this.$refs[this.formRef].validate()) {
        this.$nextTick(() => {
          let domRect = document.querySelector('.error--text')?.getBoundingClientRect();
          window.scrollTo(
              domRect.left + document.documentElement.scrollLeft,
              domRect.top + document.documentElement.scrollTop
          );
        });
      }
    }
  },
}
</script>

<style scoped>
.fields-box {
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin-top: 10px;
  margin-bottom: 10px;
}

.fields {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: center;
  flex: 1;
}

.col {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.form-fields {
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}


</style>