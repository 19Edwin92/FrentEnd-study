## 협업을 위한 초기설정 (1) Eslint 
[협업을 위한 초기설정 (1) Eslint](https://yelee.tistory.com/57)

### 라이브러리 설치 : eslint
```bash
yarn add -D eslint
```

### eslint 초기화 
```bash 
$ yarn eslint --init

You can also run this command directly using 'npm init @eslint/config'.
Need to install the following packages:
  @eslint/create-config
Ok to proceed? (y)

$ y

? How would you like to use ESLint? … 
  To check syntax only
❯ To check syntax and find problems  # prettier를 통해 코트 스타일을 포맷팅 할 예정
  To check syntax, find problems, and enforce code style

? What type of modules does your project use? … 
❯ JavaScript modules (import/export) # React는 자바스크립트 모듈 타입을 이용
  CommonJS (require/exports)
  None of these

? Which framework does your project use? … 
❯ React # 리액트 프로젝트이므로 첫 번째 탭에서 엔터!
  Vue.js
  None of these


? Does your project use TypeScript? › No / Yes # 타입 스크립트 기반 프로젝트를 구성하는 중이니 Yes! 탭에서 엔터!

? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
✔ Browser # Browser에서 엔터!
  Node

? What format do you want your config file to be in? … 
  JavaScript
  YAML
❯ JSON  # config 파일을 어떤 포맷

eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
? Would you like to install them now? › No / Yes # 필요한 dependancy 설치 여부 -> Yes!

? Which package manager do you want to use? … 
  npm
❯ yarn # 패키지 매니저를 yarn
  pnpm
```

### 라이브러리 설치 : prettier
```bash
yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

1. eslintrc.json 파일 수정
```json
{
    ...code, 
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier" // 추가!
    ],

    "rules": [
        "react/react-in-jsx-scope": "off",
        "spaced-comment": "error",
        "quotes": ["error", "single"],
        "no-duplicate-imports": "error"
    ],

    "plugins": [
    "react",
    "react-hooks",
    "@typescript-eslint",
    "prettier"
    ],

    "settings": { 
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx", ".js"] 
      }, 
      "import/resolver": { 
        "typescript": "./tsconfig.json" 
      }
    }
    ...code, 
}
```

2. 파일생성 `.prettierrc`

```json
{
    "semi": true, // 세미콜론(;) 사용 여부
    "tabWidth": 2, // 탭 너비
    "printWidth": 100, // 자동 줄 바꿈이 되는 길이
    "singleQuote": true, // 싱클 쿼테이션('') 적용 여부
    "trailingComma": "none", // 여러줄일때 후행 콤마 방식
    "jsxSingleQuote": true, // JSX에 싱글 퀘테이션 사용 여부
    "arrowParens": "avoid",
  }
```

3. package.json 파일 수정 

```json
"scripts": {
    //...code,
    "lint": "eslint src/**/*.{js,jsx,ts,tsx,json}",
    "lint:fix": "eslint --fix 'src/**/*.{js,jsx,ts,tsx,json}'",
    "prettier": "prettier --write 'src/**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc"
  }
```

### Eslint-config-prettier 충돌

```bash
npm i -D eslint-config-prettier eslint-plugin-prettier
npm i -D eslint-config-airbnb

# npm i -D eslint-plugin-react eslint-plugin-react-hooks
# npm i -D eslint-plugin-jsx-a11y eslint-plugin-import
# npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

- @typescript-eslint/eslint-plugin : Typescript 관련 린팅규칙을 설정하는 플러그인
- @typescript-eslint/parser : Typescript 를 파싱하기 위해 사용
- eslint-config-airbnb : airbnb 코딩규칙을 사용(리액트 코딩규칙 포함)
- eslint-config-prettier : prettier와 충돌을 일으키는 ESLint 규칙들을 비활성화 시키는 config
- eslint-plugin-prettier : Prettier에서 인식하는 코드상의 포맷 오류를 ESLint 오류로 출력
- eslint-plugin-react : React에 관한 린트설정을 지원
- eslint-plugin-react-hooks : React Hooks의 규칙을 강제하도록 하는 플러그인
- eslint-plugin-jsx-a11y : JSX 내의 접근성 문제에 대해 즉각적인 AST 린팅 피드백을 제공
- eslint-plugin-import : ES2015+의 import/export 구문을 지원하도록 함