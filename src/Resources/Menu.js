import Resources from './Resources';
import Settings from './Settings';

export default [
  {
    path: Settings.getSettings('peopleLink'),
    title: Resources.getResource('people_title_menu')
  },
  {
    path: Settings.getSettings('filmsLink'),
    title: Resources.getResource('films_title_menu')
  },
  {
    path: Settings.getSettings('starshipsLink'),
    title: Resources.getResource('starships_title_menu')
  }
];
