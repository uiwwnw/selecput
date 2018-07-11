/*
  selecput v0.1.2
  http:/github.com/uiwwnw/selecput/
  copyright uiwwnw
*/
var selecput = function(el, opt) {
  this.hasClass = function(e, name) {
    var classs = e.getAttribute('class');
    if (classs === null || classs === undefined || classs === ' ') {
      return false;
    }
    if (classs.indexOf(name) === -1) {
      return false;
    } else {
      return true;
    }
  };
  this.addClass = function(e, name) {
    var classs = e.getAttribute('class');
    // console.log(typeof classs);
    if (classs === null || classs === undefined || classs === ' ') {
      e.setAttribute('class', name);
      return false;
    }
    if (classs.indexOf(name) === -1) {
      e.setAttribute('class', classs + ' ' + name);
    }
  };
  this.removeClass = function(e, name) {
    var classs = e.getAttribute('class');
    if (classs === null) {
      return false;
    }
    if (classs.indexOf(name) !== -1) {
      classs = classs.substr(0, classs.indexOf(name) - 1);
      e.setAttribute('class', classs);
    }
  };
  this.toggleClass = function(e, name) {
    var classs = e.getAttribute('class');
    if (classs === null) {
      e.setAttribute('class', name);
      return false;
    }
    if (classs.indexOf(name) === -1) {
      e.setAttribute('class', classs + ' ' + name);
    } else {
      classs = classs.substr(0, classs.indexOf(name) - 1);
      e.setAttribute('class', classs);
    }
  };
  this.repeat = function(fn, i) {
    var num = 0;
    var repeat = function() {
      if (i > 0) {
        i -= 1;
        fn(num);
        num += 1;
        repeat(fn, i);
      } else {
        return false;
      }
    };
    repeat(fn, i);
  };
  this.makeDom = function(i) {
    _this.addClass(ctr.el[i], 'selecput');
    ctr.selecput[i].el = document.createElement('div');
    (ctr.selecput[i].class !== null) && (ctr.selecput[i].el.setAttribute('class', ctr.selecput[i].class));
    (ctr.selecput[i].id !== null) && (ctr.selecput[i].el.setAttribute('id', ctr.selecput[i].id));
    (ctr.selecput[i].name !== null) && (ctr.selecput[i].el.setAttribute('name', ctr.selecput[i].name));

    ctr.selecput[i].input = document.createElement('input');
    (ctr.selecput[i].text === undefined ||ctr.selecput[i].text === null) && (ctr.selecput[i].text = '');
    if (ctr.selecput[i].placeholder !== null) {
      ctr.selecput[i].input.setAttribute('value', ctr.selecput[i].text);
      ctr.selecput[i].input.setAttribute('placeholder', ctr.selecput[i].placeholder);
    } else {
      ctr.selecput[i].input.setAttribute('readonly', '');
      ctr.selecput[i].input.setAttribute('value', ctr.selecput[i].text);
    }
    ctr.selecput[i].input.setAttribute('class', ctr.inputClass);
    ctr.selecput[i].input.setAttribute('data-value', ctr.selecput[i].value);

    ctr.selecput[i].i = document.createElement('i');
    ctr.selecput[i].i.setAttribute('class', ctr.iClass);

    //ctr.selecput[i].dim = document.createElement('i');
    //ctr.selecput[i].dim.setAttribute('class', ctr.dimClass);

    function makeOption(j) {
      var _p = document.createElement('p');
      (ctr.selecput[i].option[j].selected !== null) && (_this.addClass(_p, ctr.selectedClass));
      (ctr.selecput[i].option[j].value !== null) && (_p.setAttribute('data-value', ctr.selecput[i].option[j].value));
      (ctr.selecput[i].option[j].placeholder !== null ) && (_p.setAttribute('data-placeholder', ctr.selecput[i].option[j].placeholder));
      (ctr.selecput[i].option[j].text !== null) && (_p.innerText = ctr.selecput[i].option[j].text);
      _p.setAttribute('tabindex', '0');
      ctr.selecput[i].option[j].el = _p;
      ctr.selecput[i].el.append(_p);
      _this.optionFocusBlur(i, j);
    }
    _this.repeat(makeOption, ctr.selecput[i].option.length);
    ctr.el[i].innerHTML = '';
    ctr.el[i].append(ctr.selecput[i].input);
    ctr.el[i].append(ctr.selecput[i].i);
    ctr.el[i].append(ctr.selecput[i].el);
    //ctr.el[i].append(ctr.selecput[i].dim);
    (ctr.onLoad !== undefined) && (_this.onLoad(ctr.onLoad));
  };
  this.querySelector = function(e, parents) {
    var _e;
    //console.log(parents);
    parents = parents === undefined ? document : parents;
    switch (e[0]) {
    case '.':
      _e = parents.getElementsByClassName(e.substr(1));
      break;
    case '#':
      _e = [];
      _e[0] = parents.getElementById(e.substr(1));
      break;
    default:
      _e = parents.getElementsByTagName(e);
      break;
    }
    return _e;
  };

  this.optionClick = function(i) {
    for (var j = 0; j < ctr.selecput[i].option.length; j++) {
      ctr.selecput[i].el.childNodes[j].onclick = function() {
        _this.value(this, i);
      };
      ctr.selecput[i].el.childNodes[j].onkeypress = function() {
        if (window.event.keyCode === 13) {
          _this.value(this, i);
        }
      };
    }
  };
  this.inputClick = function(i) {
    ctr.selecput[i].input.onmousedown = function() {
      _this.open(i);
    };
    ctr.selecput[i].input.onkeypress = function() {
        if (window.event.keyCode === 13) {
        _this.open(i);
      }
    };
  };
  this.inputFocusBlur = function(i) {
    ctr.selecput[i].input.onfocus = function() {
      //if (ctr.selecput[i].input.getAttribute('readonly') === null) {
      ctr.selecput[i].sto = setTimeout(function() {
        ctr.el[i].setAttribute('data-focus', 'input');
      }, 10);
      //}
    };
    ctr.selecput[i].input.onblur = function() {
      //if (ctr.selecput[i].input.getAttribute('readonly') === null) {
      ctr.selecput[i].sto = setTimeout(function() {
        ctr.el[i].removeAttribute('data-focus');
      }, 10);
      //}
      _this.absoluteClose(i);
    };
  };
  this.optionFocusBlur = function(i, j) {
    ctr.selecput[i].option[j].el.onfocus = function() {
      ctr.selecput[i].sto = setTimeout(function() {
        ctr.el[i].setAttribute('data-focus', 'option');
      }, 10);
    };
    ctr.selecput[i].option[j].el.onblur = function() {
      ctr.selecput[i].sto = setTimeout(function() {
        ctr.el[i].removeAttribute('data-focus');
      }, 10);
      _this.absoluteClose(i);
    };
  };
  this.variables = function(i) {
    var _selected = false;
    var _i;
    var _e = _this.querySelector('select', ctr.el[i])[0];
    var _option = [];

    function makeOption(i) {
      var __option = {
        value: _this.querySelector('option', _e)[i].getAttribute('value'),
        selected: _this.querySelector('option', _e)[i].getAttribute('selected'),
        text: _this.querySelector('option', _e)[i].innerText,
        placeholder: _this.querySelector('option', _e)[i].getAttribute('data-placeholder')
      };
      (__option.selected !== null) && (_selected = [__option.value, __option.text, __option.placeholder]);
      (__option.selected !== null) && (_i = i);
      _option.push(__option);
    }
    _this.repeat(makeOption, _e.length);
    if (!_selected) {
      _selected = [_option[0].value, _option[0].text, __option.placeholder];
      _i = 0;
    }
    ctr.selecput[i] = {
      activeOption: _this.querySelector('option', _e)[_i],
      value: _selected[0],
      text: _selected[1],
      placeholder: _selected[2],
      class: _e.getAttribute('class'),
      id: _e.getAttribute('id'),
      name: _e.getAttribute('name'),
      focus: false,
      option: _option
    };
    //console.log(ctr.selecput[i]);
    return ctr;
  };
  this.open = function(i) {
    if (ctr.el[i].getAttribute('data-focus') !== null || ctr.selecput[i].input.getAttribute('readonly') !== null) {
      ctr.selecput[i].active = ctr.el[i];
      _this.toggleClass(ctr.el[i], ctr.openClass);
    }
  };
  this.close = function(i) {
    if (ctr.selecput[i].active === undefined) {
      return false;
    }
    _this.removeClass(ctr.selecput[i].active, ctr.openClass);
  };
  this.value = function(el, i) {
    //console.log(!_this.hasClass(el, ctr.selectedClass) );
    if (!_this.hasClass(el, ctr.selectedClass)) {
      var _placeholder = el.getAttribute('data-placeholder');
      ctr.selecput[i].value = el.getAttribute('data-value');
      ctr.selecput[i].text = el.innerText;
      (ctr.selecput[i].text === undefined) && (ctr.selecput[i].text = '');
      ctr.selecput[i].input.setAttribute('data-value', ctr.selecput[i].value);
      if (_placeholder !== null) {
        ctr.selecput[i].input.setAttribute('placeholder', _placeholder);
        ctr.selecput[i].input.removeAttribute('readonly');
        // ctr.selecput[i].input.value = '';
        ctr.selecput[i].input.focus();
      } else {
        ctr.selecput[i].input.removeAttribute('placeholder');
        ctr.selecput[i].input.setAttribute('readonly', '');
      }
      ctr.selecput[i].input.value = ctr.selecput[i].text;
      //console.log(_this.querySelector('.'+ctr.selectedClass, ctr.selecput[i].el));
      _this.removeClass(_this.querySelector('.' + ctr.selectedClass, ctr.selecput[i].el)[0], ctr.selectedClass);
      ctr.selecput[i].activeOption = el;
      _this.addClass(el, ctr.selectedClass);
      (ctr.onChange !== undefined) && (_this.onChange(ctr.onChange));
    }
    _this.close(i);
  };
  this.typing = function(i) {
    ctr.selecput[i].input.onkeypress = function() {
        if (window.event.keyCode === 13) {
        if (ctr.selecput[i].text !== this.value) {
          //(_this.hasClass(ctr.selecput[i].el, ctr.openClass))&&();
          ctr.selecput[i].text = this.value;
          _this.querySelector('.' + ctr.selectedClass, ctr.selecput[i].el)[0].innerText = ctr.selecput[i].text;
          (ctr.onChange !== undefined) && (_this.onChange(ctr.onChange));
          alert('값이 변경되었습니다.');
          _this.close(i);
        } else {
          _this.open(i);
        }
      }
    };
  };
  this.absoluteClose = function(i) {
    if (ctr.absoluteClose === undefined) {
      return false;
    }
    clearTimeout(ctr.absoluteClose);
    ctr.absoluteClose = setTimeout(function(e) {
      (ctr.el[i].getAttribute('data-focus') === null) && (_this.close(i));
    }, 30);
  };
  this.onChange = function(fn) {
    new fn(ctr);
  };
  this.onLoad = function(fn) {
    new fn();
    //return fn;
  };
  this.init = function() {
    ctr = opt === undefined ? {} : opt;
    ctr.el = _this.querySelector(el);
    ctr.lengths = ctr.el.length;
    ctr.selecput = [];
    ctr.openClass = ctr.openClass === undefined ? 'open' : ctr.openClass;
    ctr.selectedClass = ctr.selectedClass === undefined ? 'selected' : ctr.selectedClass;
    ctr.inputClass = ctr.inputClass === undefined ? 'input' : ctr.inputClass;
    ctr.iClass = ctr.iClass === undefined ? 'i' : ctr.iClass;
    ctr.dimClass = ctr.dimClass === undefined ? 'dim' : ctr.dimClass;

    new _this.repeat(_this.variables, ctr.lengths);
    new _this.repeat(_this.makeDom, ctr.lengths);
    new _this.repeat(_this.inputClick, ctr.lengths);
    new _this.repeat(_this.inputFocusBlur, ctr.lengths);
    new _this.repeat(_this.optionClick, ctr.lengths);
    (ctr.editAble === true) && (new _this.repeat(_this.typing, ctr.lengths));
  };
  var _this = this;
  var ctr = {};
  this.init();
};