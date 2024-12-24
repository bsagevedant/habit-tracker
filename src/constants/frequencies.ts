export interface FrequencyOption {
  value: string;
  label: string;
  description: string;
}

export const FREQUENCIES: FrequencyOption[] = [
  {
    value: 'daily',
    label: 'Daily',
    description: 'Track this habit every day'
  },
  {
    value: 'weekly',
    label: 'Weekly',
    description: 'Track this habit once per week'
  },
  {
    value: 'weekdays',
    label: 'Weekdays',
    description: 'Track this habit Monday through Friday'
  },
  {
    value: 'weekends',
    label: 'Weekends',
    description: 'Track this habit on Saturday and Sunday'
  },
  {
    value: 'custom',
    label: 'Custom Days',
    description: 'Track this habit on specific days of the week'
  }
];