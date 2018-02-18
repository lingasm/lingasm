(function (parentObject) {
	if (parentObject.validation) return;
	parentObject.validation = {
		_defaultOptions: {
			container: '',
			fieldSelector: '.field-input',
			liveCheck: true,
			submitSelector: '.save-button',
			submitHandler: null,
			errorClass: 'input-error',
			okClass: 'input-ok',
			validators: {
				'required': function required(str) {
					return str.length > 0;
				},
				'numeric': function numeric(str) {
					var regExp = new RegExp('\\-?\\d+((\\.|\\,)\\d{0,})?');
					return regExp.test(str) || !str;
				},
				'alpha': function alpha(str) {
					var regExp = new RegExp('^[а-яА-ЯёЁa-zA-Z\\s]+$');
					return regExp.test(str) || !str;
				},
				'alphanumeric': function alphanumeric(str) {
					var regExp = new RegExp('^[а-яА-ЯёЁa-zA-Z0-9\\s]+$');
					return regExp.test(str) || !str;
				},
				'date': function date(str) {
					var regExpISO = new RegExp('(19|20)\\d\\d-((0[1-9]|1[012])-(0[1-9]|[12]\\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31)'),
					    regExpRU = new RegExp('((0[1-9]|[12]\\d)\\.(0[1-9]|1[012])|30\\.(0[13-9]|1[012])|31\\.(0[13578]|1[02]))\\.(19|20)\\d\\d');
					return regExpISO.test(str) | regExpRU.test(str) || !str;
				},
				'datetime': function datetime(str) {
					var regExpISO = new RegExp('(19|20)\\d\\d-((0[1-9]|1[012])-(0[1-9]|[12]\\d)|(0[13-9]|1[012])-30|(0[13578]|1[02])-31) (\\d+):(\\d+)'),
					    regExpRU = new RegExp('((0[1-9]|[12]\\d)\\.(0[1-9]|1[012])|30\\.(0[13-9]|1[012])|31\\.(0[13578]|1[02]))\\.(19|20)\\d\\d (\\d+):(\\d+)');
					return regExpISO.test(str) | regExpRU.test(str) || !str;
				},
				'time': function time(str) {
					var regExp = new RegExp('(\\d+):(\\d+)');
					return regExp.test(str) || !str;
				},
				'digit': function digit(str) {
					var regExp = new RegExp('^[0-9]+$');
					return regExp.test(str) || !str;
				},
				'password': function password(str) {
					var regExp = new RegExp('^[а-яА-ЯёЁa-zA-Z0-9\\s]+$');
					return regExp.test(str) || !str;
				},
				'email': function email(str) {
					var regExp = new RegExp('^([a-z0-9_-]+\\.)*[a-z0-9_-]+@[a-z0-9_-]+(\\.[a-z0-9_-]+)*\\.[a-z]{2,6}$');
					return regExp.test(str) || !str;
				},
				'url': function url(str) {
					var regExp = new RegExp('^((https?|ftp)\\:\\/\\/)?([a-z0-9]{1})((\\.[a-z0-9-])|([a-z0-9-]))*\\.([a-z]{2,6})(\\/?)$');
					return regExp.test(str) || !str;
				}
			}
		},

		init: function init(_options) {
			var options = $.extend({}, this._defaultOptions, _options || {}),
			    self = this;
			if (options.container && options.fieldSelector) {
				if (options.submitSelector) {
					$(options.container).find(options.submitSelector).on('click', function () {
						if (self.isValid(options)) {
							if (typeof options.submitHandler === 'function') options.submitHandler();
							return true;
						} else {
							return false;
						}
					});
				}
				if (options.liveCheck) {
					$(options.container).find(options.fieldSelector).each(function (cnt, item) {
						$(item).on('click', function () {
							self.validItem($(item), options);
						}).on('blur', function () {
							self.validItem($(item), options);
						}).on('change', function () {
							self.validItem($(item), options);
						}).on('keyup', function () {
							self.validItem($(item), options);
						});
					});
				}
			}
		},

		validItem: function validItem(item, _options) {
			var options = $.extend({}, this._defaultOptions, _options || {}),
			    classList = $(item).attr('class').split(/\s+/),
			    validResult = true;
			$.each(classList, function (index, cl) {
				if (cl === 'confirmfield') {
					validResult &= $(options.container).find('[Name="' + $(item).attr('confirm-field') + '"]').val() == $(item).val();
				} else if (typeof options.validators[cl] === 'function') {
					validResult &= options.validators[cl](item.val());
				}
			});

			if (!validResult) $(item).addClass(options.errorClass).removeClass(options.okClass);else $(item).addClass(options.okClass).removeClass(options.errorClass);
			return validResult;
		},

		isValid: function isValid(_options) {
			var options = $.extend({}, this._defaultOptions, _options || {}),
			    validResult = true,
			    self = this;
			if (options.container && options.fieldSelector) {
				$(options.container).find(options.fieldSelector).each(function (cnt, item) {
					validResult &= self.validItem($(item), options);
				});
			}
			return validResult;
		},

		clear: function clear(_options) {
			var options = $.extend(true, {}, this._defaultOptions, _options || {});
			if (options.container && options.fieldSelector) {
				$(options.container).find(options.fieldSelector).removeClass(options.errorClass).removeClass(options.okClass);
			}
		}
	};
})(window);