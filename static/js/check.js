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

	function checkGb() {
		var pass = $('#myform input[name=pass]');
		var gourl = $('#myform input[name=gourl]');
		if (pass.val() == '') {
			layer.msg('请输入访问密码.关注公众号获取.', { time: 1500 });
			pass.focus();
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
				} else if (res.status == 2) {
					layer.msg(response.msg, { time: 2000 }, function () {
						location.reload();
					});
				} else {
					layer.msg(response.msg, { time: 2000 });
				}
				return false;
			},
			error: function () {
				layer.closeAll();
				layer.alert('Error', { icon: 5 });
			}
		});
		return false;
	};
