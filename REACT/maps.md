## 리액트에서 길찾기 서비스 
```bash
## 가장 일반적인 라이브러리
react-native-geolocation-service 
```

### 1. 가장먼저 할 일은 사용자의 위치정보를 불러오는 일이다. 

```javascript 
// 바닐라JS에서 현제위치를 불러오듯, 라이브러리에서 현재 위치를 블러온다.
navigator.geolocation.getCurrentPosition() 

// 해당 라이브러리
Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
      },
      error => {
        console.error(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
```

그러나 이때 주의할 점이 있다. 기기에 따라서 허락요청이 다르다는 점이다. 

### 2. 지도를 그리기
```bash
react-native-maps
```
