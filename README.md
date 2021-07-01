

## 특이사항
- 크롤링은 일단 JSON 데이터로 파싱하지 않고 HTML 을 저장하여, 프론트엔드에서 해당 HTML을 사용하는 식으로 구현하게되었습니다.

# Core 

## Component 



1. **setUp**

- `initDome` 해당 컴포넌트의 Container 가 될 Element를 등록한다.
- `initChildren`자식 컴포넌트를 등록한다.
- `storeObserver`useSelector -> useSelector에서 특정 스토어의 데이터가 쓰이는지 확인, 쓰인다면 해당 컴포넌트를 스토어의 옵저버로 등록하고, 스토어의 상태값이 변할때마다 updateComponent 메서드를 실행한다.
- `routerObserver`usePathName -> usePathname에서 라우팅의 pathname이 참조되는지 확인 , 참조된다면 해당 컴포넌트를 라우터의 옵저버로 등록하고, pathname이 변경될 때 마다 render 메서드 실행하여 리렌더링한다.



2. **mount**  

- `componentWillMount` 컴포넌트가 렌더링 되기 전 실행 /  주로 스토어에 dispatch를 보낸다.
- `render` 컴포넌트 렌더링한다.
- `bindEvents` 필요한 이벤트를 바인딩 한다.
- `children mounting` 등록된 자식 컴포넌트를 마운팅 해준다.





3. **componentWillUnmount**

- 페이지를 벗어나서 해당 컴포넌트가 언마운팅 될 때 실행된다.
- 등록된 이벤트가 모두 해지된다.
- 등록된 자식 컴포넌트의 componentWillUnmount도 실행한다.



<br/>



## Store

- 액션과 함께 `dispatch`가 호출되면, reducer에 등록된 함수를 실행한다.
- 액션은 **REQUEST, SUCCESS, FAIL** 
- REQUEST : 서비스에 해당 요청을 보낸다.  api 호출은 모두 서비스에서 해준다.
- SUCCESS : 서비스에서 요청을 완료시 dispatch를 보내고, 스토어에 저장할 데이터를 함께 보내준다.
- FAIL : 서비스에서 요청 실패시 dispatch를 보내고 에러메시지를 함께 보내준다.
- 스토어에 저장되는 상태는 **status / data / error** 로 나뉜다.
- status : LOADING  || SUCCESS || FAIL  이 되고, 요청의 상태를 알려준다.
- error : 에러메시지를 저장한다.



<br/>



## Router

- `history.state` 를 사용하여 라우팅을 한다.
- popstate 이벤트와, Anchor Tag 클릭 이벤트를 처리한다.
- Props로 페이지 컴포넌트를 받아와서,  요청받은 주소에 따른 페이지를 마운팅/언마운팅 해준다.
- 새로고침 했을 경우에는 webpack historyApiFallback 설정을 통해 해당 페이지를 제공해준다. 



<br/>



## Storage

- 웹 스토리지
- 원래는 add, remove 메서드 까지 구현하여 스토리지에 대한 연산을 전부 처리했지만, 결국 set과 get 메서드만 구현했는데 아래의 이유와 같다.
  - 저장되는 데이터마다 기준이 되는 key가 다를 수 있다.
  - 원래 웹 스토리지가 하는 일은 set과 get뿐이니까, 그 외의 일은 서비스단에서 처리해주는게 맞다고 판단하였다.



