/* global describe it expect */

import User from "./User";

describe('test User.getDisplayName()', () => {

  it('if first name is not set, returns username', () => {
    const user = {
      first_name: undefined,
      last_name: undefined,
      username: 'billyjoe'
    };
    expect(User.getDisplayName(user)).toBe('billyjoe');
  });

  it('if first name is set, returns first name and surname in order', () => {
    const user = {
      first_name: 'Frank',
      last_name: 'Sinatra',
      username: 'fsinatra'
    };
    expect(User.getDisplayName(user)).toBe('Frank Sinatra');
  });

});
