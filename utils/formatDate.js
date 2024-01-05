const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat.js");
dayjs.extend(advancedFormat);

// using dayjs library to format date
// Do will give suffix to days, for example 1st, 22nd 15th and so on
const formatDate = (timestamp) => {
    return dayjs(timestamp).format("MMM Do, YYYY [at] h:mm:ss a");
}

module.exports = formatDate