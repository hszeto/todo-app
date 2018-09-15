import rootReducer from '../../reducers/index';
import { SIGN_OUT } from '../../shared/constants';

describe('rootReducer', () => {
  it('initializes the default state', () => {
    expect(rootReducer({}, {}))
      .toEqual(
        {
          "currentUser":
          {
            "cognitoUser": {},
            "email": "",
            "jwt": "",
            "uuid": ""
          },
          "isAuthenticated": false,
          "isLoading": false,
          "todos": []
        }
      );
  });

  it('Sign out will reset state', () => {
    expect(rootReducer(
      {
        "currentUser":
        {
          "cognitoUser": {
            "username": "Testy Tester",
            "pool": {
              "userPoolId": "userPoolId-us-west-2",
              "clientId": "client-id-123"
            },
            "signInUserSession": {
              "idToken": {
                "jwtToken": "reallyreallyreallylogJsonWebToken"
              }
            }
          },
          "email": "testy@example.com",
          "jwt": "reallyreallyreallylogJsonWebToken",
          "uuid": "testy-uuid-123"
        },
        "isAuthenticated": true,
        "isLoading": false,
        "todos": [
          {
            "id": 3,
            "title": "Morning Stuffs",
            "created_at": "2018-08-23T08:28:01.664Z",
            "updated_at": "2018-08-23T08:28:01.664Z",
            "items": [
              {
                "id": 3,
                "name": "Buy Coffee",
                "completed": null,
                "todo_id": 3,
                "created_at": "2018-08-23T08:36:51.592Z",
                "updated_at": "2018-08-23T08:36:51.592Z"
              }
            ]
          }
        ]
      },
      { type: SIGN_OUT }
    ))
    .toEqual(
      {
        "currentUser":
        {
          "cognitoUser": {},
          "email": "",
          "jwt": "",
          "uuid": ""
        },
        "isAuthenticated": false,
        "isLoading": false,
        "todos": []
      }
    );
  });
});