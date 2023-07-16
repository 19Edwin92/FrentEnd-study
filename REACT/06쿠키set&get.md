## 로그인(JWT)과 쿠키에 저장하기 
1. 라이브러리 없이, 바닐라JS(쿠기에 저장)

    ```jsx
    // setter
    const AccessToken=response.headers.authorization;
    document.cookie = `AccessToken=${AccessToken}; path=/;`


    // gettter
    const cookies = cookieString.split(';')
                                .filter(cookies => cookies.includes("AccessToken"))[0]
                                .split('=')[1] || null;

    // 쿠키 삭제
     document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;                                
    ```


2. 라이브러리 사용, `universal-cookie`
    ```jsx
    import Cookies from "universal-cookie";
    //import jwtDecode from "jwt-decode";

    // setter
    export const cookies = new Cookies();
    const token = response.headers.authorization;
    cookies.set("access_token", token, path="/");
    
    // gettter
    access_token = cookies.get("access_token");
    //decodetoken = jwtDecode(access_token);
    ```

