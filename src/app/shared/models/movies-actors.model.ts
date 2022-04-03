export interface IMoviesActors {
  'id': 634649,
  'cast': IActor[],
  'crew': ICrew[],
}

interface IActor {
  'adult': boolean,
  'gender': number,
  'id': number,
  'known_for_department': string,
  'name': string,
  'original_name': string,
  'popularity': number,
  'profile_path': string,
  'cast_id': number,
  'character': string,
  'credit_id': string,
  'order': number
}

interface ICrew {
  'adult': boolean,
  'gender': number,
  'id': number,
  'known_for_department': string,
  'name': string,
  'original_name': string,
  'popularity': number,
  'profile_path': string | null,
  'credit_id': string,
  'department': string,
  'job': string
}
