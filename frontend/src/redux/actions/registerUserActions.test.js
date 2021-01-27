import {_registerButtonEnabled} from "./registerUserActions";

describe('register button is enabled and disabled correctly', () => {

  it('register button is enabled if all properties are truthy', () => {
    const state = {
      username: 'test',
      firstName: 'test',
      surname: 'test',
      email: 'test@test.com',
      address1: 'test',
      address2: 'test',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: 'K1A 0A1',
    };

    expect(_registerButtonEnabled(state)).toBeTruthy();
  });

  it('register button is disabled if any properties are falsy', () => {
    const state = {
      username: 'test',
      firstName: 'test',
      surname: '',
      email: 'test@test.com',
      address1: 'test',
      address2: 'test',
      city: 'Ottawa',
      province: 'Ontario',
      postalCode: 'K1A 0A1',
    };

    expect(_registerButtonEnabled(state)).toBeFalsy();
  });

});
