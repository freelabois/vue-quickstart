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
          :title="field.title"
          :maskFormat="field.maskFormat"
          v-show="field.visible"
          :disabled="disabled"
          :valueField="field.valueField"
          :ref="field.internalKey"
          :keyValue="field.keyValue"
          :items="field.items"
          :rules="isRule(field) ? [ (v) => !!v || field.rules || 'Preencha o campo'] : field.validation"
          :label="field.label"
          :cols="isMobile ? '12' : field.column"
          :key="field.component+index"
          :is="field.component"
          :keyName="field.keyName"
          :reqText="field.rules"
          :required="field.required"
          :module="field.modulo"
          :type="field.type"
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
import TextField from '../inputs/TextField'
import Vue from 'vue';

export default {
  name: 'FormFields',
  components: {
    TextField,
  },
  mixins: [],
  props: {
    fields: {
      type: Array,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
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
    fields() {
      this.fields.forEach(field => {
        Vue.set(this.inputValues, field.component, '');
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