<template>
  <v-col :cols="cols">
    <div class="container-input">
<!--      v-model.lazy="maskMoney ? price : ''"-->
      <v-text-field
          autocomplete="new-password"
          :append-icon="appendIcon ? (showAppend ? appendIcon[0] : appendIcon[1]) : ''"
          v-money="maskMoney ? money : ''"
          :disabled="disabled"
          :class="{'has-rules': rules, 'withButton': withButton, 'borderSuccess': borderSuccess, 'borderDanger': borderDanger, 'darkStyle' : darkStyle}"
          :rules="rules ? rules : []"
          :label="label"
          :prepend-inner-icon="prependInnerIcon"
          v-model="text"
          :type="type"
          :placeholder="placeholder"
          @input="$emit('update:value', text)"
          @keyup.enter="$emit('onEnter', text)"
          @keydown="maskMoney && $event.key === '-' ? $event.preventDefault() : null"
          outlined>
      </v-text-field>
    </div>
  </v-col>
</template>

<script>
import {VMoney} from 'v-money';

export default {
  name: "TextField",
  components: {},
  props: {
    label: {},
    placeholder: {},
    type: {},
    cols: {},
    prependInnerIcon: {},
    appendIcon: {},
    rules: {},
    clearValue: {},
    valueField: {},
    disabled: {
      default: false,
    },
    withButton: {},
    buttonColor: {},
    borderSuccess: {},
    borderDanger: {},
    maskMoney: {},
    darkStyle: {},
    helpText: {},
  },
  data() {
    return {
      showAppend: false,
      text: this.valueField || '',
      price: this.valueField || 0,
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        suffix: '',
        precision: 2,
        masked: false
      }
    }
  },
  directives: {money: VMoney},
  watch: {
    clearValue() {
      this.text = '';
    },
    valueField() {
      this.text = this.valueField;
      this.$emit('update:value', this.text);
    }
  },
  mounted() {
    if (this.valueField) {
      this.text = this.valueField;
      this.$emit('update:value', this.text);
    }
  },
}
</script>

<style scoped>

</style>