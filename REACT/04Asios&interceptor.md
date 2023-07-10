## [axios](https://axios-http.com/kr/docs/intro)

Axios는 node.js와 브라우저를 위한 Promise 기반 HTTP 통신 라이브러리이다. 대표적인 특징으로는 다음과 같다. 
- Promise API를 지원
- 요청 및 응답 인터셉트

1. Promise API를 지원

    ```javascript
    axios.get('/user?ID=12345')
      .then(function (response) {
        // 성공 핸들링
        console.log(response);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });

      // 또는 ECMAScript 2017 문법
      async function getUser() {
        try {
          const response = await axios.get('/user?ID=12345');
          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }
    ```

2. axios.create 인스턴스 
`새로운 인스턴스를 생성한다`는 것은 프로그래밍에서 클래스 기반(속성, 메서드)으로 생성된 객체이다. 인스턴스는 각각 독립적인 상태와 동작을 가지게 된다. 즉 인스턴스는 클래스의 특정한 상태와 동작을 나타내는 실체인 것이다. 특별히 `Axios의 인스턴스`는 `Axios 라이브러리의 기능을 사용하여 HTTP 요청`을 보내기 위한 독립적인 객체를 말한다. 이때, 개별적인 설정과 동작을 수행한다. 


    ```jsx
    // 인스턴스 생성하기 : axios.create({})
    const instance = axios.create({
      baseURL: 'https://some-domain.com/api/',
      timeout: 1000,
      headers: {}
    });
    ```

    - `baseURL` : 인스턴스가 API를 요청할 기본 URL을 지정할 수 있다. 
    - `timeout` : 인스턴스가 API에 요총하는 시간을 설정한다. 즉 서버로부터 응답을 받기까지의 최대 대기 시간이다. 이를 넘어선다면, 인스턴스는 에러를 발생시킨다. 즉 `rejected 상태로 전환`되는데, 에러 핸들러에서는 `ECONNABORTED`를 반환한다. 즉 `ECONNABORTED`의 코드가 발생되면 "요청 시간이 초되되었다는" 설정이 가능한 것이다. 

    ```javascript 
    instance.get('/some-endpoint')
    .then(response => {
      // 응답 처리
    })
    .catch(error => {
      // 에러 처리 
      if (error.code === 'ECONNABORTED') {
        // 시간 초과 에러 처리
        console.log('요청 시간이 초과되었습니다.');
      } else {
        // 기타 에러 처리
        console.error(error);
      }
    });
    ```

    인스턴스의 config 설정에는 더 다양한 내용들이 담겨 있다. [공식문서에 따르면](https://axios-http.com/kr/docs/req_config)

    ```javascript 
    {
      method:"get" // get 메서드가 기본값으로 설정된다. 
      transformRequest: [function (data, headers) {
        // 데이터를 변환하려는 작업 수행하는 것으로 
        // 요청 데이터를 서버로 전송하기 전에 변경할 수 있게 해줍니다.
        return data;
      }],
      transformResponse: [function (data) {
        // 데이터를 변환하려는 작업 수행
        // 응답 데이터가 then, catch로 전달되기 전에 변경할 수 있게 해준다. 
        return data;
      }],

    }
    ```

3. Axios 응답 스키마 

    ```javascript
    axios.get('/user/12345')
      .then(function (response) {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
      });
    ```

    - `response.data` : 서버에서 전달받은 응답이다.
    - `response.status` : HTTP 상태 코드를 반환받는다. 
    - `response.statusText` : HTTP의 상태 메시지를 반환받는다. 
    <br/><br/>

4. Axios 인터셉터
   Axios는 HTTP요청과 응답에 대한 전역적인 인터셉터를 설정할 수 있다. 대표적인 사용례는 요청 인터셉터 전에 토큰을 기록하는 것이다. 중요한 것은 통신의 결과인 then과 catch가 실행되기 이전에 처리하는 것을 말한다. 

    - 요청시 

      ```javascript 
      axios.interceptors.request.use(config => {
        const token = getToken();
        // 요청 헤더에 "Authorization" 헤더를 추가
        token && config.headers.Authorization = `Bearer ${token}`;
        return config;
      });

      // 이를 function 키워드와 함께 에러시를 함께 핸들링 하면 아래와 같다. 
      instaaxiosnce.interceptors.request.use(
        function (config) {
          console.log("인터셉터 요청 성공!");
          config.headers.Authorization = token ? `Bearer ${token}` : "";
          return config
        },
        function (error) {
          console.log("인터셉터 요청 오류!");
          return Promise.reject(error)
        } 
      )
      ```

    - 응답시 

      ```javascript
      axios.interceptors.response.use(response => {
        // 응답 데이터에서 필요한 정보를 추출하거나 가공
        
        return response;
      }, error => {
        // 에러 처리를 수행
        
        return Promise.reject(error);
      });
      ```  

    여기에 질문이 발생된다. interceptor에서 Error를 제어하는 것과 catch 문에서 Error를 제어하는 방식에서의 차이다. 
    - `catch문과 Error 처리` : 개별적인 HTTP 요청에 대한 에러처리를 위해 사용된다는 점이다. 반면 인터셉터를 사용하면 모든 요청에 대해 `전역적으로 일관된 에러 처리 로직을 적용할 수 있다`. 즉 중복코드를 방지할 수 있다는 점에 장점이 있다. 