<template>
  <v-form
      v-if="formRef && fields"
      class="form-fields fields"
      :ref="formRef"
  >
    <component
        v-for="field in fields"
        :maskMoney="field.maskMoney"
        :title="field.title"
        :maskFormat="field.maskFormat"
        v-show="!field.hideInput"
        :disabled="disabled ? disabled : field.disabled"
        :valueField="field.valueField"
        :keyValue="field.keyValue"
        :keyName="field.keyName"
        :items="field.items"
        :rules="field.dinamicRules"
        :label="field.label"
        :placeholder="field.placeholder"
        :cols="isMobile ? '12' : field.cols"
        :prependInnerIcon="field.prependInnerIcon"
        :is="field.field"
        :key="field.variableName"
        :type="field.type"
        :appendIcon="field.appendIcon"
        :hint="field.hint"
        :errorText="field.errorText"
        :helpText="field.helpText"
        :dateType="field.dateType"
        @onEnter="onEnter"
        @update:value="updateValueField($event, field)"
        @onBlur="field.onBlur? (field.onBlur($event), $emit('update:values', inputsValues)) : null"
    />
  </v-form>
</template>

<script>
import TextField from "../inputs/TextField";
import Vue from 'vue';

export default {
  name: "FormFields",
  components: {
    TextField,
  },
  props: {
    withButton: {
      type: String,
      default: undefined,
    },
    fields: {
      required: true,
      type: Object,
      default: {},
    },
    codRef: {
      type: String,
    },
    disabled: {
      type: Boolean
    },
    validate: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      windowWidth: window.innerWidth,
      inputsValues: {},
      formRef: false,
    }
  },
  methods: {
    onEnter() {
      this.validateForms();
    },
    updateValueField(event, field) {
      if (field && field.variableName) {
        this.inputsValues[field.variableName] = event;
        this.fields[field.variableName].valueField = event;
        if (field.changeValue) {
          field.changeValue(this.fields);
        }
        this.verifyRules(field);
        this.$emit('update:values', this.inputsValues);
      } else {
        console.error('FormFields error: field or field.variableName is undefined', field);
      }
    },
    verifyRules(field) {
      if (this.fields[field.variableName]) {
        const rules = this.fields[field.variableName].rules;
        if (rules && Array.isArray(rules) && rules.length > 0) {
          this.fields[field.variableName].dinamicRules = [];
          rules.forEach((rule) => {
            this.fields[field.variableName].dinamicRules.push(rule(this.fields))
          })
        }
      }
      this.$forceUpdate();
    },
    async validateForms() {
      if (!this.loading) {
        await Object.entries(this.fields).forEach(field => {
          this.verifyRules(field[1]);
        })
        const isValid = this.$refs[this.formRef].validate();
        this.$emit('checkValidity', {isValid: isValid, values: this.inputsValues});
        if (!isValid) {
          this.$nextTick(() => {
            let domRect = document.querySelector('.v-input.error--text')?.getBoundingClientRect();
            if (domRect) {
              window.scrollTo(
                  domRect.left + document.documentElement.scrollLeft,
                  domRect.top + document.documentElement.scrollTop
              );
            }

          });
        }
      }
    },
    initializeFields() {
      Object.entries(this.fields).forEach(field => {
        Vue.set(this.fields[field[0]], 'variableName', field[0]);
        Vue.set(this.inputsValues, field[1].variableName, '');
      })
    }
  },
  watch: {
    fields() {
      this.initializeFields();
    },
    validate() {
      this.validateForms();
    }
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth
    })
    this.formRef = (this.codRef ? this.codRef : 'form');

    this.initializeFields();
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 768;
    },
    withLabel() {
      if (Object.values(this.fields)[0]) {
        return Object.values(this.fields)[0].hasOwnProperty('label');
      }
      return false;

    }
  },
}
</script>

<style scoped>
.fields {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  align-items: flex-start;
  flex: 1;
}

.form-fields {
  width: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
}

.cleanComponent {
  margin: 0 !important;
  padding: 0 !important;
}
</style>
