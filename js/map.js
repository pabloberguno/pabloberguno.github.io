$(document).ready(function () {
    'use strict';
    
    var image = $('#mapavalle');

    var areas = $.map($('area[data-full]'),function(el) {
        return { 
            key: $(el).attr('name'),
            toolTip: $(el).attr('data-full')
        };               
    });

    var $patrimonylist,
    $mapavalle = $('#mapavalle'),    
    
    mapsterConfigured = function () {
      // set html settings values
      var opts = $mapavalle.mapster('get_options', null, true);                
    },

    default_options = {
      fillOpacity: 0.5,
      render_highlight: {
        fillColor: '2aff00',
        stroke: true
      },
      render_select: {
        fillColor: '2aff00',
        stroke: true
      },
      mouseoutDelay: 0,
      fadeInterval: 50,
      isSelectable: true,
      singleSelect: false,
      mapValue: 'data-full',
      listKey: 'name',
      listSelectedAttribute: 'checked',
      sortList: 'asc',
      onGetList: addCheckBoxes,
      onConfigured: mapsterConfigured,
      showToolTip: true,
      mapKey: 'name',      
      areas: areas
    };

  function styleCheckbox(selected, $checkbox) {
    var nowWeight = selected ? 'bold' : 'normal';
    $checkbox.closest('div').css('font-weight', nowWeight);
  }

  function addCheckBoxes(items) {
    // there are 24 items, so we divide in 12 + 12
    var item;
    var ct = 0;
    var stringhtml = "";
    $patrimonylist.children().remove();
    for (var i = 0; i < items.length; i++) {
      ct++;
      item = $(
        '<div><input type="checkbox" class="patrimonyitem" name="' + items[i].key + '"' 
          + '><span class="sel" key="' 
          + items[i].key + '">' 
          + items[i].value 
          + '</span></div>'
      );
      if (ct == 1)
        stringhtml = '<div id="left">';        
      
      stringhtml = stringhtml.concat(item[0].outerHTML);
      //$patrimonylist.append(item);

      if (ct == 12)
        stringhtml = stringhtml.concat('</div><div id="right">');
        //$patrimonylist.append('</div><div id="right">');
    }
    if (ct == items.length)
      stringhtml = stringhtml.concat('</div>');
      //$patrimonylist.append('</div>');

    $patrimonylist.append(stringhtml);

    $patrimonylist
      .find('span.sel')
      .off('click')
      .on('click', function () {
        var key = $(this).attr('key');
        $mapavalle.mapster('highlight', key);
      });

    // return the list to mapster so it can bind to it
    return $patrimonylist
      .find('input[type="checkbox"]')
      .off('click')
      .on('click', function () {
        var selected = $(this).is(':checked');
        $mapavalle.mapster('set', selected, $(this).attr('name'));
        styleCheckbox(selected, $(this));
      });
  }

  $patrimonylist = $('#patrimonylist');
  $mapavalle = $('#mapavalle');
  $mapavalle.mapster(default_options);


  $('.popup').click(function (event) {
    event.preventDefault();
    //window.open($(this).attr("href"), "popupWindow", "width=600,height=600,scrollbars=yes");
    window.open($(this).attr("href"));
  });
  
});

