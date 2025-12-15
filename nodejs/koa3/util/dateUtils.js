import moment from "moment";

export default {

  getUnix: () => {
    return moment().unix();
  },
}
