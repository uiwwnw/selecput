# selecput(`<select>` + `<input>`)
### 셀렉트(combo menu)와 input(typing area)을 동시에 지원하는 메뉴 플러그인입니다.
### This is plugin what `<select>` + `<input>`.

### 사용방법
1. 기본 
```javascript
  new selecput('jQuery Selector'); /// You can use jQuery Selector ex) class=> . , id => #, tagname => tagname
```
1. 선택자 변경
```javascript
  new selecput('jQuery Selector', {
    inputClass: '',
    etc...
  });
```
1. 콜백 
```javascript
  new selecput('css선택자', {
    onLoad: function() {},
    onChange: function() {}
  });
```
