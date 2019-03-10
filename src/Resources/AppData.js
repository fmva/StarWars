import Resources from './Resources';
import Settings from './Settings';

export default {
  [Settings.getSettings('peopleLink')]: {
    title: Resources.getResource('people_title_menu'),
    path: 'https://swapi.co/api/people/',
    titleSubjectField: 'name',
    filter: [
      {
        title: Resources.getResource('hair_color_title'),
        value: '',
        name: 'hair_color'
      },
      {
        title: Resources.getResource('birth_year_title'),
        value: '',
        name: 'birth_year'
      },
      {
        title: Resources.getResource('eye_color_title'),
        value: '',
        name: 'eye_color'
      }
    ],
    details: [
      {
        title: Resources.getResource('name_title'),
        name: 'name'
      },
      {
        title: Resources.getResource('birth_year_title'),
        name: 'birth_year'
      },
      {
        title: Resources.getResource('eye_color_title'),
        name: 'eye_color'
      },
      {
        title: Resources.getResource('gender_title'),
        name: 'gender'
      },
      {
        title: Resources.getResource('hair_color_title'),
        name: 'hair_color'
      },
      {
        title: Resources.getResource('height_title'),
        name: 'height'
      },
      {
        title: Resources.getResource('mass_title'),
        name: 'mass'
      },
      {
        title: Resources.getResource('skin_color_title'),
        name: 'skin_color'
      }
    ]
  },
  [Settings.getSettings('filmsLink')]: {
    title: Resources.getResource('films_title_menu'),
    path: 'https://swapi.co/api/films/',
    titleSubjectField: 'title',
    filter: [
      {
        title: Resources.getResource('release_date_title'),
        value: '',
        name: 'release_date'
      },
      {
        title: Resources.getResource('episode_id_title'),
        value: '',
        name: 'episode_id'
      },
      {
        title: Resources.getResource('opening_crawl_title'),
        value: '',
        name: 'opening_crawl'
      }
    ],
    details: [
      {
        title: Resources.getResource('title_film_title'),
        name: 'title'
      },
      {
        title: Resources.getResource('episode_id_title'),
        name: 'episode_id'
      },
      {
        title: Resources.getResource('opening_crawl_title'),
        name: 'opening_crawl'
      },
      {
        title: Resources.getResource('director_title'),
        name: 'director'
      },
      {
        title: Resources.getResource('release_date_title'),
        name: 'release_date'
      },
      {
        title: Resources.getResource('producer_title'),
        name: 'producer'
      }
    ]
  },
  [Settings.getSettings('starshipsLink')]: {
    title: Resources.getResource('starships_title_menu'),
    path: 'https://swapi.co/api/starships/',
    titleSubjectField: 'name',
    filter: [
      {
        title: Resources.getResource('cost_in_credits_title'),
        value: '',
        name: 'cost_in_credits'
      },
      {
        title: Resources.getResource('manufacturer_title'),
        value: '',
        name: 'manufacturer'
      },
      {
        title: Resources.getResource('starship_class_title'),
        value: '',
        name: 'starship_class'
      }
    ],
    details: [
      {
        title: Resources.getResource('name_title'),
        name: 'name'
      },
      {
        title: Resources.getResource('model_title'),
        name: 'model'
      },
      {
        title: Resources.getResource('starship_class_title'),
        name: 'starship_class'
      },
      {
        title: Resources.getResource('MGLT_title'),
        name: 'MGLT'
      },
      {
        title: Resources.getResource('cargo_capacity_title'),
        name: 'cargo_capacity'
      },
      {
        title: Resources.getResource('consumables_title'),
        name: 'consumables'
      },
      {
        title: Resources.getResource('cost_in_credits_title'),
        name: 'cost_in_credits'
      },
      {
        title: Resources.getResource('crew_title'),
        name: 'crew'
      },
      {
        title: Resources.getResource('hyperdrive_rating_title'),
        name: 'hyperdrive_rating'
      },
      {
        title: Resources.getResource('length_title'),
        name: 'length'
      },
      {
        title: Resources.getResource('manufacturer_title'),
        name: 'manufacturer'
      },
      {
        title: Resources.getResource('passengers_title'),
        name: 'passengers'
      }
    ]
  }
};
