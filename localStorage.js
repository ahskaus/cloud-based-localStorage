__shadowDB = new function() {

    var that = this;
    var returnee;

    if(window.localStorage){
      this.get = function(key){return JSON.parse(window.localStorage.getItem(key))};
      this.set = function(key, value){return window.localStorage.setItem(key, JSON.stringify(value))};
      return;
    }

    this.get = function(key){
      if(!key) return null;
      var postData = "key=" + key.toLowerCase().trim();

      $.ajax({
          type: 'POST',
          url: __SHADOW_COMMAND + __SHADOW_GET_DB,
          data: postData,
          async: false,
          timeout: 2000,
          success: setReturnee
        });

      return this.returnee;

    };

    function setReturnee(json){
      if(json == 'null'){
        that.returnee = null;
        return;
      }
      that.returnee = JSON.parse(json);
    };

    this.set = function(key, value){

      var postData = "key=" + key.toLowerCase().trim() + "&value=" + escape(JSON.stringify(value));

      $.ajax({
          type: 'POST',
          url: __SHADOW_COMMAND + __SHADOW_SET_DB,
          data: postData
        });
    };
  };

