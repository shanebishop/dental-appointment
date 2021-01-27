import sortByTime from "./appointments";

test('sorts dates in ascending order', () => {
  const appointments = [
    {date: '1995-12-17', time: '19:43:16'},
    {date: '2021-01-26', time: '19:43:27'},
    {date: '1953-04-30', time: '12:50:42'},
    {date: '1856-09-28', time: '07:14:04'},
    {date: '1826-12-20', time: '17:44:59'},
    {date: '1714-12-15', time: '19:38:08'},
    {date: '1770-09-24', time: '22:17:11'},
    {date: '1776-04-30', time: '13:13:00'},
    {date: '1901-09-26', time: '08:41:26'},
    {date: '1963-03-01', time: '06:54:39'},
    {date: '1879-04-28', time: '00:00:00'},
    {date: '1747-08-13', time: '14:53:59'},
  ];

  appointments.sort(sortByTime);

  const expected = [
    {date: '1714-12-15', time: '19:38:08'},
    {date: '1747-08-13', time: '14:53:59'},
    {date: '1770-09-24', time: '22:17:11'},
    {date: '1776-04-30', time: '13:13:00'},
    {date: '1826-12-20', time: '17:44:59'},
    {date: '1856-09-28', time: '07:14:04'},
    {date: '1879-04-28', time: '00:00:00'},
    {date: '1901-09-26', time: '08:41:26'},
    {date: '1953-04-30', time: '12:50:42'},
    {date: '1963-03-01', time: '06:54:39'},
    {date: '1995-12-17', time: '19:43:16'},
    {date: '2021-01-26', time: '19:43:27'}
  ];

  expect(appointments).toEqual(expected);
});
