const list = {
  films_title_menu: 'Films',
  people_title_menu: 'People',
  starships_title_menu: 'Starships',
  filter_title: 'Filter',
  admit_button: 'Admit',
  reset_button: 'Reset',
  loading: 'Loading...',
  name_title: 'Name',
  model_title: 'Model',
  starship_class_title: 'Starship class',
  birth_year_title: 'Birth year',
  eye_color_title: 'Eye color',
  title_film_title: 'Title',
  episode_id_title: 'Episode',
  opening_crawl_title: 'Opening Crawl',
  search_button: 'Search',
  show_more: 'Show More',
  mass_title: 'Mass (kg)',
  height_title: 'Height (cm)',
  gender_title: 'Gender',
  hair_color_title: 'Hairs',
  skin_color_title: 'Skin',
  director_title: 'Director',
  producer_title: 'Producer',
  release_date_title: 'Release Date',
  MGLT_title: 'MGLT (num)',
  cargo_capacity_title: 'Cargo capacity (kg)',
  consumables_title: 'Consumables',
  cost_in_credits_title: 'Cost (credits)',
  crew_title: 'crew (num)',
  hyperdrive_rating_title: 'Hyperdrive rating',
  length_title: 'Length (m)',
  manufacturer_title: 'Manufacturer',
  passengers_title: 'Passengers',
  details_title: 'Details',
  ok_button: 'OK',
  error_message: 'Error message',
  none_list: 'The list is empty!'
};

let Resources = {
  /**
   * get resource
   * @param {String} title - title of resource
   * @return {String} - resource
   */
  getResource: function(title) {
    return list[title] ? list[title] : '?' + title + '?';
  }
};

export default Resources;
