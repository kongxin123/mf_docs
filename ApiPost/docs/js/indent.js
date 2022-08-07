"use strict";

window.aptIndent = {};

/**
 * @returns {aptIndent}
 */
aptIndent.init = function () {
  let fatherText = ""
  let fatherDom = ""
  let obj_arr = $('.response-parameter tr>td:first-child');

  if (obj_arr) {
    let tdArray = $.makeArray(obj_arr)

    // console.log(tdArray, 11111)
    tdArray?.length > 0 && tdArray.reduce(function (pre, item, index, arr) {
      let preText = $(pre).text()
      if (fatherDom == "") {
        fatherDom = $(pre)
        fatherText = preText
      }
      let itemText = $(item).text()
      if ($.trim(preText) != "" && $.trim(itemText) != "" && itemText.indexOf(fatherText + ".") == 0) {
        let indent = (itemText.split('.').length - 1) * 15
        if (indent > 0) {
          // $(item).css('text-indent', indent + "px")
          $(item).parent().attr("parent", fatherText)
        }
        fatherDom.html("<button class='indent-fold'><img src='https://img.cdn.apipost.cn/v6/docs/img/folderselect.svg' /></button>" + fatherText)
        fatherDom.parent().attr('target', fatherText)
      } else {
        fatherDom = $(item)
        fatherText = itemText
      }
      return item
    })

    $(document).on("click", '.indent-fold', function () {
      let _this = this
      console.log(_this);
      console.log($(_this));

      let target = $(_this).parent().parent().attr('target')

      console.log(_this, target);

      $(`.response-parameter tr[parent='${target}']`).toggle();
      console.log(_this, target);
      if ($(_this).hasClass('down')) {
        // $(_this).text('-');
        $(_this).removeClass('down').addClass('right')
      } else {
        // $(_this).text('+');
        $(_this).removeClass('right').addClass('down')
      }
    })
  }

  return this;
}