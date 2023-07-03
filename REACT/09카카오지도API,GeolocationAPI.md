## 리액트에서 카카오 지도 API 사용하기, geolocationAPI

1. 먼저 [Kakao.developers](https://developers.kakao.com)에서 Key를 발급받아야 한다. 

    ```html
    <script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=발급받은 APP KEY를 넣으시면 됩니다."></script>
    <!--  -->
    ```

    카카오에서 이야기하는 규칙은 
    - HTML파일안의 head, body 등 어떠한 위치에 넣어도 상관없습니다.
    - 반드시 실행 코드보다 먼저 선언되어야 합니다.
    - `defer` 속성을 스크립트 태그에 넣을 수 없다는 이야기다. 
    <br/><br/>

2. 리액트 컴포넌트에 아래와 같이 지도가 들어갈 공간을 마련해 준다. 

    ```jsx
    import React from 'react'
    function Kakao() {
      return <div id="map" style={{height:"500px", borderRadius:"20px"}} />
    }

    export default Kakao
    ```
    <br/>

3. window(전역)에 선언된 kakao 에 대한 컴포넌트 내에서의 사용

    ```jsx
    // 컴포넌트 밖에서 변수를 선언하거나 
    const {kakao} =  window
    // 컴포넌트 내에서 전역에서 생성자 함수를 통해 새로운 인스턴스 생성시 직접 호출할 수 있다. 
    let kakao = new window.kakao

    // 
    useEffect(() => {
    let container = document.getElementById("map");
    let options = {
        center: new kakao.maps.LatLng(latitue, longitude),
        level: 3,
      };

      let map = new window.kakao.maps.Map(container, options);
      // map.setDraggable(false); //드래그 막기
      // map.setZoomable(false); //줌 막기
    }, [latitue,longitude]);
    ```

    - `useEffect`를 통해서 컴포넌트가 마운트 된 후에, 해당 생성자 함수(kakao)가 동작하도록 하였다. 
    - `container = document.getElementById("map");` 예제에 따른 것이지만, useRef를 사용해도 되며, 리액트에서는 오히려 useRef가 더 권장될 것이다.
    
      ```jsx
      const mapRef = useRef(null)
      /* ...  */
      let map =  new kakao.maps.Map(mapRef.current, options);
      /* ...  */
      return <div ref={mapRef} style={{height:"500px", borderRadius:"20px"}} />
      ``` 
      <br/>

4. 현재 위치정보(경도, 위도) 불러오기  
  - useEffect가 화면 렌더링이 완료된 후 혹은 어떤 값이 변경되었을 때 사이드 이펙트를 수행한다면,
  - useLayoutEffect는 렌더링 후 layout과 paint 전에 동기적으로 실행된다.
    - useLayoutEffect를 사용한 이유는, 현재 좌표를 얻는 것이 페이지에서 지도를 렌더링하고 배치하는 것과 직접적으로 관련되기 때문으로, 지도의 정확한 배치를 보장하기 위해 DOM 업데이트 직후 수행하는 동기적 작업을 선택하였다. 그 결과 지연 없이 지도가 생성되고 렌더링 되게 하였다. 반면 이 부분에서 useEffect를 사용했다면, 렌더링 후 비동기적으로 실행되는데, 브라우저가 DOM을 그린 후 실행되며 렌더링에 약간의 지연이 발생될 수 있다. 

    ```jsx
    useEffect(()=>{
      if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
        },
        (error) => {
          console.error(error)
        }
        )
      } else {
        console.error('Geolocation is not supported by this browser')
      }
    },[])
    ```

    - `if(navigator.geolocation)`는 브라우저에서 geolocation API를 지원하는지 확인하는 조건문이다. 즉 브라우저가 지원한다면 실행할 것이다. 
    - geolocationAPI : [tcpschool 설명](http://www.tcpschool.com/html/html5_api_geolocation)에 따르면, geolocation API는 사용자의 현재 위치 정보를 가져올 때 사용하는 자바스크립트 API이며, HTML5에서 새롭게 추가되었다. 
    - `getCurrentPosition()` : 사용자의 위도와 경도 값을 얻을 수 있다. 
    - 그러나 요청은 실패를 전제하기에 실패시의 코드도 아래와 같이 기록하였다. 하나는 동작하지만 좌표를 얻어오지 못했을 때, 그 아래는 브라우저가 해당 API를 지원하지 않을 때 기록되도록 하였다. 
    - 내용을 보면, 코드의 실행으로 `setLatitude와 setLongitude`가 업데이트된다. 
        <br/><br/>

5. 카카오 maps.Map 생성자 함수 사용하기

    ```jsx
    useEffect(() => {
      if(latitue && longitude) {
        let options = {
          center: new kakao.maps.LatLng(latitue, longitude),
          level: 3,
        };
        new kakao.maps.Map(mapRef.current, options);
      }
    }, [latitue,longitude]);
    ```

    - 상태(`latitue, longitude`)가 변경되면, 사이드 이펙트가 실행되며, `mapRef.current`에 불러온 지도를 기록할 것이다. 
    <br/><br/>

6. 미리보기 git 기록하기

    - 비동기 처리적인 부분이 있기에, 화면에 로딩이 지연되는 것을 볼 수 있다. 
    - 이점에 있어서 미리 화면에 어떤 값을 보여주고, 적용된 화면을 그 뒤에 기록하고자 하였다. 

        ```jsx
        return <div 
          ref={mapRef} 
          style={{
              height:"500px", 
              borderRadius:"20px",
              backgroundImage:`url(${process.env.PUBLIC_URL}/cartoon.gif)`,
              backgroundPosition:"center", 
              backgroundSize:"contain", 
              backgroundRepeat: "no-repeat"}} /> 
        ```

    <img src="../img/cartoon.gif" width="250px"> <br/>
    사용된 이미지는 구글링으로 찾은 이미지를 활용하였다. 현재 좌표가 구해지지 전까지는 해당 이미지가 화면에 기록될 것이다. 이는 추후에 값이 불러왔을 때, 레이어 후면에 계속 위치해 있을 수 있는데, 조건문으로 해당 이미지를 제거할 수도 있다. 

