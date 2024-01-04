const dayjs = require("dayjs");
const advancedFormat = require("dayjs/plugin/advancedFormat.js");
dayjs.extend(advancedFormat);

const formatDate = (timestamp) => {
    return dayjs(timestamp).format("MMM Do, YYYY [at] h:mm:ss a");
}

module.exports = formatDate