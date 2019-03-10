const params = {
  peopleLink: 'people',
  filmsLink: 'films',
  starshipsLink: 'starships',
  search: 'search',
  timeoutPrinting: 500,
  timeoutPagination: 100,
  scrollOffset: 50,
  countDetailColumns: 2,
  countSubjectItems: 10
};

let Settings = {
  /**
   * get setting
   * @param {String} value - title of resource
   * @return {String} - setting value
   *
   */
  getSettings: function(value) {
    return params[value] ? params[value] : null;
  }
};

export default Settings;
