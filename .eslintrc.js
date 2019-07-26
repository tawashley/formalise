module.exports = {
    "parser":  '@typescript-eslint/parser',
    "extends": [
        "airbnb-base",
        "plugin:@typescript-eslint/recommended",
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "env": {
        "browser": true
    },
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "rules": {
        "@typescript-eslint/no-object-literal-type-assertion": 0,
        "import/no-dynamic-require": 0,
        "import/prefer-default-export": 0,
        "linebreak-style": 0,
        "import/no-named-as-default-member": 0,
        "consistent-return": 0,
        "max-len": ["error",
            {
                "code": 180
            }
        ],
        "no-plusplus": ["error", {
            "allowForLoopAfterthoughts": true
        }],
        "no-prototype-builtins": 0,
        "arrow-parens": ["error", "always"],
        "import/no-extraneous-dependencies": ["error",
            {
                "devDependencies": true
            }
        ],
        "arrow-body-style": 0,
        "indent": ["error", 4],
        "no-param-reassign": ["error",
            {
                "props": false
            }
        ],
        "no-mixed-spaces-and-tabs": "error",
        "camelcase":    "error",
        "comma-dangle": ["error", "never"],
        "eqeqeq":       "error",
        "func-names":   ["error", "as-needed"],
        "quotes":       ["error", "single", { "allowTemplateLiterals": true }],
        "quote-props":  ["error", "as-needed"],
        "strict":       ["error", "function"],
        "yoda":         "error",
        "id-blacklist": ["error", "err", "e", "cb", "callback", "res"],
        "prefer-destructuring": ["error", {
                "VariableDeclarator": {
                    "array": true,
                    "object": true
                },
                "AssignmentExpression": {
                    "array": false,
                    "object": false
                }
            }
        ]
    },
    "globals": {
        "jest": "readonly",
        "it": "readonly",
        "describe": "readonly",
        "expect": "readonly",
        "test": "readonly",
        "beforeEach": "readonly",
        "beforeAll": "readonly",
        "afterEach": "readonly",
        "afterAll": "readonly",
    },
};
