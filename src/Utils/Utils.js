export default {
  /**
   * compare two array filter admitted and current
   * @param {Array} filter - current filter array
   * @param {Array} filterAdmitted - admitted filter array
   */
  isEqualAdmittedFilter(filter, filterAdmitted) {
    return !filter.some((item, key) => {
      return item.value !== filterAdmitted[key].value;
    });
  }
};
