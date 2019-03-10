const defaultState = {
  loading: false,
  errorMessage: '',
  isDrawerMenu: false,
  isMobileShowFilter: false,
  filter: [],
  filterAdmitted: [],
  subjectList: [],
  titleSubjectField: '',
  titleSubject: '',
  isPaginationButton: false,
  nextPage: null,
  details: [],
  modalDetails: [],
  searchValue: ''
};

const fetchValue = {
  data: {
    count: 87,
    next: 'https://swapi.co/api/people/?page=2',
    previous: null,
    results: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
        birth_year: '19BBY',
        gender: 'male'
      },
      {
        name: 'C-3PO',
        height: '167',
        mass: '75',
        hair_color: 'n/a',
        skin_color: 'gold',
        eye_color: 'yellow',
        birth_year: '112BBY',
        gender: 'n/a'
      }
    ]
  },
  error: {
    status: false,
    text: ''
  }
};

const fetchFilterValue = {
  data: {
    count: 87,
    next: null,
    previous: null,
    results: [
      {
        name: 'Owen Lars',
        height: '178',
        mass: '120',
        hair_color: 'brown, grey',
        skin_color: 'light',
        eye_color: 'blue',
        birth_year: '52BBY',
        gender: 'male'
      },
      {
        name: 'Beru Whitesun lars',
        height: '165',
        mass: '75',
        hair_color: 'brown',
        skin_color: 'light',
        eye_color: 'blue',
        birth_year: '47BBY',
        gender: 'female'
      },
      {
        name: 'R5-D4',
        height: '97',
        mass: '32',
        hair_color: 'n/a',
        skin_color: 'white, red',
        eye_color: 'red',
        birth_year: 'unknown',
        gender: 'n/a'
      }
    ]
  },
  error: {
    status: false,
    text: ''
  }
};

const getFetchValue = fetchData => {
  let results = fetchData.data.results.map(item => {
    return Object.assign({}, item);
  });
  let data = {},
    error = {};
  for (let prop in fetchData.data) {
    if (prop !== 'results') {
      data[prop] = fetchData.data[prop];
    }
  }
  for (let prop in fetchData.error) {
    error[prop] = fetchData.error[prop];
  }
  data.results = results;

  return {
    data: data,
    error: error
  };
};

const filter = [
  {
    title: 'title hair_color',
    value: '',
    name: 'hair_color'
  },
  {
    title: 'title birth_year',
    value: '',
    name: 'birth_year'
  },
  {
    title: 'title birth_year',
    value: '',
    name: 'eye_color'
  }
];

const getFilter = () => {
  return filter.map(item => {
    return Object.assign({}, item);
  });
};

const detail = [
  {
    title: 'name_title',
    name: 'name'
  },
  {
    title: 'birth_year_title',
    name: 'birth_year'
  },
  {
    title: 'eye_color_title',
    name: 'eye_color'
  }
];

const getDetail = () => {
  return detail.map(item => {
    return Object.assign({}, item);
  });
};

let scrollableDiv = {
  current: {
    scrollTop: 0,
    offsetHeight: 0,
    scrollHeight: 0
  }
};

const getScrollableDiv = () => {
  return { current: Object.assign({}, scrollableDiv.current) };
};

const evt = {
  target: {
    value: ''
  }
};

const getEvt = () => {
  return { target: Object.assign({}, evt.target) };
};

let AppStubs = {
  get defaultState() {
    return Object.assign({}, defaultState);
  },
  get fetchValue() {
    return getFetchValue(fetchValue);
  },
  get fetchFilterValue() {
    return getFetchValue(fetchFilterValue);
  },
  get filter() {
    return getFilter();
  },
  get detail() {
    return getDetail();
  },
  get scrollableDiv() {
    return getScrollableDiv();
  },
  get evt() {
    return getEvt();
  },
  namePage: 'people'
};

Object.freeze(AppStubs);

export default AppStubs;
