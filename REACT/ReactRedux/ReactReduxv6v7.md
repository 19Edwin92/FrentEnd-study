## ReactRedux - v6과 v7
컴포넌트에 대한 많은 고민들이 있다. 그 중에 하나가 `컨테이너 컴포넌트`와 `프리젠테이션 컴포넌트`를 구분하는 일이 될 것이다.

- `컨테이너 컴포넌트` : 상태관리와 데이터 흐름을 담당한다. Redux를 통한 전역 상태관리를 적용하는 프로젝트라면, 액션 디스패치 및 데이터를 프리젠테이션 컴포넌트에 전달하는 역할을 수행하는 컴포넌트가 된다. 

- `프리젠테이션 컴포넌트` : 주로 UI를 구성하며, 사용자와 상호작용하는 부분이 다뤄진다. 해당 컴포넌트는 props를 받아와서  UI를 렌더링하며, 사용자 이벤트에 응답하여 액션을 호출하거나 데이터를 변경하는 등의 역할을 수행한다. 

이렇게 컴포넌트의 역할과 책임을 분리하여 다루는 패턴을 `소프트웨어 디자인 패턴`이라고 한다. 이와 같이 컨테이너 컴포넌트와 프리젠테이션 컴포넌트를 분리하면, 코드의 구조와 유지보수성을 향상시킬 수 있다. 역할과 책임이 나눠져 있ㄷ기에, 스타일을 담당하는 컴포넌트를 독립적으로 수정하거나 교체할 수 있어 유연성이 높아진다는 특징을 가진다. 

## ReactRedux 버전 6.x.x - connect
<details>
<summary>프리젠테이션 컴포넌트</summary>

  ```jsx
  // 프리젠테이션 컴포넌트
  import React from 'react'
  import styled from "styled-components";

  function VelopertCounter({number, color, onIncrement, onDecrement, onSetColor}) {
      return (
        <div>
          <Counter
          onClick={onIncrement} 
          onContextMenu={(e) => {e.preventDefault(); onDecrement();}} 
          onDoubleClick={onSetColor}
          style={{backgroundColor: color}}>
              {number}
          </Counter>
        </div>
      )
    }
  ```
</details>

1. 컴포넌트 `VelopertCounter`는 5개`({number, color, onIncrement, onDecrement, onSetColor})`의 props를 전달받고 있다. 그렇다면 해당 컴포넌트에 props를 내려줄 컴포넌트가 무엇인가? 살펴보아야 하며, 바로 그 컴포넌트가 `컨테이너 컴포넌트`인 셈이다. 

2. `컨테이너 컴포넌트`를 구성하는 방법이 `React-Redux 버전 6.x.x`과 `React-Redux 버전 7.x.x`이 다르며, 버전이 상승되며 코드가 간소화된 부분이 있다. 아래에서는 해당 부분의 상승의 측면에서 이 부분을 살펴보고자 한다. 

<details>
<summary>React-Redux 6.x.x와 connect 코드살펴보기</summary>

  ```jsx
  import VelopertCounter from '../pages/VelopertCounter'
  import * as actions from '../redux/modules/reducervelopertCounter'
  import {connect} from 'react-redux'
  // "useDispatch"와 "useSelector" 가 적용되지 이전의 구버전에서의 활용법 


  // store 안의 state 값을 props 로 연결해줍니다.
  const mapStateToProps = (state) => ({
    number: state.velopertCounterReducer.counter,
    color: state.velopertCounterReducer.color
  })

  const mapDispatchToProps = (dispatch) => ({
    onIncrement: () => dispatch(actions.increment()),
    onDecrement: () => dispatch(actions.decrement()),
    onSetColor: () => {
      const color= getRandomColor();
      dispatch(actions.set_color(color))
    }
  })

  // VelopertCounter 컴포넌트의 Container 컴포넌트
  // VelopertCounter 컴포넌트를 어플리케이션의 데이터 레이어와 묶는 역할을 합니다.
  const VelopertCounterContatiner = connect(
    mapStateToProps,
    mapDispatchToProps
  )(VelopertCounter)

  export default VelopertCounterContatiner

  // src/utils/index.js 
  function getRandomColor() {
    const colors = [
        '#495057',
        '#f03e3e',
        '#d6336c',
        '#ae3ec9',
        '#7048e8',
        '#4263eb',
        '#1c7cd6',
        '#1098ad',
        '#0ca678',
        '#37b24d',
        '#74b816',
        '#f59f00',
        '#f76707'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    // 랜덤 색상 반환
    return colors[random];
  }
  ```
