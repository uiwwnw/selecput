# selecput(`<select>` + `<input>`)
### 셀렉트(combo menu)와 input(typing area)을 동시에 지원하는 메뉴 플러그인입니다.
### This is plugin what `<select>` + `<input>`.

### 사용방법 How to use
1. 기본 default
```javascript
  new selecput('jQuery Selector'); /// You can use jQuery Selector ex) class=> . , id => #, tagname => tagname
```
1. 콜백 callback
```javascript
  new selecput('css선택자', {
    onLoad: function(e) {}, // 로드 완료
    onChange: function(e) {} // 값이변할때
  });
```
1. 옵션 option
```javascript
new selecput('.ddd', {
  editAble: 'adwdwdwadawdaqw', // 수정하는 옵션의 value 값
  absoluteClose: true // 열렸을때 어딜 누르든 닫히는 옵션, 기본 false;
});
```
[jsfiddle's demo](https://jsfiddle.net/uiwwnw/h21opkv6/)

#### selecput v0.1.1 
#### http:/github.com/uiwwnw/selecput/
#### copyright uiwwnw
