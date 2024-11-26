document.write('<script type="text/javascript" src="/public/plugins/layer-v3.1.0/layer.js?t=1611888793"></script>');
function layer_loading(msg) {
		var loading = layer.msg(
			msg + '...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
			{
				icon: 1,
				time: 3600000, 
				shade: [0] 
			});
		//loading
		var index = layer.load(3, {
			shade: [0.1, '#fff'] 
		});

		return loading;
	}
	function imgchange(obj) {
		$('#touxiang').attr('src',$(obj).val());
		//console.log($(obj).val());
    }
	function checkGb() {
		var name = $('#myform input[name=name]');
		var content = $('#myform textarea[name=content]');
		var yzm = $('#myform input[name=vertify]');
		var gourl = $('#myform input[name=gourl]');
		if (name.val() == '') {
			layer.msg('请输入昵称.', { time: 1500 });
			name.focus();
			return false;
		}
		if (content.val() == '') {
			layer.msg('请输入留言内容.', { time: 1500 });
			content.focus();
			return false;
		}
		if (yzm.val() == '') {
			layer.msg('请输入验证码.', { time: 1500 });
			yzm.focus();
			return false;
		}
		layer_loading('Processing');
		$.ajax({
			// async:false,
			url: gourl.val(),
			data: $('#myform').serialize(),
			type: 'post',
			dataType: 'json',
			success: function (response) {
				layer.closeAll();
				console.log(response.msg);
				var res = response.data;
				 if (res.status == 1) {
					layer.msg(response.msg, { time: 2000 });
				} else if ('vertify' == res.status) {
                    fleshVerify();
                    layer.msg(response.msg, {time: 2000});
				}else if (res.status == 2) {
					fleshVerify();
					$('#myform input[type=text],#myform textarea').val('');
					layer.msg(response.msg, { time: 2000 });
				} else {
					fleshVerify();
					layer.msg(response.msg, { time: 2000 });
				}
				return false;
			},
			error: function () {
				layer.closeAll();
				fleshVerify();
				layer.alert('Error', { icon: 5 });
			}
		});
		return false;
	};
