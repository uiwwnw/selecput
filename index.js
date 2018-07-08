var selecput = function (el, opt) {
    this.addClass = function (e, name) {
        var classs = e.getAttribute('class');
        if (classs.indexOf(name) === -1) {
            e.setAttribute('class', classs + ' ' + name);
        }
    }
    this.removeClass = function (e, name) {
        var classs = e.getAttribute('class');
        if (classs.indexOf(name) !== -1) {
            classs = classs.substr(0, classs.indexOf(name));
            e.setAttribute('class', classs);
        }
    }
    this.toggleClass = function (e, name) {
        var classs = e.getAttribute('class');
        if (classs.indexOf(name) === -1) {
            e.setAttribute('class', classs + ' ' + name);
        } else {
            classs = classs.substr(0, classs.indexOf(name) - 1);
            e.setAttribute('class', classs);
        }
    }
    this.repeat = function (fn, i) {
        var num = 0;
        var repeat = function () {
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
    }
    this.makeDom = function (i) {
        ctr.selecput[i].el = document.createElement('div');
        (ctr.selecput[i].class !== null) && (ctr.selecput[i].el.setAttribute('class', ctr.selecput[i].class));
        (ctr.selecput[i].id !== null) && (ctr.selecput[i].el.setAttribute('id', ctr.selecput[i].id));
        (ctr.selecput[i].name !== null) && (ctr.selecput[i].el.setAttribute('name', ctr.selecput[i].name));

        ctr.selecput[i].input = document.createElement('input');
        ctr.selecput[i].input.setAttribute('class', 'input');

        ctr.selecput[i].menu = document.createElement('div');
        ctr.selecput[i].menu.setAttribute('class', 'menu');

        ctr.selecput[i].dim = document.createElement('i');
        ctr.selecput[i].dim.setAttribute('class', 'dim');
        function makeOption(j) {
            var _p = document.createElement('p');
            // console.log(ctr.selecput[i].option[j].innerText);
            (ctr.selecput[i].option[j].value !== null)&&(_p.setAttribute('data-value', ctr.selecput[i].option[j].value));
            (ctr.selecput[i].option[j].text !== null)&&(_p.innerText = ctr.selecput[i].option[j].text);
            ctr.selecput[i].menu.append(_p);
        }
        _this.repeat(makeOption,ctr.selecput[i].option.length);
        ctr.el[i].innerHTML = '';
        
        ctr.selecput[i].el.append(ctr.selecput[i].menu);
        ctr.el[i].append(ctr.selecput[i].input);
        ctr.el[i].append(ctr.selecput[i].el);
        ctr.el[i].append(ctr.selecput[i].dim);
    }
    this.cssselect = function (e) {
        var _e;
        switch (e[0]) {
            case '.': _e = document.getElementsByClassName(e.substr(1));
                break;
            case '#': _e = [];
                _e[0] = document.getElementById(e.substr(1));
                break;
            default: _e = document.getElementsByTagName(e);
                break;
        }
        return _e;
    }

    this.values = function (i) {

    }
    this.inputClick = function (i) {
        ctr.selecput[i].input.onclick = function() {
            if (ctr.el[i].getAttribute('data-focus') !== null) {
                _this.toggleClass(ctr.el[i], 'active');
            }
            
        }
    }
    this.inputFocus = function (i) {
        ctr.selecput[i].input.onfocus = function() {
            ctr.selecput[i].sto = setTimeout(function() {
                ctr.el[i].setAttribute('data-focus', true);
            }, 200);
        }
    }
    this.inputBlur = function (i) {
        ctr.selecput[i].input.onblur = function() {
            ctr.el[i].removeAttribute('data-focus');
        }
    }
    
    this.variables = function (i) {
        var _e = ctr.el[i].getElementsByTagName('select')[0];
        var _option = [];
        function makeOption(i) {
            var __option = {
                value: _e.getElementsByTagName('option')[i].getAttribute('value'),
                text: _e.getElementsByTagName('option')[i].innerText
            };
            _option.push(__option);
        }
        _this.repeat(makeOption, _e.length);
        ctr.selecput[i] = {
            class: _e.getAttribute('class'),
            id: _e.getAttribute('id'),
            name: _e.getAttribute('name'),
            option: _option
        };
        return ctr;
    }
    this.onChange = function (i) {

    }
    this.onLoad = function (i) {

    }
    this.init = function () {
        ctr = opt === undefined ? {} : opt;
        ctr.el = _this.cssselect(el);
        ctr.lengths = ctr.el.length;
        ctr.selecput = [];
        (ctr.onChange !== undefined)&&(_this.onChange(ctr.onChange));
        (ctr.onLoad !== undefined)&&(_this.onLoad(ctr.onLoad));
        new _this.repeat(_this.variables, ctr.lengths);
        new _this.repeat(_this.makeDom, ctr.lengths);
        new _this.repeat(_this.inputClick, ctr.lengths);
        new _this.repeat(_this.inputFocus, ctr.lengths);
        new _this.repeat(_this.inputBlur, ctr.lengths);
    }
    var _this = this;
    var ctr = {};
    this.init();
};