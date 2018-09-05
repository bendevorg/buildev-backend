define({ "api": [  {    "type": "POST",    "url": "/auth/sign_in",    "title": "User login",    "name": "SignIn",    "group": "Auth",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Users",            "description": "<p>email.</p>"          }        ]      }    },    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "String",            "optional": false,            "field": "msg",            "description": "<p>Login confirmation message.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{ \"msg\": \"User logged.\" }",          "type": "json"        }      ]    },    "error": {      "fields": {        "400": [          {            "group": "400",            "type": "String",            "optional": false,            "field": "msg",            "description": "<p>Error message.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{ \"msg\": \"This user/password does not correspond to a valid user.\" }",          "type": "json"        }      ]    },    "filename": "server/controllers/auth/signIn.js",    "groupTitle": "Auth"  },  {    "type": "GET",    "url": "/auth/sign_ou",    "title": "User sign out",    "name": "Sign_Out",    "group": "Auth",    "version": "1.0.0",    "header": {      "fields": {        "Header": [          {            "group": "Header",            "type": "String",            "optional": false,            "field": "session",            "description": "<p>User session key</p>"          }        ]      }    },    "success": {      "fields": {        "200": [          {            "group": "200",            "type": "String",            "optional": false,            "field": "msg",            "description": "<p>Sign out confirmation message.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{ \"msg\": \"User logged out\" }",          "type": "json"        }      ]    },    "filename": "server/controllers/auth/signOut.js",    "groupTitle": "Auth"  },  {    "type": "POST",    "url": "/auth/sign_up",    "title": "User sign up",    "name": "Sign_Up",    "group": "Auth",    "version": "1.0.0",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Users",            "description": "<p>name.</p>"          }        ]      }    },    "success": {      "fields": {        "201": [          {            "group": "201",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>User id.</p>"          },          {            "group": "201",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>User name.</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "{\n  \"id\": \"012a362a-4f32-496f-bf25-d785d4df42ed\",\n  \"name\": \"User example\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "400": [          {            "group": "400",            "type": "String",            "optional": false,            "field": "msg",            "description": "<p>Error message.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "{ \"msg\": \"E-mail not valid.\" }",          "type": "json"        }      ]    },    "filename": "server/controllers/auth/signUp.js",    "groupTitle": "Auth"  }] });
