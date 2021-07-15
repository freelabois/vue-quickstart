<script>
import moment from "moment";

export default {
  methods: {
    dateSubtract30Days() {
      return moment().subtract(30, "days").format("YYYY-MM-DD");
    },
    dateNowFormat(format) {
      return moment().format(format);
    },
    dateTimeTransform(date, format) {
      return moment(date).format(format);
    },
    dateISOFormat(date, format) {
      return moment(date, format).toISOString();
    },
    dateFormat(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    dateTimeFormat(date) {
      return moment(date).format("DD/MM/YYYY HH:mm:ss");
    },

    dateEnFormat(date, format) {
      return moment(date, format).format("YYYY-MM-DD");
    },
    validateDate(date) {
      if (date.length === 10) {
        let day = date[0] + date[1];
        let month = date[3] + date[4];
        let year = date[6] + date[7] + date[8] + date[9];
        return (
            day >= "01" &&
            day <= "31" &&
            month >= "01" &&
            month <= "12" &&
            year >= "1900" &&
            year <= "2070"
        );
      }
      return false;
    },
  },
};
</script>