</details>

1. `number, color`는 리덕스 store에 등록된 변수를 가져와서 사용하고, 있고, `onIncrement, onDecrement, onSetColor`는 dispatch 메소드를 가져와서 해당 컴포넌트에서 사용하고 있는 것을 볼 수 있다. 

    - `mapStateToProps` : 이는 store에 등록된 변수를 객체로 묶어서 담았고
    - `mapDispatchToProps` : 이는 dispatch로 store에 등록된 값을 변경할 수 있는 메소드가 객체로 담겨 있다. 
    - `import {connect} from 'react-redux'` : `connect` 메소드는 해당 컴포넌트에서 선언된 객체변수를 하나로 취합하는 메소드이다. 이렇게 생각해보자. JS에서 객체를 하나로 취합하는 메소드 가운데 ` Object.assign()`이 있다. `connect` 메소드는 객체를 취합하여, 이를 컴포넌트에게 props로 내려주는 `react-redux`의 메소드로, Redux와 React를 연결하는 기능을 제공한다. 
      - `connect(전달할 props들을 기록하며, 하나로 묶음처리)(전달할 컴포넌트)`

2. `React-Redux 6.x.x와 connect`는 정리하면, 리덕스 시스템에서 프리젠테이션 컴포넌트에 전달할 props에 대한 로직을 처리할 컨테이너 컴포넌트를 제공하는 메소드로 선언된 `props의 객체`를 하나로 묶고, 이를 전달한 컴포넌트로 전달함으로 구성하는 것이다.  


## ReactRedux 버전 7.x.x - useDispatch, useSelector
<details>
<summary>React-Redux 7.x.x와 connect 코드살펴보기</summary>

  ```jsx
  //// 컨테이너 컴포넌트
  import React from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import * as actions from '../redux/modules/reducervelopertCounter';

  function VelopertCounterContainer() {
    const dispatch = useDispatch();
    const { counter, color } = useSelector(state => state.velopertCounterReducer);

    const handleIncrement = () => {
      dispatch(actions.increment());
    };

    const handleDecrement = (e) => {
      e.preventDefault();
      dispatch(actions.decrement());
    };

    const handleSetColor = () => {
      const newColor = getRandomColor();
      dispatch(actions.set_color(newColor));
    };

    return (
      <VelopertCounter
        number={counter}
        color={color}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onSetColor={handleSetColor}
      />
    );
  }

  export default VelopertCounterContainer;

  // src/utils/index.js 
  function getRandomColor() {
    const colors = [
        '#495057',
        '#f03e3e',
        '#d6336c',
        '#ae3ec9',
        '#7048e8',
        '#4263eb',
        '#1c7cd6',
        '#1098ad',
        '#0ca678',
        '#37b24d',
        '#74b816',
        '#f59f00',
        '#f76707'
    ];

    // 0 부터 12까지 랜덤 숫자
    const random = Math.floor(Math.random() * 13);

    // 랜덤 색상 반환
    return colors[random];
  }
  ```
</details>

1. 구버전 6.x.x는 `connect`를 통해서 `컨테이너 컴포넌트`를 작성해야 했었다. 리덕스 스토어와 컴포넌트를 연결하여 상태와 액선을 전달해야 했기 때문이었다. 하지만, 최신 리덕스는 `useDispatch`와 `useSelector`를 활용하여 상태 관리와 액션 디스패치를 컴포넌트 내부에서 직접적으로 상호작용할 수 있도록 구성하고 있으며, 코드 구조의 단순화를 이루었다. 즉 유지보수가 용이했다는 측면에서 `connect`가 아닌, `useDispatch`와 `useSelector`를 통한 코드작성이 현재 사용되고 있다. 











