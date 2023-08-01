## 웹소켓으로 채팅하기

[참고글1](https://velog.io/@cksal5911/WebSoket-stompJSReact-%EC%B1%84%ED%8C%85-1)<br/>

### Socket 연결

기본적으로 클라이언트와 서버는 stateless 하게 이뤄져 있다. 반면에 채팅은 `statefull protocol`이다. 양뱡향 통신 또는 데이터 전송이 가능하도록 한 번 연결해놓으면 해제시까지 연결을 유지한다.

최초의 접속은 http reqest를 통해서 handshaking 과정을 통해서 이뤄진다. 클라이언트에서 랜덤하게 생성된 키값이 서버에 전송되고, 서버는 이 키값을 바탕으로 토큰을 생성하여 클라이언트에게 응답을 보냄으로 두 계층이 연결된다.

### 리액트와 스프링

프론트앤드에서 리액트를 사용하고 백엔드에서 스프링을 사용하여 웹 애플리케이션 개발을 할 때에는 크게 두 가지의 옵션이 있다.

1. Socket.io

   Socket.io는 WecSocket 연결을 할 수 없거나 실패한 경우 자동 폴백 매커니즘과 함께 실시한 양방향 통신을 제공하는 완전한 기능을 갖춘 광범위하게 지원되는 라이브러리이며, Socket.IO는 사용하기 쉽고 API를 통해 클라이언트와 서버 간의 이벤트 및 메시지를 간단하게 처리할 수 있다. 공간 및 네임스페이스 기능을 사용하면 여러 사용 사례에 대한 연결을 분활할 수 있으므로 일부 시나리오에서는 유용하게 동작할 수 있다고 한다.

2. Stomp

   Stomp는 가볍고 직관적인 메시징 프로토콜로 구현 및 작업이 쉽다.

GPT가 절대적일 수는 없지만, (1) 단순성과 사용 용이성적인 측면과, (2) 풀백 메커니즘을 포함하여, 다양한 브라우저 및 장치에서 광범위한 호환성을 보장하는데 있어서의 이점, (3) 포괄적인 솔류선을 통해서 실시간 통신을 지원하며, (4) 리소스 및 자습서 및 지원을 쉽게 찾을 수 있기에 추천한다고 한다. 반면 STOMP는 실기간 통신 라이브러리가 아닌 메시징 프로토콜을 제공한다.

### [Socket.io](https://socket.io/docs/v4/)

공식문서에 따르면, Socket.io는 클라이언트와 서버 간의 짧은 대기 사간, 양방향 및 이벤트 기반 통신을 지원한다. 아래는 공식문서에 있는 간단한 소개이다. 


```javascript 
// 백엔드
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 3000 });

server.on("connection", (socket) => {
  // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server",
    content: [ 1, "2" ]
  }));

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);

    switch (packet.type) {
      case "hello from client":
        // ...
        break;
    }
  });
});

// 프론트엔드 
const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", () => {
  // send a message to the server
  socket.send(JSON.stringify({
    type: "hello from client",
    content: [ 3, "4" ]
  }));
});

// receive a message from the server
socket.addEventListener("message", ({ data }) => {
  const packet = JSON.parse(data);

  switch (packet.type) {
    case "hello from server":
      // ...
      break;
  }
});
```

socket.io가 대세인 이유는 현재 거의 모든 곳에서 지원되기 때문이다. 또한 v3 부터는 TS를 지원한다. 

### 클라이언트 구축(React)
Websocket은 TCP 연결을 기반으로, 소통하며 유저가 먼저 요청을 보내고 서버는 이를 허용하며 웹소켓으로 엽그레이드 합니다. 


```bash
yarn add socket.io-client
yarn add -D @types/socket.io
# D 플래그는 개발 중에만 필요하고 프로덕션 환경에서는 필요하지 않은 패키지를 설치하려는 경우에 사용
```

사실, 소켓io는 리액트와 어울리지 않는다. 하나의 컴포넌트를 연결하고 다른 컴포넌트로 이동하면 연결이 끊어집니다. 이를 방지하기 위해서 콩통된 컴포넌트에 집어넣을 수 있습니다. 그래서 훅에다 설정할 예정입니다. 화면이 없고 로직만 있는 경우 이렇게 활용할 수 있습니다. 

```tsx
import io from 'socket.io-client
import {useCallback} from 'react


export const useSocket = () => {
  const socket = io.connect(`${backURL}`) // 이렇게 하면 연결이 끝납니다. 
  socket.emit('hello', 'world(') // 서버쪽으로 hello 라는 이름을 가진 이벤트로 "world"를 보냅니다. 
  socket.on('message', (data) => {
    console.log(data) // 서버로부터 받은 응답을 콘솔에 찍을 수 있습니다. 
  })
  socket.disconnect() // 연결된 소켓을 종료하곘다는 선언입니다. 
  return 
}
```

정리하면 이렇습니다. 
1. `connect`는 소켓을 연결합니다.  
2. `emit`으로 보내고
3. `on`으로 받습니다. 
4. `disconnect`는 연결된 소켓을 종료합니다. 

프론트에서의 socket.io는 이게 전부입니다. 연결하고 -> 보내고 -> 받고 -> 종료하고 입니다. 여기서 주의할 점은 단지 서버쪽 주소로 연결하면 모든 사람과 소통하는 것이 기본입니다. 즉 제한을 해줄 필요가 있습니다. 단적인 예로 비밀번호를 보냈다고 하자. 이때 잘못하면 모든 사람과 굥유하는 비밀번호를 만천하에 알리게 되는 셈이다. 

`범위`를 잘 정해줘야 합니다. socket.io에서는 이를 `nameSpace`와 `room`으로 제한합니다. 

```tsx
const socket = io.connect(`${backURL}/namespace`) // 범위를 축소합니다.
```

### Socket.io Hooks 만들기 

```tsx
import io from 'socket.io-client
import {useCallback} from 'react


const sockets = {}
export const useSocket = (workspase?:string) => {
  if(!workspace) {
    return;
  }

  const sockets[workspace] = io.connect(`${backURL}/ws-${workspase}`)
  sockets[workspace].emit('hello', 'world(')
  sockets[workspace].on('message', (data) => {
    console.log(data) 
  })
  const disconnect = socket.disconnect() 
  return { sockets, disconnect }
}

// 컴포넌트에서 사용하기
const App = () => {
  const {workspase} = useParams()
  const {sockets, disconnect} = useSocket(workspase)

  useEffect(()=> {
    socket.on('message') // 메시지를 서버에서 받을 때 
    socket.emit  // 메시지를 서버로 보낼 때
    disconnect() // 연결을 끝고싶을 때
  }, [])

  return 
}
```


### 타입 적용하기

```tsx
import io from 'socket.io-client
import {useCallback} from 'react


const sockets {[key:string] : SocketIOClient.Socket} = {};
export const useSocket = (workspase?:string): [SocketIOClient.Socket | undefined,  ()=> void] => {
  const disconnent = useCallback(()=>{
    if(workspase) {
      sockets[workspase].disconnect()
      delete sockets[workspase] // 연결이 끊어지면, 객체에서 식제합니다. 
    }
  }, [workspase])

  if(!workspace) {
    return [undefined, disconnent]
  }

  const sockets[workspace] = io.connect(`${backURL}/ws-${workspase}`)
  sockets[workspace].emit('hello', 'world(')
  sockets[workspace].on('message', (data) => {
    console.log(data) 
  })
  const disconnect = socket.disconnect() 
  return [sockets[workspace], disconnect]
}

// 컴포넌트에서 사용하기
const App = () => {
  const {workspase} = useParams()
  const {sockets, disconnect} = useSocket(workspase)

  useEffect(()=> {
    socket.on('message') // 메시지를 서버에서 받을 때 
    socket.emit  // 메시지를 서버로 보낼 때
    disconnect() // 연결을 끝고싶을 때
  }, [])

  return 
}


// 예를 들어서 로그인 했음을 서버로 알릴 때 
const App = () => {
  const {workspase} = useParams()
  const [sockets, disconnect] = useSocket(workspase)

  // 전역에서 관리하는 채널과 유저 데이터가 있는 경우
  useEffect(()=> {
    if(channelData && useeData && sockets) {
      sockets.emit('login', {id:userData.id, chnnels: channelData.map(v => v.id)})
    }
  }, [sockets, channelData, userData])

  // 연결을 끊을 때, 기존 워크스페이스가 변경될 때 
  useEffect(() => {
    return () => {
      disconnect()
    }
  }, [workspase])

  return 
}




// 로그인을 알린 후, 서버로부터 활동 중인 회원의 리스트를 받을 때 
const App = () => {
  const {workspase} = useParams()
  const [sockets, disconnect] = useSocket(workspase)

  useEffect(()=> {
    console.log("DMlist가 바뀌었다.", workspase)
  }, [workspase])

  useEffect(() => {
    sockets?.on("onlineList", (data) => {setOnlineList(data)})
    sockets?.on("dm", onMessage)
    console.log("socket on dm", sockets?.hanlistenrens('dm', socket))
    return () => {
      sockets?.off('dm', onMessage) // 클린업이 항상 on과 짝지어 있어야 합니다. 
      sockets?.off('onlineList')
    }
  }, [sockets])

  return 
}
```
