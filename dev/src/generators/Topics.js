window.test = () => {
  for (let i = 0; i < 100; i++) console.log(new Topics().loadTopics());
};

export default class Topics {
  constructor() {
    this.categories = Object.keys(this.topics);
  }

  loadTopics() {
    this.indexes = [];
    let topics = this.topics,
      topic1 = this._findTopic(topics),
      topic2 = this._findTopic(topics),
      topic3 = this._findTopic(topics);
    return [topic1, topic2, topic3];
  }

  _findTopic(topics) {
    let topic = topics[this._findIndex(topics.length)];
    return topic[Math.floor(Math.random() * topic.length)];
  }

  _findIndex(length) {
    let index = Math.floor(Math.random() * length);
    if (this.indexes.includes(index)) return this._findIndex(length);
    this.indexes.push(index);
    return index;
  }

  get topics() {
    return [
      [
        'Horror Movies',
        'Television Drama',
        'Soap Opera',
        'Comedy',
        "Children's Books",
        'Disney Movies',
        'Popular Books',
        'High School Reads'
      ],
      ['Entertainers', 'Famous Athletes'],
      ['Places to Hide'],
      ['High School', 'Elementary School', 'College'],
      ['Going to the Doctor', 'Dental Concerns', 'Haircuts', 'Gynecology'],
      ['Church', 'Scientology', 'Mormonism', 'Islam'],
      ['Technology', 'Computers', 'Programming'],
      [
        'Space Travel',
        'International Space Station',
        'Cosmos',
        'Mars',
        'Satellites'
      ],
      ['Whistling', 'Yelling'],
      [
        "Farmer's Markets",
        'Hipster Coffee Shops',
        'Thrift Stores',
        'Gentrification'
      ],
      ['Tesla', 'Microsoft', 'Apple Inc.'],
      ['Fruits', 'Veggies', 'Meat', 'Dipping Sauce', 'Carbohydrates'],
      ['Voting', 'Elections', 'Polls', 'Campaigning', 'Politics'],
      [
        'The Great Outdoors',
        'Fishing',
        'Mountains',
        'The Ocean',
        'Beaches',
        'Rainforests'
      ],
      ['Diseases', 'Famine', 'Addiction'],
      ['House fire!', 'Clogged Drain'],
      ['Cleanliness'],
      ['Lightning Storm', 'Blizzards', 'Heat Wave'],
      ['Airplane Travel', 'Bus Rides', 'Road Trip', 'Horse Carriages'],
      ['Getting Drunk', 'Smoking Weed', 'Cigarette Break'],
      [
        'Land-line Phone calls',
        'Dial-up Internet',
        'Cassette Tapes',
        'Vinyl Records'
      ],
      ['Birthdays', 'Bar Mitzvahs', 'Baptism'],
      [
        'New York',
        'American',
        'Los Angeles',
        'Chicago',
        'Florida',
        'West Africa',
        'London',
        'Tokyo',
        'Australia',
        'Amsterdam',
        'Brazil'
      ],
      ['Hyperventilation', 'Sweating', 'Yawning'],
      ['Adoption', 'Childbirth', 'Death'],
      ['The American Presidency', 'The White House'],
      ['Middle Class', 'Poverty'],
      ['Murder', 'Harassment'],
      ['Pastimes', 'Vacation', 'Day-off', 'Sick days'],
      [
        '100 Years Ago',
        'Generational',
        'Trend',
        'New School',
        'Old School',
        'Growing Up',
        'The Youth'
      ],
      ['Advertising', 'The Media'],
      ['Challenging', 'Accomplishments'],
      ['Silicon Valley', 'Tech Bro', 'Mansplaining', 'Vaping'],
      ['Shark Tank Ideas'],
      ['The Ghetto', 'Downtown'],
      [
        'Education',
        'Gun Control',
        'Classism',
        'The Pharmaceutical Industry',
        'Animal Cruelty'
      ],
      ['Mythology', 'History', 'The Humanities'],
      [
        'Animal Kingdom',
        'Apex Predators',
        'Cuddly Creatures',
        'Creepy Crawlers'
      ],
      [
        'Arrogance',
        'Annoyance',
        'Eccentric',
        'Depression',
        'Hesitance',
        'Boredom',
        'Flirtatious',
        'Enthralling',
        'Mysterious',
        'Grandiose',
        'Cheating',
        'Authenticity',
        'Liars',
        'Honest Folks'
      ],
      ['Prestige', 'Honor'],
      ['Baseball', 'Slam Dunk', 'Cricket'],
      ['Monarchy', 'Democracy'],
      ['Urban', 'The Suburbs'],
      ['Jazz', 'Rock and roll', 'The Blues', 'Soul Music', 'Rap']
    ];
  }
}
