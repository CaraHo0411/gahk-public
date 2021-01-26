(function() {
  function xwwwformurlencode(form) {
    var data = new FormData(form);
    if (!form.enctype || form.enctype === 'application/x-www-form-urlencoded') {
      return Array.from(data).map(function(pair){return pair.map(encodeURIComponent).join('=')}).join('&');
    } else if (form.enctype === 'multipart/form-data') {
      return data;
    }
    return Array.from(data).map(function(pair){return pair.map(function(str){return str.replace(' ','+')}).join('=')}).join("\n");
  }

  function ajaxformsubmit(form, callbacks) {
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', form.enctype || 'application/x-www-form-urlencoded');
    form.classList.add('loading');
    xhr.onload = function() {
      this.form.classList.remove('loading');

      if (this.form.getAttribute('data-alert'+this.xhr.status)) {
        alert(this.form.getAttribute('data-alert'+this.xhr.status));
      } else if (this.xhr.status >= 500) {
        alert('系統錯誤，請稍等片刻再嘗試提交。');
        return;
      } else if (this.xhr.status >= 400) {
        alert('資料有誤，請重新輸入。');
        return;
      } else {
        alert('提交成功。');
      }

      //if (typeof callbacks.onload === 'function) {
      //  callbacks.onload();
      //}

      if (this.form.getAttribute('data-callback'+this.xhr.status)) {
        eval(this.form.getAttribute('data-callback'+this.xhr.status));
      }

      //window.location = this.xhr.responseURL;
    }.bind({form:form, xhr:xhr});
    xhr.onprogress = function() {
      //this.form.classList.add('loading');

      //if (typeof callbacks.onprogress === 'function) {
      //  callbacks.onprogress();
      //}
    }.bind({form:form, xhr:xhr});
    xhr.send(xwwwformurlencode(form));
  }

  function ajax(element, url, method) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    element.classList.add('loading');
    xhr.onload = function() {
      this.form.classList.remove('loading');

      if (this.form.getAttribute('data-alert'+this.xhr.status)) {
        alert(this.form.getAttribute('data-alert'+this.xhr.status));
      } else if (this.xhr.status >= 400) {
        alert('系統錯誤，請稍等片刻再嘗試。');
      } else {
        alert('完成');
      }

      if (this.form.getAttribute('data-callback'+this.xhr.status)) {
        eval(this.form.getAttribute('data-callback'+this.xhr.status));
      }
    }.bind({form:element, xhr:xhr});
    xhr.onprogress = function() {
      //element.classList.add('loading');
    }.bind({element:element, xhr:xhr});
    xhr.send();
  }

  window.addEventListener('DOMContentLoaded', function(event) {
    //document.querySelectorAll('input[pattern]').forEach(function(element) {
    //  element.addEventListener('input', function() {
    //    element.setCustomValidity('');
    //    element.checkValidity();
    //  });

    //  element.addEventListener('invalid', function() {
    //    element.setCustomValidity(element.getAttribute('placeholder'));
    //  });
    //});

    //document.querySelectorAll('form.submit-preview').forEach(function(form) {
    //  var submit = form.querySelector('button[type="submit"]');
    //  var reset = form.querySelector('button[type="reset"]');
    //  form.addEventListener('submit', function() {
    //    if (!form.className.indexOf('submit-preview-show') !== -1) {
    //      //console.log('preview');
    //      form.querySelectorAll('input.form-control').forEach(function(element) {
    //        element.setAttribute('readonly','');
    //        element.className = 'form-control-plaintext';
    //      });
    //      form.className += ' submit-preview-show';
    //      reset.removeAttribute('hidden');
    //      submit.className += ' confirm';
    //      return event.preventDefault();
    //    }
    //  });
    //});

    document.querySelectorAll('form.ajax').forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        if (event.target.hasAttribute('data-valid') && eval(event.target.getAttribute('data-valid'))) {
          ajaxformsubmit(event.target);
        } else {
          ajaxformsubmit(event.target);
        }
      });
    });

    document.querySelectorAll('form.ajax-with-preview').forEach(function(form) {
      form.addEventListener('submit', function(event) {
        event.preventDefault();
        var submit = form.querySelector('button[type="submit"]');
        var reset = form.querySelector('button[type="reset"]');
        var performReset = function() {
          form.querySelectorAll('input.form-control-plaintext, textarea.form-control-plaintext').forEach(function(element) {
            element.removeAttribute('readonly');
            element.classList.remove('form-control-plaintext');
            element.classList.add('form-control');
          });
          form.classList.remove('preview');
          submit.classList.remove('confirm');
          reset.setAttribute('hidden','');
          return false;
        }.bind({form:form, submut:submit, reset:reset})

        if (!reset) {
          reset = document.createElement('button');
          reset.setAttribute('class', 'btn btn-primary mx-2');
          reset.setAttribute('type', 'reset');
          reset.setAttribute('hidden', '');
          reset.appendChild(document.createTextNode('修改資料'));
          reset.onclick = performReset;
          submit.parentNode.insertBefore(reset, submit);
        }

	if (form.classList.contains('preview')) {
          ajaxformsubmit(form);
          performReset();
        } else {
          form.querySelectorAll('input.form-control, textarea.form-control').forEach(function(element) {
            element.setAttribute('readonly','');
            element.classList.remove('form-control');
            element.classList.add('form-control-plaintext');
          });
          form.classList.add('preview');
          reset.removeAttribute('hidden');
          submit.classList.add('confirm');
        }
      });
    });

    document.querySelectorAll('button.ajax-with-confirm[data-action]').forEach(function(button) {
      button.addEventListener('click', function(event) {
        var btn = event.target;
        var url = btn.getAttribute('data-action');
        var method = btn.getAttribute('data-method') || 'GET';

        if (url && confirm(btn.getAttribute('data-confirm') || 'Are you sure?')) {
          ajax(btn, url, method);
        }
      });
    });
  });
})();
