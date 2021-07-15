<script>

export default {
  methods: {
    convertStringFilter(value) {
      return value && value.length > 0 ? value : undefined;
    },
    convertArrayObjectFilter(object, key) {
      return object && object[key] && object[key] !== null && object[key] !== ""
          ? object[key]
          : null;
    },
    convertArrayObjectFilterBoolean(object, key) {
      return object && (object[key] !== undefined) && (object[key] !== null) && object[key] !== ""
          ? object[key]
          : null;
    },
    maskInputMoney(value) {
      return (value * 1).toFixed(2) / 100;
    },
    money2(value) {
      return (value * 1)
          .toFixed(2)
          .replace(".", ",")
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    moneyInput2MoneyFloat(value) {
      return parseFloat(value
          .replace(".", "")
          .replace(",", ".")
          .replace("R$ ", ""))
    },
    removePrefixMoney(value) {
      return value.toString().split("R$ ").join("");
    },
    stringToDecimal(string) {
      if (!string) {
        return null;
      }
      let value = string
          .toString()
          .split(".")
          .join("")
          .split(",")
          .join(".")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("");
      return parseFloat(value);
    },
    removeMaskMoney(string) {
      if (!string) {
        return null;
      }
      let value = string
          .toString()
          .split(".")
          .join("")
          .split(",")
          .join("")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("");
      return parseInt(value);
    },

    //retorna o tamanho da coluna de acordo com o tamanho do array e o index
    returnColByLength(index, length) {
      if (length === 1) return 12;
      if ((length % 2) === 0) return 6;
      if ((length - 1) === index) return 12;
      return 6;
    },
    removeMaskCharacters(string) {
      if (!string) {
        return null;
      }
      return string
          .toString()
          .split("/")
          .join("")
          .split("(")
          .join("")
          .split(")")
          .join("")
          .split(".")
          .join("")
          .split(",")
          .join("")
          .split("R$ ")
          .join("")
          .split(" ")
          .join("")
          .split("-")
          .join("");
    },
    removeObjectFromArray(array, key, value) {
      return array.filter((e) => e[key] !== value);
    },
    findObjectFromArray(array, key, value) {
      return array.find(e => `${e[key]}` === `${value}`);
    },
  },
};
</script>

