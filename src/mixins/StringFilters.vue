<script>
export default {
  filters: {
    //ex: CamelCase => Camel Case
    CamelCase2Space: function (string) {
      if (!string) return '';
      return string.replace(/([A-Z]+)/g, ' $1').replace(/^ /, '');
    },
    //ex: camelCase => camel Case
    camelCase2Space: function (string) {
      if (!string) return '';
      return string.replace(/([A-Z]+)/g, ' $1');
    }
  }
}
</script>