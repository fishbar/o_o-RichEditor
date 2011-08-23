/**
 * o_o html editor
 * 
 * version 0.1
 */
(function(){
// check if exist
if(window.o_o)return;

/**
 * Editor 
 * @constructor 
 * 
 * 	cfg 
 * 		-target 目标Jselect,应该是一个textarea;
 * 		-base 	! 编辑器http路径 ，结尾无/
 * 		-theme	! 编辑器主题名称
 * 		-res	[hidden] 资源路径
 * 		-width
 * 		-height
 */
var oo = function(cfg){
	$.extend(this.cfg,cfg);
	this.cfg.res = this.cfg.base + '/theme/'+this.cfg.theme
	this.init();
	this.id++;
}

oo.prototype = {
	cfg:{
		theme:'default'
	},
	id:0,
	browser:$.browser,
	
	EWIN:null,
	EDOC:null,
	/** 
	 * init
	 * 这个方法应用了大量的jquery方法，创建dom节点～
	 */
	init:function(){
		var cfg = this.cfg;
		var tar = $(cfg.target);
		var _w,_h,id = this.id;
		_w = cfg.width ? cfg.width : tar.width();
		_h = cfg.height ? cfg.height : tar.height();
		
		tar.hide();
		/**
		 * add styles 
		 */
		$('head').append('<link href="'+this.cfg.base+'/theme/default/editor.css" type="text/css" rel="stylesheet"/>');
		/**
		 * create Element
		 */
		var cnt = document.createElement('span');
		cnt.className = 'oo_edt';
		$(cnt).insertBefore(tar);
		cnt.innerHTML = '<table class="oo_lyt" border="0" cellpadding="0" cellspacing="0" style="width:'+_w+'px;height:'+_h+'px"><tr><td id="oo_toolbar_'+id+'" class="oo_tbar">toobar</td></tr><tr><td class="oo_icnt"><iframe id="oo_iframe_'+id+'" border="no" frameborder="0" src=""></iframe></td></tr></table>'
		this.EWIN = $('#oo_iframe_'+id)[0].contentWindow;
		this.EDOC = this.EWIN.document;
		
		$(cnt).find('td').each(function(){
			var cls = $(this).attr('class');
			if(cls == 'oo_tbar')
				$(this).height(20);
			else if(cls == 'oo_icnt'){
				$(this).height(_h - 20);
			} 
		});
		
		var self = this;
		self.initIframe();
	},
	initIframe:function(){
		var doc = this.EDOC;
		doc.open();
		doc.write('<html><head><link rel="stylesheet" href="'+this.cfg.base+'/theme/'+this.cfg.theme+'/iframe.css"/></head><body>asdfa<input></body></html>');
		doc.close();
		/*
		var link = this.EDOC.createElement('link');
		this.EDOC.getElementsByTagName('head')[0].appendChild(link);
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = this.cfg.base+'/theme/'+this.cfg.theme+'/iframe.css';
		
		// start edit model
		
		*/
		if(this.browser.msie)
			doc.body.contentEditable= 'true';
		else doc.designMode = 'On';
		alert(doc.designMode);
	},
	initToolBar:function(){
		var tb = new oo_toolbar(this.cfg.tools);
	}
};


/********************************* tool bar  **************************************/

oo_toolbar = function(){
	
};
oo_toolbar.prototype = {
	
}



window.o_o = oo;
})();
