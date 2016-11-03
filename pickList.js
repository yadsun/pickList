(function ($) {

   $.fn.pickList = function (options) {

      var opts = $.extend({}, $.fn.pickList.defaults, options);
      
      this.bindDblClickAdd = function () {
         var pickThis = this;
         this.find('.pickData option').each(function () {
            var _option = this;
            $(_option).off('dblclick');
            $(_option).on('dblclick', function(){pickThis.fnAdd();});
         });
      };
      this.bindDblClickRemove = function () {
         var pickThis = this;
         this.find('.pickListResult option').each(function () {
            var _option = this;
            $(_option).off('dblclick');
            $(_option).on('dblclick', function(){pickThis.fnRemove();});
         });
      };
      this.fnAdd = function () {
         var pickThis = this;
         var p = pickThis.find(".pickData option:selected");
         p.clone().appendTo(pickThis.find(".pickListResult"));
         p.remove();
         pickThis.bindDblClickRemove();
      };
      this.fnRemove = function () {
         var pickThis = this;
         var p = pickThis.find(".pickListResult option:selected");
         p.clone().appendTo(pickThis.find(".pickData"));
         p.remove();
         pickThis.bindDblClickAdd();
      };
      this.fill = function () {
         var pickThis = this;
         var option = '';

         $.each(opts.data, function (key, val) {
            option += '<option data-id=' + val.id + '>' + val.text + '</option>';
         });
         this.find('.pickData').append(option);
         this.bindDblClickAdd();
      };
      
      
      this.controll = function () {
         var pickThis = this;

         pickThis.find(".pAdd").on('click', function(){pickThis.fnAdd();});

         pickThis.find(".pAddAll").on('click', function () {
            var p = pickThis.find(".pickData option");
            p.clone().appendTo(pickThis.find(".pickListResult"));
            p.remove();
            pickThis.bindDblClickRemove();
         });

         pickThis.find(".pRemove").on('click', function () {
            pickThis.fnRemove();
         });

         pickThis.find(".pRemoveAll").on('click', function () {
            var p = pickThis.find(".pickListResult option");
            p.clone().appendTo(pickThis.find(".pickData"));
            p.remove();
            pickThis.bindDblClickAdd();
         });
      };

      this.getValues = function () {
         var objResult = [];
         this.find(".pickListResult option").each(function () {
            objResult.push({
               id: $(this).data('id'),
               text: this.text
            });
         });
         return objResult;
      };

      this.init = function () {
         var pickListHtml =
                 "<div class='row'>" +
                 "  <div class='col-sm-5'>" +
                 "	 <select class='form-control pickListSelect pickData' multiple></select>" +
                 " </div>" +
                 " <div class='col-sm-2 pickListButtons'>" +
                 "	<input type='button' class='pAdd btn btn-primary btn-sm' value='"+opts.add+"' />" +
                 "      <input type='button'  class='pAddAll btn btn-primary btn-sm' value='"+opts.addAll+"'/>" +
                 "	<input type='button'  class='pRemove btn btn-primary btn-sm' value='"+opts.remove+"' />" +
                 "	<input type='button'  class='pRemoveAll btn btn-primary btn-sm' value='"+opts.removeAll+"'/>" +
                 " </div>" +
                 " <div class='col-sm-5'>" +
                 "    <select class='form-control pickListSelect pickListResult' multiple></select>" +
                 " </div>" +
                 "</div>";

         this.append(pickListHtml);

         this.fill();
         this.controll();
      };

      this.init();
      return this;
   };

   $.fn.pickList.defaults = {
      add: 'Add',
      addAll: 'Add All',
      remove: 'Remove',
      removeAll: 'Remove All'
   };


}(jQuery));
