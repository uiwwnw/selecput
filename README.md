# selecput(`<select>` + `<input>`)
### 셀렉트(combo menu)와 input(typing area)을 동시에 지원하는 메뉴 플러그인입니다.
### This is plugin what `<select>` + `<input>`.

### 사용방법 How to use
1. 기본 default
```javascript
  new selecput('jQuery Selector'); /// You can use jQuery Selector ex) class=> . , id => #, tagname => tagname
```
1. 클래스명 변경 change class name
```javascript
  new selecput('jQuery Selector', {
    inputClass: '',
    etc...
  });
```
1. 콜백 callback
```javascript
  new selecput('css선택자', {
    onLoad: function() {}, // 로드 완료
    onChange: function() {} // 값이변할때
  });
```
